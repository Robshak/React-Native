import { SplashScreen, Stack } from "expo-router";
import { Colors } from "../shared/tokens";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import { Notification } from "../shared/Notification/Notification";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        FiraSans: require('../assets/fonts/FiraSans-Regular.ttf'),
        FiraSansSemiBold: require('../assets/fonts/FiraSans-SemiBold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <SafeAreaProvider>
                <Notification />
                <StatusBar style="light" />
                <Stack
                    screenOptions={{
                        statusBarColor: Colors.black,
                        contentStyle: {
                            backgroundColor: Colors.black
                        },
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="login" options={{}} />
                    <Stack.Screen name="restore" options={{
                        presentation: "modal"
                    }} />
                </Stack>
            </SafeAreaProvider>
        </>
    )
}