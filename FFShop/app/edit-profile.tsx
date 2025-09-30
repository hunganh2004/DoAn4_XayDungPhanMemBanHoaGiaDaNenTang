import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'expo-router'
import { host } from '@/constants/vars'

const EditProfileScreen = () => {
    const { user, setUser } = useUser()
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
        if (user) {
        setName(user.ten_nguoi_dung || '')
        setEmail(user.email_nguoi_dung || '')
        setPhone(user.sdt_nguoi_dung || '')
        setAddress(user.dia_chi_nguoi_dung || '')
        }
    }, [user])

    const handleSave = async () => {
        // try {
        // const response = await fetch(`${host}/nguoidung/update/${user.id_nguoi_dung}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //     ten_nguoi_dung: name,
        //     email_nguoi_dung: email,
        //     sdt_nguoi_dung: phone,
        //     dia_chi_nguoi_dung: address,
        //     }),
        // })

        // const updatedUser = await response.json()
        // setUser(updatedUser)
        // Alert.alert('Thành công', 'Thông tin đã được cập nhật')
        // router.replace('/profile')
        // } catch (err) {
        // console.error('Lỗi cập nhật:', err)
        // Alert.alert('Lỗi', 'Không thể cập nhật thông tin')
        // }
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