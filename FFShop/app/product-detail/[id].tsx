import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState,  } from "react";
import { Product, CartItem } from "@/constants/interfaces";
import { host, api_san_pham_get_by_id } from "@/constants/vars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "@/components/footer"



const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams() 
    const [product, setProduct] = useState<Product | null>(null)

    const fetchProduct = async (id: number) => {
            const response = await fetch(api_san_pham_get_by_id(id))
            const data = await response.json()
            setProduct(data[0])

            console.log("Chi tiết sản phẩm:", data)
        }
    
    const addToCart = async(product: Product) => {
      try {
        const cartJson = await AsyncStorage.getItem('cart')
        const cart = cartJson ? JSON.parse(cartJson) : []

        const index = cart.findIndex((item: CartItem) => item.id === product.id)
        
        let updateCart: CartItem[]

        if (index === -1) {
          const cartItem: CartItem = {
            ...product,
            so_luong_mua: 1
          }
          updateCart = [...cart, cartItem]
        } else {
          cart[index].so_luong_mua += 1
          updateCart = [...cart]
        }

        await AsyncStorage.setItem('cart', JSON.stringify(updateCart))
        console.log('Đã thêm vào giỏ hàng')
      } catch( err) {
        console.error('Lỗi khi thêm vào giỏ hàng: ', err)
      }
    }

    useEffect(() => {
        if (!id) return;

        const productId = Number(id);
        if (isNaN(productId)) {
            console.warn('ID không hợp lệ:', id);
            return;
        }

        fetchProduct(productId);
    }, [id]);


    // useFocusEffect(
    //     useCallback(() => {
    //         fetchProduct(Number(id) || 1)
    //     }, [id])
    // )

    if (!product) {
    return (
        <View style={styles.container}>
        <Text>Đang tải sản phẩm...</Text>
        </View>
    );
}


    return(
    <View style={{flex: 1}}>
    <ScrollView style={styles.container}>
        <Image
            source={{
                uri: product?.anh_san_pham
                ? host + product.anh_san_pham
                : 'https://placehold.co/300x200?text=Hoa+giả',
            }}
            style={styles.image}
            resizeMode="cover"
        />

        <Text style={styles.name}>{product?.ten_san_pham}</Text>
        <Text style={styles.price}>{product?.gia_san_pham} VNĐ</Text>
        <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
        <Text style={styles.description}>
            {product?.mo_ta_san_pham}
        </Text>
        <TouchableOpacity style={styles.buyButton}
          onPress={() => addToCart(product)}>
            <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>

        <Footer />
    </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    color: '#d32f2f',
    fontWeight: '600',
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
