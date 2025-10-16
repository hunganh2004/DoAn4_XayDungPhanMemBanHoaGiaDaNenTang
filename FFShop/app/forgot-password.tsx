import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { api_nguoi_dung_quen_mat_khau } from '@/constants/vars';

    const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleForgotPassword = async () => {
        try {
        const response = await fetch(api_nguoi_dung_quen_mat_khau, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_nguoi_dung: email }),
        });

        const result = await response.json();
        if (result.success) {
            Alert.alert('Thành công', 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.');
            router.replace('/login');
        } else {
            Alert.alert('Thất bại', result.message || 'Email không tồn tại.');
        }
        } catch (error) {
        console.error('Forgot password error:', error);
        Alert.alert('Lỗi', 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.');
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Quên mật khẩu</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Gửi liên kết khôi phục</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login' as never)}>
            <Text style={styles.link}>Quay lại đăng nhập</Text>
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

export default ForgotPasswordScreen;