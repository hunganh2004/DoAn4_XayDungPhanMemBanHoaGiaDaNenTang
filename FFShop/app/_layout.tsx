// app/_layout.tsx
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Stack>
            {/* Màn hình đăng nhập */}
            <Stack.Screen name="login" options={{ title: "Đăng nhập", headerTitleAlign: "center" }} />
            {/* Màn chi tiết sản phẩm */}
            <Stack.Screen name="product-detail/[id]" options={{ title: "Chi tiết sản phẩm" }} />
            {/* Màn danh sách sản phẩm */}
            <Stack.Screen name="product-list/[id]" options={{title: 'Danh sách sản phẩm'}} />
            {/* Drawer là màn chính */}
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            {/* Màn thanh toán */}
            <Stack.Screen name="checkout" options={{ title: "Thanh toán" }} />
            {/* Màn thành công */}
            <Stack.Screen name="success" options={{ title: "Thành công" }} />
            {/* Màn không tìm thấy */}
            <Stack.Screen name="+not-found" options={{ title: "Không tìm thấy" }} />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </UserProvider>
  );
}