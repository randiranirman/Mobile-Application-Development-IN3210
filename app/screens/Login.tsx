import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
//import { setUser } from '../../src/store/slices/authSlice';
import { setUser } from '../store/slices/authSlice';
import { useRouter } from 'expo-router';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      
      // Mock login - in production, call your authentication API
      dispatch(setUser({ name: email.split('@')[0], email }));
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

        <View className="mb-6">
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

        <TouchableOpacity
          className="bg-primary p-4 rounded-lg mb-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold text-lg">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text className="text-white text-center">
            Don't have an account? <Text className="text-primary">Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}