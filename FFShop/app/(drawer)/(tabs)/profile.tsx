import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { host } from '@/constants/vars';

const ProfileScreen = () => {
    const router = useRouter();
    const { user, logout} = useUser()

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
                source={{ uri: host +  user?.anh_nguoi_dung  }}
                style={styles.avatar}
            />
            <Text style={styles.name}>{user?.ten_nguoi_dung}</Text>
            <Text style={styles.email}>{user?.email_nguoi_dung}</Text>

            <View style={styles.infoSection}>
                <Text style={styles.label}>Số điện thoại:</Text>
                <Text style={styles.value}>{user?.sdt_nguoi_dung}</Text>
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.label}>Địa chỉ:</Text>
                <Text style={styles.value}>{user?.dia_chi_nguoi_dung}</Text>
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.label}>Vai trò:</Text>
                <Text style={styles.value}>{user?.vai_tro}</Text>
            </View>

            <TouchableOpacity style={styles.button}
            onPress={() => {
                        // Xử lý chỉnh sửa hồ sơ
                        router.push('/edit-profile' as never);
                    }}>
                <Text style={styles.buttonText}
                    
                >Chỉnh sửa hồ sơ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#388E3C'}]}
            onPress={() => {
                        // Xử lý xem đơn hàng đã đặt
                        router.push('/order-history' as never);
                    }}>
                <Text style={styles.buttonText}
                    
                >Xem đơn hàng đã đặt</Text>
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