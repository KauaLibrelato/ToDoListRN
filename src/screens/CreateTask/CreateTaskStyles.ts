import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const BackButton = styled.Pressable`
  padding: 8px;
  margin: -8px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-left: 16px;
`;

export const TaskInput = styled.TextInput`
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 4px 8px;
`;

export const AddButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: #007bff;
  padding: 8px 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
`;

export const AddButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
