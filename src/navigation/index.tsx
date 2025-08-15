import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { AddVeiculoScreen } from "../screens/AddVeiculoScreen";
import EditVeiculoScreen from "../screens/EditVeiculoScreen";
import DetailScreen from "../screens/DetailScreen";
import { Ionicons } from "@expo/vector-icons";

export type RootStackParamList = {
    Home: undefined;
    Add: undefined;
    Edit: { id: number };
    Detail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    // @ts-ignore
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#1e1e1e' },   // header cinza/escuro
                    headerTintColor: '#fff',                    // cor do botão back/ícones
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: 'white',
                            fontFamily: 'Poppins_600SemiBold'
                        }}>
                            Meus Veículos
                        </Text>
                    ),
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Add" component={AddVeiculoScreen} />
                <Stack.Screen name="Edit" component={EditVeiculoScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}