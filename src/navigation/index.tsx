import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddVeiculoScreen from "../screens/AddVeiculoScreen";
import EditVeiculoScreen from "../screens/EditVeiculoScreen";
import DetailScreen from "../screens/DetailScreen";

export type RootStackParamList = {
    Home: undefined;
    Add: undefined;
    Edit: { id: number };
    Detail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Add" component={AddVeiculoScreen} />
                <Stack.Screen name="Edit" component={EditVeiculoScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}