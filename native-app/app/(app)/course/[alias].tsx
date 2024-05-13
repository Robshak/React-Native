import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../../../shared/tokens";

export default function CoursePage() {
    const { alias } = useLocalSearchParams();

    return (
        <Text style={{ backgroundColor: Colors.white }}>{alias}</Text>
    )
}