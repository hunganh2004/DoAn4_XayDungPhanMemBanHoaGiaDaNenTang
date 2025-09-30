// app/(drawer)/_layout.tsx
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" options={{ title: "FFShop" }} />
      <Drawer.Screen name="about" options={{ title: "Giới thiệu shop" }} />
      <Drawer.Screen name="settings" options={{ title: "Cài đặt" }} />
    </Drawer>
  );
}