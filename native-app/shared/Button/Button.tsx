import {
    Pressable,
    StyleSheet,
    Text,
    PressableProps,
    Animated,
    GestureResponderEvent,
    ActivityIndicator,
} from "react-native";
import { Colors, Fonts } from "../tokens";

export default function MyButton({ text, isLoading, ...props }: PressableProps & { text: string, isLoading?: boolean }) {
    const animatedValue = new Animated.Value(100);
    const color = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [Colors.primaryHover, Colors.primary],
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
        <Pressable style={styles.wrapper}
            {...props}
            onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View
                style={{
                    ...styles.button,
                    backgroundColor: color,
                }}
            >
                {!isLoading && <Text style={styles.buttonText}>{text}</Text>}
                {isLoading && <ActivityIndicator size="large" color={Colors.white} />}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
    },
    button: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
        marginBottom: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.firaSans
    },
});
