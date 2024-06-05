import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TasksList from "../screens/TasksList/TasksList";
import CreateTask from "../screens/CreateTask/CreateTask";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TasksList"
    >
      <Screen name="TasksList" component={TasksList} />
      <Screen name="CreateTask" component={CreateTask} />
    </Navigator>
  );
}
