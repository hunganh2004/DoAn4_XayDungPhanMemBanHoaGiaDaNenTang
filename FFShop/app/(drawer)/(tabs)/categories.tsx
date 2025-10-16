import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { host, api_loai_san_pham_getAll } from '@/constants/vars';
import { Category } from '@/constants/interfaces';
import Footer from '@/components/footer';
import { ScrollView } from 'react-native-gesture-handler';


const CategoriesScreen = () => {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('')


    const fetchCategories = async () => {
            try {
            const response = await fetch(api_loai_san_pham_getAll);
            const data = await response.json();
            setCategories(data);
            } catch {
                setError('Không thể tải dữ liệu');
            } finally {
                setLoading(false);
            }
        }

    useEffect(() => {
        fetchCategories();
    }, [])

    
    useFocusEffect(
        useCallback(() => {
            fetchCategories(); // gọi API khi màn hình được focus
        }, [])
    )


    if (loading) return <ActivityIndicator size={"large"} color={"#27ae60"} />;
    if (error) return <Text>{error}</Text>;

    const renderItem = ({ item }: { item: Category }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedId === item.id && styles.selectedCategory,
            ]}
            onPress={() => {
                setSelectedId(item.id);
                router.push({
                    pathname: '/product-list/[id]',
                    params: {id: Number(selectedId), categoryName: item.ten_loai_san_pham}
                });
            }}
            activeOpacity={item.id === 0 ? 0 : 0.8} 
        >
            <Image source={{ uri: host + item.anh_loai_san_pham }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{item.ten_loai_san_pham}</Text>
            {/* <Text style={styles.categoryCount}>{item.count} sản phẩm</Text> */} 
        </TouchableOpacity>
    );

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
        >
        <View style={styles.container}>
            <Text style={styles.title}>Danh mục sản phẩm</Text>
            <FlatList
                data={categories} 
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 16 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        <Footer />
        </ScrollView>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#222',
        alignSelf: 'center',
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    categoryItem: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 4,
        borderWidth: 2,
        borderColor: 'transparent',
        elevation: 2,
    },
    selectedCategory: {
        borderColor: '#4CAF50',
    },
    categoryImage: {
        width: 120,
        height: 80,
        borderRadius: 5,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        textAlign: 'center',
    },
    categoryCount: {
        fontSize: 13,
        color: '#888',
    },
});