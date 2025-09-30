import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@/constants/interfaces';
import { useRouter } from 'expo-router';


type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter()

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user')
            if (storedUser) {
                setUser(JSON.parse(storedUser))
            }
        }
        loadUser()
    }, [])

    const logout = async () => {
        await AsyncStorage.removeItem('user')
        setUser(null)
        router.push('/login')
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}