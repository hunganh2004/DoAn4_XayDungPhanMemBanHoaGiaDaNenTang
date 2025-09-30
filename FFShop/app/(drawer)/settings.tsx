import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../../context/UserContext';

const SettingsScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
    const router = useRouter();
    const { logout } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cài đặt</Text>

            <View style={styles.settingRow}>
                <Text style={styles.label}>Chế độ tối</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={setIsDarkMode}
                />
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.label}>Nhận thông báo</Text>
                <Switch
                    value={isNotificationEnabled}
                    onValueChange={setIsNotificationEnabled}
                />
            </View>

            <TouchableOpacity style={styles.button}
            onPress={() => {
                logout()}}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#333'
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    label: {
        fontSize: 18,
        color: '#444'
    },
    button: {
        marginTop: 40,
        backgroundColor: '#e53935',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});