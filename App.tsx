import React from "react";
import AppNavigator from "./src/navigation";
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    const [loaded] = useFonts({
        Poppins_600SemiBold,
    });

    if (!loaded) return null;

    return (
        <>
            <AppNavigator />
            <StatusBar style="light" /> {}
        </>
    );
}