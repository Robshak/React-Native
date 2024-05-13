import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, Fonts } from "../../../../shared/tokens";
import MyLink from "../../../../shared/Link/Link";
import CloseDrawer from "../../../../features/layout/ui/CloseDrawer/CloseDrawer";
import { useAtom } from "jotai";
import { loadProfileAtom } from "../../../../entities/user/model/user.state";
import { useEffect } from "react";
import MenuItem from "../../../../entities/layout/ui/MenuItem/MenuItem";
import CircleImg from "../../../../shared/CircleImg/CircleImg";

const MENU = [
    {
        text: "Profile",
        icon: <Image source={require("../../../../assets/menuIcons/profile.png")} />,
        path: "profile"
    },
    {
        text: "Courses",
        icon: <Image source={require("../../../../assets/menuIcons/courses.png")} />,
        path: "index"
    },
]

export default function MyDrawer(props: DrawerContentComponentProps) {
    const [profile, loadProfile] = useAtom(loadProfileAtom);

    useEffect(() => {
        loadProfile();
    }, [])

    return <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
            <CloseDrawer {...props.navigation} />
            <View style={styles.profile}>
                <CircleImg photoUri={profile.profile?.photo} />
                <Text style={styles.profileText}>
                    {profile.profile?.name} {profile.profile?.surname}
                </Text>
            </View>
            <View>
                {MENU.map(menu => (
                    <MenuItem key={menu.path} {...menu} drawer={props} />
                ))}
            </View>
        </View>
        <View style={styles.footer}>
            <MyLink text="Logout" href={"/login"} />
            <Image source={require("../../../../assets/logo.png")} resizeMode="contain" />
        </View>
    </DrawerContentScrollView>
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: Colors.black
    },
    content: {
        flex: 1
    },
    profile: {
        marginTop: 60,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 40
    },
    profileText: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.firaSans
    },
    footer: {
        gap: 40,
        marginBottom: 50,
        alignItems: "center",
        justifyContent: "center"
    }
})