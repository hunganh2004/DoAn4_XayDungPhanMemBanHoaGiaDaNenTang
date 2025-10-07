// SetTheme.tsx
import React, { useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import viVN from 'antd/locale/vi_VN';
import App from '../App'

const SetTheme: React.FC = () => {
    const [isDark, setIsDark] = useState(true);

    const toggleThemeHandle = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        localStorage.setItem('themeMode', newTheme ? 'dark' : 'light')
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('themeMode')
        if (savedTheme === 'dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
    }, []) 

    return (
        <ConfigProvider
        locale={viVN}
        theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
                colorBgContainer: isDark? '#1f1f1f': '#fff',
                colorText: isDark? '#fff' : '#1f1f1f',
                colorPrimary: isDark? '#ff3366':'#6262e1',
                colorBorder: isDark? '#434343' : '#d9d9d9',
                colorSuccess: isDark? '#73d13d': '#52c41a',
                colorError: isDark? '#ff7875' : '#ff4d4f',
                borderRadiusLG: 12,
                fontSize: 16,
                fontFamily: 'Roboto',
                controlHeight: 48,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }
        }}
        >
        <App isDark={isDark} toggleTheme={() => toggleThemeHandle()} />
        </ConfigProvider>
    );
};

export default SetTheme;

/*
### 🎨 Các giá trị phổ biến trong `token`

| Tên token             | Ý nghĩa                                 | Ví dụ giá trị        |
|-----------------------|------------------------------------------|-----------------------|
| `colorPrimary`        | Màu chủ đạo (nút, link, v.v.)            | `#1677ff`             |
| `colorBgContainer`    | Màu nền của layout, card, header         | `#ffffff`, `#1f1f1f`  |
| `colorText`           | Màu chữ chính                            | `#000000`, `#ffffff`  |
| `colorBorder`         | Màu viền                                 | `#d9d9d9`             |
| `borderRadiusLG`      | Bo góc lớn                               | `8`, `12`             |
| `fontSize`            | Cỡ chữ mặc định                          | `14`, `16`            |
| `colorSuccess`, `colorError`, `colorWarning`, `colorInfo` | Màu trạng thái | `#52c41a`, `#ff4d4f` |
 */


