import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '@/constants/interfaces';
import { host } from '@/constants/vars';
import formatCurrencyVND from '@/utils/formatCurrencyVND';



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

    const updateQuantity = async (id: number, newQuantity: number) => {
        if (newQuantity < 1) return

        const updateCart = cart.map((item) => (
            item.id === id ? { ...item, so_luong_mua: newQuantity }: item
        ))

        setCart(updateCart)
        await AsyncStorage.setItem('cart', JSON.stringify(updateCart))
    }

    const removeItem = async (id: number) => {
        const updateCart = cart.filter(item => item.id !== id)
        setCart(updateCart)
        await AsyncStorage.setItem('cart', JSON.stringify(updateCart))
    }

    const renderItem = ({ item }: {item: CartItem}) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: host + item.anh_san_pham }} style={styles.image} />
            <View style={styles.info}>
                <View style = {{ flexDirection : "row" , justifyContent:"space-between"}}>
                    <View>
                        <Text style={styles.name}>{item.ten_san_pham}</Text>
                        <Text>Giá: {formatCurrencyVND(item.gia_san_pham)} đ</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <Text style={styles.removeText}>🗑️</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.so_luong_mua - 1)}>
                        <Text style={styles.actionText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>SL: {item.so_luong_mua}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.so_luong_mua + 1)}>
                        <Text style={styles.actionText}>+</Text>
                    </TouchableOpacity>
                </View>
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
                    <Text style={styles.total}>Tổng cộng: {formatCurrencyVND(total)}</Text>
                    <TouchableOpacity style={styles.button}
                    onPress={() => router.push('/checkout')}>
                        <Text 
                        style={styles.buttonText}
                        
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
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    actionText: {
        fontSize: 20,
        paddingHorizontal: 12,
        color: '#8e44ad',
    },
        quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
        removeText: {
        fontSize: 18,
        color: '#e74c3c',
        marginLeft: 16,
    },

});