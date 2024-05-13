import { Dimensions, StyleSheet, Text, Animated } from "react-native";
import { useEffect, useState } from "react";
import { Colors, Fonts } from "../tokens";
import { LoginErorrProps } from "./LoginError.props";

export default function Input({ errorText }: LoginErorrProps) {
	const [isShown, setIsShown] = useState<boolean>(false);
	const animatedValue = new Animated.Value(-100);

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		if (!errorText) {
			return;
		}
		setIsShown(true);

		const timerId = setTimeout(() => {
			setIsShown(false);
		}, 3000);

		return () => {
			clearTimeout(timerId);
		};
	}, [errorText]);

	if (!isShown) {
		return <></>;
	}

	return (
		<Animated.View
			style={{
				...styles.wrapper,
				transform: [{ translateY: animatedValue }],
			}}
			onLayout={onEnter}
		>
			<Text style={styles.textStyle}>{errorText}</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		position: "absolute",
		width: Dimensions.get("window").width,
		padding: 15,
		top: 0,
		backgroundColor: Colors.red,
		justifyContent: "center",
		alignItems: "center",
	},
	textStyle: {
		color: Colors.white,
		fontSize: 16,
		fontFamily: Fonts.firaSans
	},
});
