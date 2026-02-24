import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Typography, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  CheckSquareOutlined,
  DashboardOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('userRole') || 'merchant';

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Overview',
    },
    {
      key: '/dashboard/hotel-entry',
      icon: <PlusCircleOutlined />,
      label: 'Register Hotel',
      disabled: userRole === 'admin',
    },
    {
      key: '/dashboard/my-hotels',
      icon: <ShopOutlined />,
      label: 'My Hotels',
      disabled: userRole === 'admin',
    },
    {
      key: '/dashboard/audit',
      icon: <CheckSquareOutlined />,
      label: 'Audit Center',
      disabled: userRole === 'merchant',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      {/* Sidebar Navigation */}
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" width={250}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#002140' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: collapsed ? '12px' : '18px' }}>
            {collapsed ? 'YS' : 'YI-SU ADMIN'}
          </Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ marginTop: 16 }}
        />
      </Sider>

      <Layout>
        {/* Top Header Bar */}
        <Header style={{ 
          padding: '0 24px 0 0', 
          background: colorBgContainer, 
          display: 'flex', 
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          zIndex: 1
        }}>
          {/* 1. Left: Collapse Toggle */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />

          {/* 2. THE SPACER: This pushes everything after it to the right */}
          <div style={{ flex: 1 }} />

          {/* 3. Right: User Role and Logout Button */}
          <Space size="large" style={{ paddingRight: '24px' }}>
            <Space>
              <UserOutlined style={{ color: '#1890ff' }} />
              <Text strong>{userRole.toUpperCase()} PANEL</Text>
            </Space>
            <Button 
              type="primary" 
              danger 
              ghost 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Space>
        </Header>

        {/* Content Area */}
        <Content
          style={{
            margin: '24px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;