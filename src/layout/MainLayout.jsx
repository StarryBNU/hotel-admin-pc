import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Typography, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  CheckSquareOutlined,
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
      key: '/dashboard/hotel-entry',
      icon: <ShopOutlined />,
      label: 'Hotel Management',
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
      {/* Sidebar - Fixed height and auto-width */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="dark"
        width={250}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#002140',
        }}>
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

      {/* Main Container - This must have flex: 1 to fill the remaining width */}
      <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header style={{ 
          padding: '0 24px 0 0', 
          background: colorBgContainer, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          zIndex: 1
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Space size="large">
            <Space>
              <UserOutlined style={{ color: '#1890ff' }} />
              <Text strong>{userRole.toUpperCase()} MODE</Text>
            </Space>
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Space>
        </Header>

        <Content
          style={{
            margin: '24px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1, 
            overflow: 'initial'
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;