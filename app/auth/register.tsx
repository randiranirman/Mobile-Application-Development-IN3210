import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
//import { setUser } from '../../src/store/slices/authSlice';
import { setUser } from '../store/slices/authSlice';
import { useRouter } from 'expo-router';
import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await registerSchema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false }
      );
      setErrors({});
      
      // Mock registration - in production, call your authentication API
      dispatch(setUser({ name, email }));
      router.replace('/tabs');
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner?.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-dark"
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-primary text-5xl font-bold mb-8 text-center">
          StreamBox
        </Text>
        
        <View className="mb-4">
          <Text className="text-white mb-2">Name</Text>
          <TextInput
            className={`bg-secondary text-white p-4 rounded-lg ${errors.name ? 'border-2 border-red-500' : ''}`}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text className="text-red-500 mt-1">{errors.name}</Text>}
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Email</Text>
          <TextInput
            className={`bg-secondary text-white p-4 rounded-lg ${errors.email ? 'border-2 border-red-500' : ''}`}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text className="text-red-500 mt-1">{errors.email}</Text>}
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Password</Text>
          <TextInput
            className={`bg-secondary text-white p-4 rounded-lg ${errors.password ? 'border-2 border-red-500' : ''}`}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}
        </View>

        <View className="mb-6">
          <Text className="text-white mb-2">Confirm Password</Text>
          <TextInput
            className={`bg-secondary text-white p-4 rounded-lg ${errors.confirmPassword ? 'border-2 border-red-500' : ''}`}
            placeholder="Confirm your password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword && <Text className="text-red-500 mt-1">{errors.confirmPassword}</Text>}
        </View>

        <TouchableOpacity
          className="bg-primary p-4 rounded-lg mb-4"
          onPress={handleRegister}
        >
          <Text className="text-white text-center font-bold text-lg">Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white text-center">
            Already have an account? <Text className="text-primary">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}