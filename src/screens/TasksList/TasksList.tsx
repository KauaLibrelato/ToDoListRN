import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import * as S from "./TasksListStyles";
import * as Icons from "phosphor-react-native";
import { TaskDatabase, useTaskDatabase } from "../../database/useTasksDatabase";

const TasksList = () => {
  const [tasks, setTasks] = useState<TaskDatabase[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const taskDatabase = useTaskDatabase();

  async function changeTaskStatus(taskId: number) {
    try {
      const task = tasks.find((task) => task?.id === taskId);

      if (!task) {
        throw new Error("Task not found");
      }

      const updatedTask = { ...task, status: !task?.status };

      await taskDatabase.updateStatus(updatedTask);

      setTasks(
        tasks.map((task) =>
          task?.id === taskId ? { ...task, status: !task?.status } : task
        )
      );
    } catch (error) {
      Alert.alert("Erro ao atualizar tarefa", String(error));
    }
  }

  async function listTasks() {
    try {
      const response = await taskDatabase.showAll();
      setTasks(response);
    } catch (error) {
      Alert.alert("Erro ao listar tarefas", String(error));
    } finally {
      setLoading(false);
    }
  }

  async function removeTask(taskId: number) {
    try {
      await taskDatabase.remove(taskId);
      setTasks(tasks.filter((task) => task?.id !== taskId));
    } catch (error) {
      Alert.alert("Erro ao remover tarefa", String(error));
    }
  }

  async function removeTaskAlert(taskId: number) {
    Alert.alert("Remover tarefa", "Deseja realmente remover esta tarefa?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: () => removeTask(taskId),
      },
    ]);
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      listTasks();
    });
  }, [navigation]);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>To do</S.HeaderTitle>
        <S.TaskCount>{tasks.length} task(s)</S.TaskCount>
      </S.Header>
      {loading ? (
        <S.Loading />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => (item.id ? item?.id.toString() : "")}
          renderItem={({ item }) => (
            <S.TaskItem
              onPress={() => navigation.navigate("CreateTask", { task: item })}
            >
              <S.TaskLeftContainer>
                <Checkbox
                  value={Boolean(item?.status)}
                  onValueChange={() => changeTaskStatus(item.id ?? 0)}
                  color={Boolean(item?.status) ? "#007bff" : undefined}
                  style={{
                    borderColor: Boolean(item?.status) ? "#007bff" : "#ccc",
                  }}
                />
                <S.TaskText
                  style={{
                    textDecorationLine: Boolean(item?.status)
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item?.name}
                </S.TaskText>
              </S.TaskLeftContainer>

              <S.EventButton onPress={() => removeTaskAlert(item?.id ?? 0)}>
                <Icons.TrashSimple size={24} color={"#FF5722"} />
              </S.EventButton>
            </S.TaskItem>
          )}
        />
      )}
      <S.AddButton onPress={() => navigation.navigate("CreateTask")}>
        <Icons.Plus size={24} color={"#fff"} weight="bold" />
      </S.AddButton>
      <S.InfoButton
        onPress={() =>
          Alert.alert(
            "Informações",
            `Ao clicar em uma tarefa, você será direcionado para a página de edição. Ao clicar no ícone de lixeira, você pode remover a tarefa.`
          )
        }
      >
        <Icons.Info size={24} color={"#fff"} weight="bold" />
      </S.InfoButton>
    </S.Container>
  );
};

export default TasksList;
