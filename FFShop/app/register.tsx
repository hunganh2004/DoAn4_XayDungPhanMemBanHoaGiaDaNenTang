import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { api_nguoi_dung_register } from '@/constants/vars';

const RegisterScreen = () => {
    const [tenNguoiDung, setTenNguoiDung] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
        const response = await fetch(api_nguoi_dung_register, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ten_nguoi_dung: tenNguoiDung,
                email_nguoi_dung: email,
                mat_khau_nguoi_dung: password,
            }),
        });

        const result = await response.json();
        
        if (result) {
            Alert.alert('Đăng ký thành công', 'Bạn có thể đăng nhập ngay bây giờ!');
            router.replace('/login');
        } else {
            Alert.alert('Đăng ký thất bại', result.message || 'Vui lòng thử lại.');
        }
        } catch (error) {
        console.error('Register error:', error);
        Alert.alert('Lỗi', 'Không thể đăng ký. Vui lòng thử lại sau.');
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Đăng ký FFShop</Text>
        <TextInput style={styles.input} placeholder="Tên người dùng" value={tenNguoiDung} onChangeText={setTenNguoiDung} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login' as never)}>
            <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
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
    link: {
        color: '#b56576',
        fontSize: 16,
        textDecorationLine: 'underline',
        marginBottom: 8,
    }
});

export default RegisterScreen;