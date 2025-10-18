import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const SuccessScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image
                // source={require('./assets/success.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Đơn hàng đã được xác nhận!</Text>
            <Text style={styles.message}>
                Cảm ơn bạn đã mua. Đơn hàng của bạn đã được đặt thành công.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/(drawer)/(tabs)/home')}
            >
                <Text style={styles.buttonText}>Trờ về trang chủ</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#27ae60',
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#27ae60',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});