import { useAtomValue, useSetAtom } from "jotai";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { courseAtom, loadCoursesAtom } from "../../entities/course/model/course.state";
import { useEffect } from "react";
import { Colors } from "../../shared/tokens";
import CourseCard from "../../entities/course/ui/card";
import { StudentCourseDescription } from "../../entities/course/model/course.model";
import { RefreshControl } from "react-native-gesture-handler";
import MyButton from "../../shared/Button/Button";
import * as Notifications from "expo-notifications";

export default function MyCourses() {
    const { isLoading, courses } = useAtomValue(courseAtom);
    const loadCourses = useSetAtom(loadCoursesAtom);

    useEffect(() => {
        loadCourses();
    }, [])

    const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
        return <CourseCard style={styles.item} haveStatus={true} course={item} />
    }

    const allowsNotification = async () => {
        const setting = await Notifications.getPermissionsAsync();
        return (setting.granted || setting.ios?.status == Notifications.IosAuthorizationStatus.PROVISIONAL)
    }

    const requestPermissions = async () => {
        return Notifications.requestPermissionsAsync({
            ios: {
                allowAlert: true,
                allowBadge: true,
                allowSound: true
            }
        })
    }

    const scheduleNotification = async () => {
        const granted = await allowsNotification();
        if (!granted) {
            await requestPermissions();
        }
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Dont forget to take course",
                body: "Dont forget study everyday",
                data: {
                    alias: "typescript"
                }
            },
            trigger: {
                seconds: 5
            }
        })
    }

    return (
        // <ScrollView>
        //     <View style={styles.wrapper}>
        //         {courses.length > 0 && courses.map(c => (
        //             <CourseCard key={c.id} haveStatus={false} course={c} />
        //         ))}
        //     </View>
        // </ScrollView>
        <>
            <MyButton text="Remind" onPress={scheduleNotification} />
            {isLoading && <ActivityIndicator
                size="large"
                color={Colors.primary}
                style={styles.loading}
            />}
            {courses.length > 0 &&
                <FlatList
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.primary}
                            titleColor={Colors.primary}
                            refreshing={isLoading}
                            onRefresh={loadCourses} />
                    }
                    style={styles.wrapper}
                    data={courses}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderCourse} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 30,
        marginTop: 30,
        marginBottom: 30
    },
    item: {
        marginBottom: 20
    },
    loading: {
        flex: 1
    }
})