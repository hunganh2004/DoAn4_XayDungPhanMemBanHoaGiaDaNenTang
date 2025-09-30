import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '@/constants/interfaces';
import { host } from '@/constants/vars';



const CartScreen = () => {
    const router = useRouter();
    const [ cart, setCart ] = useState<CartItem[]>([])

    const total = cart.reduce(
        (sum, item:CartItem) => sum + item.gia_san_pham * item.so_luong_mua,
        0
    );

    const loadCart = async () => {
        const cartJson = await AsyncStorage.getItem('cart')
        const cartData = cartJson ? JSON.parse(cartJson) : []
        setCart(cartData)
    }

    const renderItem = ({ item }: {item: CartItem}) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: host + item.anh_san_pham }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.ten_san_pham}</Text>
                <Text>Số lượng: {item.so_luong_mua}</Text>
                <Text>Giá: {item.gia_san_pham} đ</Text>
            </View>
        </View>
    );

    useEffect(() => {
        loadCart()
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadCart()
        }, [])
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng hoa giả</Text>
            {cart.length === 0 ? (
                <Text style={{ textAlign: 'center', marginVertical: 20, color: '#888' }}>
                Giỏ hàng của bạn đang trống.
                </Text>
            ):(
                <>
                <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                style={styles.list}
                />
                <View style={styles.footer}>
                    <Text style={styles.total}>Tổng cộng: {total} đ</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text 
                        style={styles.buttonText}
                        onPress={() => router.push('/checkout')}
                        >Thanh toán</Text>
                    </TouchableOpacity>
                </View>
                </>
            )}
            
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#8e44ad' },
    list: { flex: 1 },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#f3e6fa',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },
    image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#6c3483' },
    footer: {
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingTop: 12,
        alignItems: 'center',
    },
    total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#8e44ad' },
    button: {
        backgroundColor: '#8e44ad',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});