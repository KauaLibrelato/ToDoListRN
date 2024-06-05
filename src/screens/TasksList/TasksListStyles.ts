import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #ffffff;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

export const TaskCount = styled.Text`
  font-size: 16px;
  color: #777;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: "large",
  color: "#007bff",
})`
  margin-top: 20px;
`;

export const AddButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: #007bff;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

export const InfoButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: #007bff;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

export const TaskItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid #ccc;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TaskLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TaskText = styled.Text`
  font-size: 20px;
  color: #2b2b2b;
  margin-left: 10px;
`;

export const EventButton = styled.Pressable``;
