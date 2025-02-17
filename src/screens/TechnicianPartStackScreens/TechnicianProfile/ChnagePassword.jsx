import React from 'react';
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
import tw from '../../../lib/tailwind';

const ChnagePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    Alert.alert('Password Updated', 'Your password has been updated successfully.');
  };

  return (
    <ScrollView style={tw`bg-white h-full`}>
      <View style={tw`p-4`}>
        <View style={tw`bg-[#F0F0F0] p-4 rounded-lg items-center`}>
          <Image
            source={require('../../../assets/Icons/avater.png')}
            style={tw`w-[70px] h-[70px] rounded-full`}
          />
          <Text style={tw`text-[16px] text-[#000000] font-semibold mt-2`}>
            Md. Sazzat Hasan
          </Text>
          <Text style={tw`text-[12px] text-[#878787] font-medium`}>
            example@gmail.com
          </Text>
        </View>
      </View>

      <View style={tw`p-4 gap-2`}>
        <View>
          <Text style={tw`text-[16px] pb-[3px] text-[#000000] font-semibold`}>
            Current password
          </Text>
          <Controller
            control={control}
            rules={{
              required: 'Current password is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="**********"
                placeholderTextColor={'#818181'}
                secureTextEntry={true}
                style={tw`text-[16px] text-[#000000] font-semibold p-4 bg-[#F0F0F0] rounded-sm`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="currentPassword"
          />
          {errors.currentPassword && (
            <Text style={tw`text-red-500 text-[12px]`}>
              {errors.currentPassword.message}
            </Text>
          )}
        </View>

        <View>
          <Text style={tw`text-[16px] pb-[3px] text-[#000000] font-semibold`}>
            New password
          </Text>
          <Controller
            control={control}
            rules={{
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="**********"
                placeholderTextColor={'#818181'}
                secureTextEntry={true}
                style={tw`text-[16px] text-[#000000] font-semibold p-4 bg-[#F0F0F0] rounded-sm`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={tw`text-red-500 text-[12px]`}>
              {errors.password.message}
            </Text>
          )}
        </View>

        <View>
          <Text style={tw`text-[16px] pb-[3px] text-[#000000] font-semibold`}>
            Confirm password
          </Text>
          <Controller
            control={control}
            rules={{
              required: 'Confirm password is required',
              validate: (value, formValues) =>
                value === formValues.password || 'Passwords do not match',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="**********"
                placeholderTextColor={'#818181'}
                secureTextEntry={true}
                style={tw`text-[16px] text-[#000000] font-semibold p-4 bg-[#F0F0F0] rounded-sm`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text style={tw`text-red-500 text-[12px]`}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={tw`bg-[#ED1C24] p-4 rounded-lg flex-row items-center justify-center mt-4 max-w-[300px] mx-auto`}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={tw`text-[16px] text-white font-semibold`}>
            SAVE CHANGES
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChnagePassword;
