import { useSQLiteContext } from "expo-sqlite";

export type TaskDatabase = {
  id?: number;
  name: string;
  status: boolean;
};

export function useTaskDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<TaskDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO tasks (name, status) VALUES ($name, $status)"
    );

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $status: false,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function updateName(data: TaskDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE tasks SET name = $name WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id ?? 0,
        $name: data.name,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function updateStatus(data: TaskDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE tasks SET status = $status WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id ?? 0,
        $status: data.status,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM tasks WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM tasks WHERE id = ?";

      const response = await database.getFirstAsync<TaskDatabase>(query, [id]);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function showAll() {
    try {
      const query = "SELECT * FROM tasks";

      const response = await database.getAllAsync<TaskDatabase>(query);

      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    updateName,
    updateStatus,
    remove,
    show,
    showAll,
  };
}
