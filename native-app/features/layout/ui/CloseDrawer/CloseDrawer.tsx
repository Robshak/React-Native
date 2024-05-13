import {
    Pressable,
    StyleSheet,
    View,
    Image,
} from "react-native";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

export default function CloseDrawer(navigation: DrawerNavigationHelpers) {

    return (
        <Pressable
            onPress={() => navigation.closeDrawer()}>
            <View
                style={{
                    ...styles.button,
                }}
            >
                <Image source={require("../../../../assets/close.png")} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        right: 0,
        padding: 20,
        borderRadius: 10
    }
});
