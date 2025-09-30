import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const NotFoundScreen = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.replace('/(drawer)/home' as never);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Không tìm thấy trang</Text>
            <Text style={styles.message}>
                Trang bạn yêu cầu không tồn tại hoặc đã bị xóa.
            </Text>
            <Button title="Quay về trang chủ" onPress={handleGoHome} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#d32f2f',
    },
    message: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
    },
});

export default NotFoundScreen;