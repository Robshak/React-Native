import { atom } from "jotai";
import { authAtom } from "../../auth/model/auth.state";
import { API } from "../api/api";
import axios, { AxiosError } from "axios";
import { StudentCourseDescription } from "./course.model";

export const courseAtom = atom<UserState>({
    courses: [],
    isLoading: false,
    error: null
});

export const loadCoursesAtom = atom(
    async (get) => {
        return get(courseAtom);
    },
    async (get, set) => {
        const {access_token} = await get(authAtom);
        set(courseAtom, {
            isLoading: true,
            courses: [],
            error: null
        });
        try{
            const { data } = await axios.get<StudentCourseDescription[]>(API.my, {
                params: {
                    studentCourse: "dontMy"
                },
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            set(courseAtom, {
                isLoading: false,
                courses: data,
                error: null
            });
        } catch(e) {
            if (e instanceof AxiosError) {
                set(courseAtom, {
                    isLoading: false,
                    courses: [],
                    error: e.response?.data.message,
                });
            }
        }
    }
)

export interface UserState{
    courses: StudentCourseDescription[];
    isLoading: boolean;
    error: string | null;
}