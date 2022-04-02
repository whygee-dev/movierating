import React, { useContext } from "react";
import { View } from "react-native";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";
import { deleteKey } from "../tools/store";

const Account = ({ navigation }: any) => {
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    await deleteKey("token");
    setUser(null);
  };

  return (
    <View>
      <Button title="Logout" onPress={logout}></Button>
    </View>
  );
};

export default Account;
