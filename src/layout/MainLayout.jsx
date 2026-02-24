import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Typography, Space, Switch, Divider } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  CheckSquareOutlined,
  DashboardOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

// 1. DEFINE TRANSLATIONS (This fixes the ReferenceError)
const translations = {
  en: {
    title: 'YI-SU ADMIN',
    overview: 'Overview',
    register: 'Register Hotel',
    myHotels: 'My Hotels',
    audit: 'Audit Center',
    merchantPanel: 'MERCHANT PANEL',
    adminPanel: 'ADMIN PANEL',
    logout: 'Logout',
  },
  zh: {
    title: '一宿管理',
    overview: '概览',
    register: '注册酒店',
    myHotels: '我的酒店',
    audit: '审核中心',
    merchantPanel: '商户面板',
    adminPanel: '管理面板',
    logout: '退出登录',
  }
};

const MainLayout = ({ lang = 'en', setLang = () => {} }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('userRole') || 'merchant';
  
  const t = translations[lang] || translations['en'];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: t.overview },
    { key: '/dashboard/hotel-entry', icon: <PlusCircleOutlined />, label: t.register, disabled: userRole === 'admin' },
    { key: '/dashboard/my-hotels', icon: <ShopOutlined />, label: t.myHotels, disabled: userRole === 'admin' },
    { key: '/dashboard/audit', icon: <CheckSquareOutlined />, label: t.audit, disabled: userRole === 'merchant' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          {collapsed ? 'YS' : t.title}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div style={{ flex: 1 }} />
          <Space size="large">
            {/* Fix: Space direction is deprecated in some versions, 
                Ant Design uses 'direction="vertical/horizontal"'. 
                The warning suggests checking your specific antd version. */}
            <Space>
              <GlobalOutlined />
              <Switch 
                checkedChildren="中" 
                unCheckedChildren="EN" 
                checked={lang === 'zh'}
                onChange={(checked) => setLang(checked ? 'zh' : 'en')}
              />
            </Space>
            <Divider type="vertical" />
            <Text strong>{userRole === 'admin' ? t.adminPanel : t.merchantPanel}</Text>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>{t.logout}</Button>
          </Space>
        </Header>
        <Content style={{ margin: '24px', padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Outlet context={{ lang }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;