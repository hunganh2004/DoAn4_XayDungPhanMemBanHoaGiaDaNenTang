import { View, Text} from 'react-native'

export default function Footer() {
    return(
        <View style={{ marginTop: 32, marginBottom: 16, alignItems: 'center' }}>
            <View style={{ borderTopWidth: 1, borderColor: '#e0e0e0', width: '100%', marginBottom: 12 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#388e3c', marginBottom: 4 }}>
                    FFShop - Hoa Giả Trang Trí
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 2 }}>
                Địa chỉ: thôn Đại Đồng, xã Đại Đồng, tỉnh Hưng Yên
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 2 }}>
                Điện thoại: 0865713676
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 2 }}>
                Email: hunganh2004hy@Gmail.com
            </Text>
            <Text style={{ fontSize: 13, color: '#aaa', marginTop: 8 }}>
                © 2025 FFShop. Bản quyền thuộc về FFShop.
            </Text>
        </View>
    )
}