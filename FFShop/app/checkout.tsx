import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const CheckoutScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');

    const handleOrder = () => {
        if (!name || !address || !phone) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }
        Alert.alert('Thành công', 'Đơn hàng của bạn đã được đặt!');
        setName('');
        setAddress('');
        setPhone('');
        setNote('');
        router.push('/success');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Thanh toán</Text>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập họ và tên"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Địa chỉ giao hàng</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ"
                value={address}
                onChangeText={setAddress}
            />
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />
            <Text style={styles.label}>Ghi chú (tuỳ chọn)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ghi chú cho cửa hàng"
                value={note}
                onChangeText={setNote}
            />
            <TouchableOpacity style={styles.button} onPress={handleOrder}>
                <Text style={styles.buttonText}>Đặt hàng</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#8e44ad',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    button: {
        backgroundColor: '#8e44ad',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;