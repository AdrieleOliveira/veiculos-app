import React from "react";
import AppNavigator from "./src/navigation";
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        Poppins_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' }}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={{ color: '#ffffff', marginTop: 10 }}>Carregando...</Text>
            </View>
        );
    }

    return (
        <>
            <AppNavigator />
            <StatusBar style="light" /> {}
        </>
    );
}