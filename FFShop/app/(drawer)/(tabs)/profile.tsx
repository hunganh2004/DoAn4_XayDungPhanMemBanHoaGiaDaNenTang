import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
    const router = useRouter();
    const { user, setUser, logout} = useUser()

    if (!user) {
        return(
            <View style={styles.container}>
            <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                style={styles.avatar}
            />
            <Text style={styles.name}>Bạn chưa đăng nhập</Text>
        
            <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={() => {
                        router.push('/login');
                    }}>
                <Text style={styles.buttonText}
                >Đăng nhập</Text>
            </TouchableOpacity>
            
        </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                style={styles.avatar}
            />
            <Text style={styles.name}>{user?.ten_nguoi_dung}</Text>
            <Text style={styles.email}>{user?.email_nguoi_dung}</Text>

            <View style={styles.infoSection}>
                <Text style={styles.label}>Số điện thoại:</Text>
                <Text style={styles.value}>0123 456 789</Text>
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.label}>Địa chỉ:</Text>
                <Text style={styles.value}>123 Đường ABC, Quận 1, TP.HCM</Text>
            </View>

            <TouchableOpacity style={styles.button}
            onPress={() => {
                        // Xử lý chỉnh sửa hồ sơ
                        router.push('/edit-profile' as never);
                    }}>
                <Text style={styles.buttonText}
                    
                >Chỉnh sửa hồ sơ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.logoutButton]}
            onPress={() => {
                        logout()
                    }}>
                <Text style={styles.buttonText}
                    
                >Đăng xuất</Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 32,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    infoSection: {
        flexDirection: 'row',
        marginBottom: 12,
        width: '100%',
        justifyContent: 'flex-start',
    },
    label: {
        fontWeight: 'bold',
        width: 110,
    },
    value: {
        color: '#333',
    },
    button: {
        backgroundColor: '#1976D2',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#E53935',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});