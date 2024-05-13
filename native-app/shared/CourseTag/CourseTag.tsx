import { StyleSheet, Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Colors, Fonts } from "../tokens";

export default function CourseTag({ name, ...props }: ViewProps & { name: string }) {
    return <View style={styles.wrapper} {...props}>
        <Text style={styles.text}>{name}</Text>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        borderColor: Colors.violetDark,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: Fonts.firaSans
    }
})