import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { StudentCourseDescription } from "../model/course.model";
import MyButton from "../../../shared/Button/Button";
import { Colors, Fonts } from "../../../shared/tokens";
import CourseTag from "../../../shared/CourseTag/CourseTag";

export interface ICourse {
    course: StudentCourseDescription,
    haveStatus: boolean
}

export default function CourseCard({ course, haveStatus, ...props }: ViewProps & ICourse) {
    return <View  {...props}>
        <View style={styles.card}>
            <Image style={styles.img} source={{ uri: course.image }} />
            {haveStatus &&
                <View style={styles.progressbarWrapper}>
                    <View style={styles.progressbarInfo}>
                        <Text style={styles.progressbarPrecent}>{`${42}%`}</Text>
                        <Text style={styles.progressbarProgress}>{`10/120`}</Text>
                    </View>
                    <View style={styles.progressbar}>
                        <View style={styles.progressbarLine}></View>
                    </View>
                </View>
            }
            <View style={styles.info}>
                <Text style={styles.title}>{course.shortTitle}</Text>
                <View style={styles.tags}>
                    {course.courseOnDirection.map(t => (
                        <CourseTag key={t.direction.name} name={t.direction.name} />
                    ))}
                </View>
                {haveStatus &&
                    <Text style={styles.tariff}>
                        Тариф &laquo;{course.tariffs[0].name}&raquo;
                    </Text>
                }
            </View>
            <View style={styles.footer}>
                {haveStatus ?
                    <MyButton
                        style={styles.button}
                        text="Continue course"
                        onPress={() => Linking.openURL(`https://purlpeschool.ru/course/${course.alias}`)} /> :
                    <MyButton
                        style={styles.button}
                        text="Buy course"
                        onPress={() => Linking.openURL(`https://purlpeschool.ru/course/${course.alias}`)} />}
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: Colors.blackLight,
    },
    img: {
        width: 330,
        height: 170,
        marginBottom: 20
    },
    progressbarWrapper: {
        marginBottom: 20,
        paddingHorizontal: 12
    },
    progressbarInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },
    progressbar: {
        height: 5,
        backgroundColor: Colors.grayDark
    },
    progressbarLine: {
        backgroundColor: Colors.pink,
        height: "100%",
        width: "42%"
    },
    progressbarPrecent: {
        color: Colors.pink
    },
    progressbarProgress: {
        color: Colors.white
    },
    info: {
        paddingHorizontal: 25
    },
    title: {
        color: Colors.white,
        fontFamily: Fonts.firaSansSemiBold,
        fontSize: 21,
        lineHeight: 25,
        marginBottom: 12
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10
    },
    tariff: {
        color: Colors.primary,
        fontSize: 16,
        fontFamily: Fonts.firaSans,
        marginBottom: 20
    },
    footer: {
        backgroundColor: Colors.violetDark,
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    button: {
        maxWidth: 150,
        height: 60
    }
})