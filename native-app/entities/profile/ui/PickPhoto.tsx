import { View, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import axios, { AxiosError } from "axios";
import UploadButton from "../../../features/profile/ui/UploadButton";
import CircleImg from "../../../shared/CircleImg/CircleImg";
import { FILE_API } from "../api/api";
import { UploadResponse } from "../interfaces/upload.intarface";
import { useAtom } from "jotai";
import { updateProfileAtom } from "../../user/model/user.state";
import MyButton from "../../../shared/Button/Button";

export default function PickPhoto() {
    const [image, setImage] = useState<string | null>(null);
    // const [cameraPermissions, requestCameraPermissions] = ImagePicker.useCameraPermissions();
    const [libraryPermissions, requestLibraryPermissions] = ImagePicker.useMediaLibraryPermissions();
    const [profile, updateProfile] = useAtom(updateProfileAtom);

    useEffect(() => {
        if (!profile.profile?.photo) {
            return;
        }
        setImage(profile.profile.photo);
    }, []);

    // const varifyCameraPermissions = async () => {
    //     if (cameraPermissions?.status === ImagePicker.PermissionStatus.UNDETERMINED) {
    //         const res = await requestCameraPermissions();
    //         return res.granted;
    //     }
    //     if (cameraPermissions?.status === ImagePicker.PermissionStatus.DENIED) {
    //         Alert.alert("not enough rights");
    //         return false;
    //     }
    //     return true;
    // }

    const varifyLibraryPermissions = async () => {
        if (libraryPermissions?.status === ImagePicker.PermissionStatus.UNDETERMINED) {
            const res = await requestLibraryPermissions();
            return res.granted;
        }
        if (libraryPermissions?.status === ImagePicker.PermissionStatus.DENIED) {
            Alert.alert("not enough rights");
            return false;
        }
        return true;
    }

    // const captureAvatar = async () => {
    //     const isPermissionGranted = await varifyCameraPermissions();
    //     if (!isPermissionGranted) {
    //         return;
    //     }
    //     const result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         quality: 0.5
    //     });
    //     if (!result.assets?.length) {
    //         return;
    //     }
    //     setImage(result.assets[0].uri);
    // }

    const pickAvatar = async () => {
        const isPermissionGranted = await varifyLibraryPermissions();
        if (!isPermissionGranted) {
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5
        });
        if (!result.assets?.length) {
            return;
        }
        await uploadToServer(result.assets[0].uri, result.assets[0].fileName ?? result.assets[0].uri);
    }

    const uploadToServer = async (uri: string, name: string) => {
        const formData = new FormData();
        formData.append('files', {
            uri,
            name,
            type: 'image/jpeg',
        });
        try {
            const { data } = await axios.post<UploadResponse>(FILE_API.uploadImage, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImage(data.urls.original);
        } catch (e) {
            if (e instanceof AxiosError) {
                console.error(e);
            }
        }
    }

    const submitForm = () => {
        if (!image) {
            return;
        }
        updateProfile({ photo: image });
    }

    return (
        <View style={styles.wrapper1}>
            <View style={styles.wrapper2}>
                <View style={styles.imageBlock}>
                    <CircleImg photoUri={image && image} />
                    <UploadButton text="Pick from gallery" onPress={pickAvatar} />
                </View>
            </View>
            <MyButton text="Save data" onPress={() => submitForm()} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper1: {
        gap: 25
    },
    wrapper2: {
        alignItems: "center"
    },
    imageBlock: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    }
})