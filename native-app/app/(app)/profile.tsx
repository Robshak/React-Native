import { View, StyleSheet } from "react-native";
import PickPhoto from "../../entities/profile/ui/PickPhoto";

export default function Profile() {

    return (
        <View style={styles.wrapper}>
            <PickPhoto />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 25,
        paddingVertical: 32,
        paddingHorizontal: 40,
        alignItems: "center"
    }
})