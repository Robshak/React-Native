import { StyleSheet, View, Image, KeyboardAvoidingView, Platform } from "react-native";
import Input from "../shared/Input/Input";
import { Colors } from "../shared/tokens";
import MyButton from "../shared/Button/Button";
import LoginError from "../shared/LoginError/LoginError";
import { useEffect, useState } from "react";
import MyLink from "../shared/Link/Link";
import { loginAtom, logoutAtom } from "../entities/auth/model/auth.state";
import { router, useRootNavigationState } from "expo-router";
import { useAtom, useSetAtom } from "jotai";

export default function Login() {
    const rootState = useRootNavigationState();
    const [errorState, setErrorState] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [{ access_token, isLoading, error }, setAuth] = useAtom(loginAtom);
    const logout = useSetAtom(logoutAtom);

    const submit = () => {
        if (!email) {
            setErrorState("Email is empty");
            return;
        }
        if (!password) {
            setErrorState("Password is empty");
            return;
        }
        setAuth({
            email,
            password
        });
    };

    useEffect(() => {
        logout();
    }, [])

    useEffect(() => {
        if (error) {
            setErrorState(error);
        }
    }, [error]);

    useEffect(() => {
        if (access_token && rootState.key) {
            router.replace("/");
        }
    }, [access_token]);

    return (
        <View style={styles.wrapper}>
            {errorState && <LoginError errorText={errorState} />}
            <Image style={styles.header} source={require("../assets/logo.png")} resizeMode="contain" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.form}>
                <Input placeholder="Email"
                    value={email}
                    onChangeText={(newText) => { setEmail(newText) }} />
                <Input placeholder="Password"
                    value={password}
                    onChangeText={(newText) => { setPassword(newText) }}
                    isPassword />
                <MyButton text="Enter" onPress={submit} isLoading={isLoading} />
            </KeyboardAvoidingView>
            <MyLink href="/restore" text="Refresh password"></MyLink>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.black,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 55,
    },
    form: {
        width: "100%",
        gap: 16,
        marginBottom: 60
    },
    header: {
        width: 170,
        height: 30,
        marginBottom: 50,
    },
});
