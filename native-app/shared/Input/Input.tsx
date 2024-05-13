import { Pressable, StyleSheet, TextInput, View, Image, TextInputProps } from "react-native";
import { Colors, Fonts } from "../tokens";
import { useState } from "react";

export default function Input({ isPassword, ...props }: TextInputProps & { isPassword?: boolean }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return (
        <View>
            <TextInput
                style={styles.input}
                secureTextEntry={isPassword && !isPasswordVisible}
                placeholderTextColor={Colors.gray}
                {...props}
            ></TextInput>
            {isPassword && (
                <Pressable onPress={() => setIsPasswordVisible((s) => !s)} style={styles.icon}>
                    {isPasswordVisible ? (
                        <Image source={require("../../assets/eye-open.png")} />
                    ) : (
                        <Image source={require("../../assets/eye-close.png")} />
                    )}
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        padding: 20,
        color: Colors.white,
        backgroundColor: Colors.violetDark,
        height: 60,
        borderRadius: 10,
        fontSize: 16,
        fontFamily: Fonts.firaSans
    },
    icon: {
        position: "absolute",
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
});
