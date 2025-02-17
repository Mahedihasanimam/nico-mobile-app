import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import tw from '../../../lib/tailwind';
import { editicon } from '../../../assets/Icons/icons';
import { SvgXml } from 'react-native-svg';

const EditProfile = () => {
    const [imageUri, setImageUri] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            organization: '',
        },
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        Alert.alert("Profile Updated", "Your profile has been updated successfully.");
    };

    const openCamera = () => {
        launchCamera(
            {
                mediaType: 'photo',
                cameraType: 'back',
                saveToPhotos: true,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('Error: ', response.errorMessage);
                } else {
                    setImageUri(response.assets[0].uri);
                }
            }
        );
    };

    const openGallery = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('Error: ', response.errorMessage);
                } else {
                    setImageUri(response.assets[0].uri);
                }
            }
        );
    };

    return (
        <ScrollView style={tw`bg-white h-full`}>
            <View style={tw`p-4`}>
                <View style={tw`bg-[#F0F0F0] p-4 rounded-lg items-center`}>
                    <TouchableOpacity onPress={openGallery}>
                        {imageUri ? (
                            <Image
                                source={{ uri: imageUri }}
                                style={tw`w-[100px] h-[100px] rounded-full`}
                            />
                        ) : (
                            <View style={tw`w-[100px] h-[100px] rounded-full bg-gray-300 justify-center items-center`}>
                               
                                <Image
                                    source={require('../../../assets/Icons/avater.png')}
                                    style={tw`w-full h-full rounded-full`}
                                />

                                <TouchableOpacity
                                    onPress={openCamera}
                                    style={tw`absolute bottom-0 right-0 w-8 h-8  bg-white rounded-full items-center justify-center`}
                                >
                                   
                                        <SvgXml xml={editicon} />
                                  
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                    <Text style={tw`text-[16px] text-[#000000] font-semibold mt-2`}>Md. Sazzat Hasan</Text>
                    <Text style={tw`text-[12px] text-[#878787] font-medium`}>example@gmail.com</Text>
                </View>
            </View>

            <View style={tw`p-4 gap-2`}>
                <View>
                    <Text style={tw`text-[16px] pb-[3px] text-[#000000] font-semibold`}>Name</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Name is required',
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={'#878787'}
                                style={tw`text-[16px] text-[#000000] font-semibold p-4 bg-[#F0F0F0] rounded-sm`}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="name"
                    />
                    {errors.name && <Text style={tw`text-red-500 text-[12px]`}>{errors.name.message}</Text>}
                </View>

                <View>
                    <Text style={tw`text-[16px] pb-[3px] text-[#000000] font-semibold`}>Email</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Invalid email format',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="example@gmail.com"
                                placeholderTextColor={'#878787'}
                                style={tw`text-[16px] text-[#000000] font-semibold p-4 bg-[#F0F0F0] rounded-sm`}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                        name="email"
                    />
                    {errors.email && <Text style={tw`text-red-500 text-[12px]`}>{errors.email.message}</Text>}
                </View>

                <View>
                    <Text style={tw`text-[16px] pb-[3px] text-[#000000] font-semibold`}>Organization</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Organization name is required',
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Enter your organization name"
                                placeholderTextColor={'#878787'}
                                style={tw`text-[16px] text-[#000000] font-semibold p-4 bg-[#F0F0F0] rounded-sm`}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="organization"
                    />
                    {errors.organization && (
                        <Text style={tw`text-red-500 text-[12px]`}>{errors.organization.message}</Text>
                    )}
                </View>

                <TouchableOpacity
                    style={tw`bg-[#ED1C24] p-4 rounded-lg flex-row items-center justify-center mt-4 max-w-[300px] mx-auto`}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={tw`text-[16px] text-white font-semibold`}>SAVE CHANGES</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default EditProfile;
