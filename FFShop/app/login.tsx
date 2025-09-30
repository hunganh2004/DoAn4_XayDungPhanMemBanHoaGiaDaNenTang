import { User } from '@/constants/interfaces';
import { api_nguoi_dung_login } from '@/constants/vars';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { setUser } = useUser();

    const handleLoginSuccess = async (userData: User) => {
        await AsyncStorage.setItem('user', JSON.stringify(userData))
        setUser(userData);
        router.replace('/(drawer)/(tabs)/home'); // chuyển hướng sau khi đăng nhập thành công
    }

    const handleLogin = async () => {
         console.log('Login button pressed'); // ✅ kiểm tra xem hàm có chạy

        try {
            const response = await fetch(api_nguoi_dung_login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_nguoi_dung: email, mat_khau_nguoi_dung: password }),
            });
            const data = await response.json();
            if (data.length === 0) {
                Alert.alert('Login Failed', 'Invalid email or password.');
                console.log('Login failed, no user data returned'); // ✅ kiểm tra phản hồi
                return;
            }
            const user: User = data[0];
            console.log('Logged in user:', user);
            Alert.alert('Login Successful', `Welcome, ${user.ten_nguoi_dung}!`);
            handleLoginSuccess(user);
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', 'Invalid email or password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FFShop Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>Welcome to the Fake Flower Shop!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#b56576',
        marginBottom: 32,
    },
    input: {
        width: '100%',
        height: 48,
        borderColor: '#b56576',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 48,
        backgroundColor: '#b56576',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        color: '#6d6875',
        fontSize: 16,
    },
});

export default LoginScreen;