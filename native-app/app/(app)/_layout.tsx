import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer"
import { useAtomValue } from "jotai";
import { authAtom } from "../../entities/auth/model/auth.state";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../shared/tokens";
import MenuButton from "../../features/layout/ui/MenuButton/MenuButton";
import MyDrawer from "../../widget/layout/ui/Drawer/Drawer";

export default function RootLayout() {
    const { access_token } = useAtomValue(authAtom);

    if (!access_token) {
        return <Redirect href="/login" />
    }

    return (
        <GestureHandlerRootView style={styles.wrapper}>
            <Drawer
                drawerContent={(props) => <MyDrawer {...props} />}
                screenOptions={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: Colors.blackLight,
                        shadowColor: Colors.blackLight
                    },
                    headerLeft: () => {
                        return <MenuButton navigation={navigation} style={styles.icon} />
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontFamily: Fonts.firaSans,
                        fontSize: 20
                    },
                    headerTitleAlign: "center",
                    sceneContainerStyle: {
                        backgroundColor: Colors.black
                    }
                })}>
                <Drawer.Screen name="index" options={{
                    title: "My courses"
                }} />
                <Drawer.Screen name="profile" options={{
                    title: "Profile"
                }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    icon: {
        marginLeft: 10
    }
})