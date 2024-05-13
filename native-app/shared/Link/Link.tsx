import {
    StyleSheet,
    Text,
} from "react-native";
import { Colors, Fonts } from "../tokens";
import { Link } from "expo-router";
import { MyLinkProps } from "./Link.props";
import { LinkProps } from "expo-router/build/link/Link";

export default function MyLink({ text, ...props }: LinkProps & MyLinkProps) {
    return (
        <Link {...props}>
            <Text style={styles.text}>{text}</Text>
        </Link>
    );
}

const styles = StyleSheet.create({
    text: {
        color: Colors.link,
        fontSize: 18,
        fontFamily: Fonts.firaSans
    }
});
