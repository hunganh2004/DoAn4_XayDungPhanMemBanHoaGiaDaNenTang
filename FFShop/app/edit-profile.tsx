import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useUser } from '@/context/UserContext'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { api_update_nguoi_dung_by_id } from '@/constants/vars'
import { User } from '@/constants/interfaces'

const EditProfileScreen = () => {
    const { user, setUser } = useUser()
    const router = useRouter()
    const { redirectTo } = useLocalSearchParams<{ redirectTo?: string }>()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')


    useEffect(() => {
        if (user) {
        setName(user.ten_nguoi_dung || '')
        setEmail(user.email_nguoi_dung || '')
        setPhone(user.sdt_nguoi_dung || '')
        setAddress(user.dia_chi_nguoi_dung || '')
        setImageUrl(user.anh_nguoi_dung || '')
        }
    }, [user])

    const handleSave = async () => {
        try {
            const userUpdate: User = {
                id: Number(user?.id),
                ten_nguoi_dung: name,
                email_nguoi_dung: email,
                vai_tro: user?.vai_tro || '',
                sdt_nguoi_dung: phone,
                dia_chi_nguoi_dung: address,
                anh_nguoi_dung: imageUrl,
                token: user?.token || '',
                create_at: user?.create_at || '',
                update_at: Date.now().toString(),
                }
            console.log(userUpdate)

            await fetch(api_update_nguoi_dung_by_id(Number(user?.id)), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user?.id,
                    anh_nguoi_dung: user?.anh_nguoi_dung,
                    ten_nguoi_dung: name,
                    email_nguoi_dung: email,
                    sdt_nguoi_dung: phone,
                    dia_chi_nguoi_dung: address,
                    create_at: user?.create_at,
                    update_at: Date.now()
                }   ),
            })

            setUser(userUpdate)
            Alert.alert('Thành công', 'Thông tin đã được cập nhật')
            router.replace(redirectTo as never || '/profile')
        } catch (err) {
            console.error('Lỗi cập nhật:', err)
            Alert.alert('Lỗi', 'Không thể cập nhật thông tin')
        }
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>

        <TextInput style={styles.input} placeholder="Tên" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} />
        <TextInput style={styles.input} placeholder="Địa chỉ" value={address} onChangeText={setAddress} />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#1976D2',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1976D2',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})