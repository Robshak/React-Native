import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../tokens";

export default function CircleImg({ photoUri = null }: { photoUri?: string | null }) {
    return (
        <View>
            {
                photoUri ? <Image source={{ uri: photoUri }} style={styles.img} /> :
                    <Image source={require("../../assets/imgs/profile.png")} style={styles.img} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 80,
        height: 80,
        borderRadius: 90,
        borderColor: Colors.grayDark,
        borderWidth: 2
    }
})