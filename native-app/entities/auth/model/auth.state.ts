import {atomWithStorage, createJSONStorage} from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { IAuthResponse, ILoginRequest } from "./auth.interfaces";
import axios, { AxiosError } from "axios";
import { API } from "../api/api";

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

const INITIAL_STATE = {
    access_token: null,
        isLoading: false,
        error: null
}

export const authAtom = atomWithStorage<AuthState>(
    "auth",
    INITIAL_STATE,
    storage
)

export const loginAtom = atom((get) => get(authAtom), async(_get, set, { email, password }: ILoginRequest) => {
    set(authAtom, {
            isLoading: true,
            access_token: null,
            error: null
        });
    try{
        const { data } = await axios.post<IAuthResponse>(API.login, {
            email,
            password
        });

        set(authAtom, {
            isLoading: false,
            access_token: data.access_token,
            error: null
        });
    } catch(e) {
        if (e instanceof AxiosError) {
				set(authAtom, {
					isLoading: false,
					access_token: null,
					error: e.response?.data.message,
				});
			}
    }
});

export const logoutAtom = atom(null, (_get, set) => {
    set(authAtom, INITIAL_STATE);
});

export interface AuthState{
    access_token: string | null;
    isLoading: boolean;
    error: string | null;
}