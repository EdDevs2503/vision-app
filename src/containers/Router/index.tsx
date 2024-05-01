import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Initialization from "../../compositions/Initialization";
import Camera from "../CameraContainer";
import Permissions from "../Permissions";

const Stack = createNativeStackNavigator();

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Initialization" component={Initialization} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Permissions" component={Permissions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
