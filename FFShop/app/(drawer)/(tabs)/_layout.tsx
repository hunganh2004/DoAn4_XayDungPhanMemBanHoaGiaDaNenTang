// app/(drawer)/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#8e44ad' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, focused }) => <Ionicons 
          name={focused ? "home" : "home-outline"} 
          color={color} 
          size={24} />,
        }}
      />
      <Tabs.Screen 
        name="categories"
        options={{
          title: "Danh mục",
          tabBarIcon: ({ color, focused }) => <Ionicons 
          name={focused ? "list" : "list-outline"} 
          color={color} 
          size={24} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Giỏ hàng",
          tabBarIcon: ({ color, focused }) => <Ionicons 
          name={focused ? "cart" : "cart-outline"} 
          color={color} 
          size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color, focused }) => <Ionicons 
          name={focused ? "person" : "person-outline"} 
          color={color} 
          size={24} />,
        }}
      />
    </Tabs>
  );
}