import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { VeiculoFormScreen } from "../screens/VeiculoFormScreen";
import DetailScreen from "../screens/DetailScreen";
import { Ionicons } from "@expo/vector-icons";

export type RootStackParamList = {
    Home: undefined;
    VeiculoForm: { id?: number };
    Detail: { id: number };
    Edit: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#1e1e1e' },
                    headerTintColor: '#fff',
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
                <Stack.Screen name="VeiculoForm" component={VeiculoFormScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="Edit" component={VeiculoFormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}