import React, { useEffect, useState } from "react";
import * as S from "./CreateTaskStyles";
import * as Icon from "phosphor-react-native";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskDatabase, useTaskDatabase } from "../../database/useTasksDatabase";
import { Alert } from "react-native";

export default function CreateTask() {
  const [task, setTask] = useState<TaskDatabase>({
    name: "",
    status: false,
  });
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const taskDatabase = useTaskDatabase();
  const params = useRoute().params as { task: TaskDatabase };

  async function handleAddTask() {
    if (!task?.name) {
      Alert.alert("Erro ao adicionar tarefa", "Nome da tarefa é obrigatório");
      return;
    }
    try {
      if (params?.task) {
        await taskDatabase.updateName({
          id: params.task.id,
          name: task.name,
          status: task.status,
        });
      } else {
        await taskDatabase.create({ name: task.name, status: false });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro ao adicionar tarefa", String(error));
    }
  }

  useEffect(() => {
    if (params?.task) {
      setTask(params?.task);
    }
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Icon.ArrowLeft size={24} color="#000" />
        </S.BackButton>
        <S.HeaderTitle>Adicionar Tarefa</S.HeaderTitle>
      </S.Header>
      <S.TaskInput
        value={task.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
        placeholder="Adicione uma nova tarefa"
      />
      <S.AddButton onPress={() => handleAddTask()}>
        <S.AddButtonText>
          {params?.task ? "Editar" : "Adicionar"}
        </S.AddButtonText>
      </S.AddButton>
    </S.Container>
  );
}
