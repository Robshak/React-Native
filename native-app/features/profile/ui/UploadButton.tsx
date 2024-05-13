import {
    Pressable,
    StyleSheet,
    Text,
    PressableProps,
    Animated,
    GestureResponderEvent,
    ActivityIndicator,
    Image,
} from "react-native";
import { Colors, Fonts } from "../../../shared/tokens";

export default function UploadButton({ text, isLoading, ...props }: PressableProps & { text: string, isLoading?: boolean }) {
    const animatedValue = new Animated.Value(100);
    const color = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [Colors.blackLight, Colors.violetDark],
    });

    const fadeIn = (e: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
        props.onPressIn && props.onPressIn(e);
    };

    const fadeOut = (e: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 100,
            useNativeDriver: false,
        }).start();
        props.onPressOut && props.onPressOut(e);
    };

    return (
        <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View
                style={{
                    ...styles.button,
                    backgroundColor: color,
                }}
            >
                <Image source={require("../../../assets/upload.png")} />
                {!isLoading && <Text style={styles.buttonText}>{text}</Text>}
                {isLoading && <ActivityIndicator size="large" color={Colors.white} />}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
        height: 60,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.firaSans
    },
});
