import {
    Pressable,
    StyleSheet,
    PressableProps,
    View,
    Image,
} from "react-native";
import { Colors } from "../../../../shared/tokens";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MenuButton({ navigation, ...props }: PressableProps & { navigation: any }) {
    const [clicked, setClicked] = useState<boolean>(false);

    return (
        <Pressable
            {...props}
            style={{
                ...styles.wrapper,
                backgroundColor: clicked ? Colors.violetDark : Colors.blackLight
            }}
            onPressIn={() => setClicked(true)}
            onPressOut={() => setClicked(false)}
            onPress={navigation.toggleDrawer}>
            <View
                style={{
                    ...styles.button
                }}
            >
                <Image source={require("../../../../assets/menu-icon.png")} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: "100%"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
    }
});
