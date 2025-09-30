import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '@/components/footer';
import { ScrollView } from 'react-native-gesture-handler';

const About = () => {
    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>About FFShop</Text>
            <Text style={styles.description}>
                FFShop là một ứng dụng di động đa nền tảng dành cho mua sắm.
                Ứng dụng này được phát triển nhằm mang đến trải nghiệm mua sắm liền mạch cho người dùng.
            </Text>
            <Text style={[styles.description, { marginTop: 24, fontWeight: 'bold' }]}>
                Liên hệ: support@ffshop.com
            </Text>
            <Text style={styles.description}>
                Hotline: 0123 456 789
            </Text>
        </View>
        <Footer />
        </ScrollView>
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
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
});

export default About;
