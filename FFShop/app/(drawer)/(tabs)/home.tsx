import { Product } from '@/constants/interfaces';
import { api_san_pham_getPagination, host } from '@/constants/vars';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '@/components/footer';


export default function HomeScreen() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('');

  const router = useRouter();
  const filteredProducts = products.filter((product: Product) =>
    product.ten_san_pham.toLowerCase().includes(search.toLowerCase())
  );

  const fetchProducts = async () => {
      try {
        const response = await fetch(api_san_pham_getPagination);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    }

    const handleproduct = (id : number) => {
      router.push({
      pathname: '/product-detail/[id]',
      params: { id: id.toString() },
  }); // phải là string
    }


  useEffect(() => {
    fetchProducts();
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchProducts(); // gọi API khi màn hình được focus
    }, [])
  )

  if (loading) return <ActivityIndicator size={"large"} color={"#27ae60"} />;
  if (error) return <Text>{error}</Text>;


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chào mừng đến với FFShop!</Text>
      <Text style={styles.subtitle}>Cửa hàng hoa giả trang trí đẹp nhất</Text>
      {/* Banner/Slider quảng cáo */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' }}
          style={styles.bannerImage}
        />
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' }}
          style={styles.bannerImage}
        />
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80' }}
          style={styles.bannerImage}
        />
      </ScrollView>
      {/* Combo quà tặng theo dịp */}
      <View style={styles.comboContainer}>
        <Text style={styles.comboTitle}>Combo quà tặng theo dịp</Text>
        <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
        >
          <View style={styles.comboCard}>
        <Image
          source={{ uri: 'https://placehold.co/80x80?text=Combo+1' }}
          style={styles.comboImage}
        />
        <Text style={styles.comboName}>Combo Sinh nhật</Text>
          </View>
          <View style={styles.comboCard}>
        <Image
          source={{ uri: 'https://placehold.co/80x80?text=Combo+2' }}
          style={styles.comboImage}
        />
        <Text style={styles.comboName}>Combo Kỷ niệm</Text>
          </View>
          <View style={styles.comboCard}>
        <Image
          source={{ uri: 'https://placehold.co/80x80?text=Combo+3' }}
          style={styles.comboImage}
        />
        <Text style={styles.comboName}>Combo Tốt nghiệp</Text>
          </View>
        </ScrollView>
      </View>
      {/* Thanh tìm kiếm */}
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Tìm kiếm sản phẩm..."
          style={{
            backgroundColor: '#f1f1f1',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#e0e0e0',
          }}
          // Bạn có thể thêm logic tìm kiếm ở đây nếu muốn
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={() => setSearch(search)}
        />
      </View>

      {/* Danh sách sản phẩm hoa giả */}
      <Text style={styles.title}>Danh sách sản phẩm nổi bật</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}></View>
      <View style={styles.flowerList}>
        {filteredProducts.map((product: Product) => (
          <View key={product.id} style={styles.card}>
            <Image source={{ uri: host + product.anh_san_pham || 'https://placehold.co/150x150?text=Hoa+giả' }} style={styles.image} />
            <Text style={styles.flowerName}>{product.ten_san_pham}</Text>
            <Text style={styles.price}>{product.gia_san_pham.toLocaleString('vi_VN')}đ</Text>
            {/* <Link 
            key={product.id}
            href={{
              pathname: '/product-detail/[id]',
              params: { id: product.id.toString() }
            }}
            asChild>
            </Link> */}
            
              <TouchableOpacity 
                style={styles.button}
                onPress={() => handleproduct(product.id)}
              >
                <Text style={styles.buttonText}>Mua ngay</Text>
              </TouchableOpacity>
          </View>
        ))}

      </View>
      {/* Footer */}
    <Footer />
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#4CAF50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  bannerImage: {
    width: 300,
    height: 120,
    borderRadius: 10,
    marginRight: 12,
  },
  comboContainer: {
    marginBottom: 24,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  comboTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 10,
    textAlign: 'left',
  },
  comboImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  comboCard: {
    backgroundColor: '#f1f8e9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 12,
    width: 110,
  },
  flowerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginBottom: 8,
  },
  flowerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#E91E63',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  comboName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});