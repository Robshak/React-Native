import { View, Text, Image, StyleSheet } from "react-native";
import MyLink from "../shared/Link/Link";
import { Colors, Fonts } from "../shared/tokens";

export default function Unmatched() {
    return (
        <View style={styles.wrapper}>
            <Image source={require("../assets/imgs/unmatched.png")} style={styles.img} />
            <Text style={styles.text}>Ооо... что-то пошло не так. Попробуйте вернуться на главный экран приложения</Text>
            <MyLink href="/" text="Open main page"></MyLink>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        gap: 50,
        alignItems: "center",
        padding: 35,
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        fontFamily: Fonts.firaSans,
        color: Colors.white,
        textAlign: "center"
    },
    img: {
        width: 200,
        height: 280
    }
})