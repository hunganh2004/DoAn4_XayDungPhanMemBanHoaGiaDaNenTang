import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { useUser } from '@/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_don_hang_create, api_chi_tiet_don_hang_create } from '@/constants/vars';
import { CartItem, SalesInvoice, SalesInvoiceDetail } from '@/constants/interfaces';
import { formatDate } from '@/utils/formatDate';

const CheckoutScreen = () => {
    const router = useRouter();
    const { user } = useUser();
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const getUserId = () => {
        if (user) {
            return user.id;
        }
        else throw new Error('User not logged in');
    }

    const totalAmount = async () => {
        const cartJson = await AsyncStorage.getItem('cart');
        const cartData = cartJson ? JSON.parse(cartJson) : [];
        return cartData.reduce((total: number, item: CartItem) => {
            return total + item.gia_san_pham * item.so_luong_mua;
        }, 0);
    };

    const getDetails = async (hoaDonId: number) => {
        const cartJson = await AsyncStorage.getItem('cart');
        const cartData = cartJson ? JSON.parse(cartJson) : [];
        return cartData.map((item: CartItem) => {
            return {
                id: 0, // ID sẽ được tạo bởi server
                ma_san_pham: item.id,
                ma_hoa_don_ban: hoaDonId, 
                so_luong: item.so_luong_mua,
                gia_ban: item.gia_san_pham,
                create_at: formatDate(new Date()),
                update_at: formatDate(new Date()),
            } as SalesInvoiceDetail;
        });
    };

    const createOrder = async () => {
        const total = await totalAmount();
        const order: SalesInvoice = {
            id: 0, // ID sẽ được tạo bởi server
            ma_nguoi_dung: getUserId(),
            ngay_ban: formatDate(new Date()),
            tong_tien: total,
            trang_thai: 'Chưa thanh toán',
            create_at: formatDate(new Date()),
            update_at: formatDate(new Date()),
            ghi_chu: note,
        };

        console.log('Order to send:', order); // Debug log
        const res = await fetch(api_don_hang_create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([order]),
        });   
        return res.json();
    };

    const createOrderDetail = async (orderId: number) => {

        const details = await getDetails(orderId);
        console.log('Details to send:', details); // Debug log

        for (const item of details) {
            const res = await fetch(api_chi_tiet_don_hang_create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([item]),
            });
            if (!res.ok) {
                console.error('Error creating order detail:', res.statusText);
            }
        }
    };

    const handleOrder = async () => {
        if (!name || !address || !phone) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            const orderRes = await createOrder();
            console.log('Order response:', orderRes); // Debug log
            const orderId = orderRes.id;
            await createOrderDetail(orderId);
        } catch (error) {
            console.error('Error creating order:', error);
            return;
        }

        await AsyncStorage.removeItem('cart')
        Alert.alert('Thành công', 'Đơn hàng của bạn đã được đặt!');
        setName('');
        setAddress('');
        setPhone('');
        setNote('');
        router.replace('/success');
    };

    useEffect(() => {
        if (user) {
            setName(user.ten_nguoi_dung)
            setAddress(user.dia_chi_nguoi_dung)
            setPhone(user.sdt_nguoi_dung)
            setNote('')
        }
    },[user])

    if (!user) {
        return <Redirect href='/login?redirectTo=/checkout' />
    }

    if (!user.ten_nguoi_dung || !user.dia_chi_nguoi_dung || !user.sdt_nguoi_dung) {
        return <Redirect href='/edit-profile?redirectTo=/checkout' />
    }

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
                multiline
                numberOfLines={5}
                maxLength={1000}
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