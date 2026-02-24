import React from 'react';
import { Form, Input, Button, Radio, Typography, Row, Col, Space, Divider } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  ShopOutlined, 
  SafetyOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  CloudServerOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    localStorage.setItem('userRole', values.role);
    navigate('/dashboard');
  };

  return (
    <Row style={{ minHeight: '100vh', width: '100vw', margin: 0, overflow: 'hidden' }}>
      
      {/* LEFT SIDE: Centered Branding Section */}
      <Col xs={0} md={12} lg={14} style={{ 
        background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',     
        padding: '0 40px',
        textAlign: 'center'       
      }}>
        <div style={{ color: '#fff', maxWidth: '600px' }}>
          <GlobalOutlined style={{ fontSize: '80px', color: '#1890ff', marginBottom: '24px' }} />
          
          <Title level={1} style={{ color: '#fff', fontSize: '3.5rem', marginBottom: '16px' }}>
            Yi-Su Platform
          </Title>
          
          <Title level={4} style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '300', marginBottom: '40px' }}>
            Professional Hotel Information Management System
          </Title>
          
          <Divider style={{ borderColor: 'rgba(255,255,255,0.15)', width: '80%', margin: '0 auto 40px' }} />
          
          {/* Centered Feature List block */}
          <div style={{ display: 'inline-block', textAlign: 'left' }}>
            <Space direction="vertical" size="large">
              <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '12px' }} />
                Real-time Information Sync
              </div>
              <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
                <CloudServerOutlined style={{ color: '#1890ff', marginRight: '12px' }} />
                Merchant & Admin Roles
              </div>
              <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
                <SafetyOutlined style={{ color: '#faad14', marginRight: '12px' }} />
                Secure Auditing Workflow
              </div>
            </Space>
          </div>
        </div>
      </Col>

      {/* RIGHT SIDE: Login Form */}
      <Col xs={24} md={12} lg={10} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#fff',
        padding: '40px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={2} style={{ marginBottom: '8px' }}>Welcome Back</Title>
            <Text type="secondary">Sign in to manage your hotel listings</Text>
          </div>
          
          <Form 
            layout="vertical" 
            size="large"
            onFinish={onFinish}
            initialValues={{ role: 'merchant' }}
          >
            <Form.Item name="username" rules={[{ required: true, message: 'Please enter username' }]}>
              <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Username" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please enter password' }]}>
              <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="Password" />
            </Form.Item>

            <Form.Item label={<Text strong>Login Role</Text>} name="role">
              <Radio.Group optionType="button" buttonStyle="solid" style={{ width: '100%' }}>
                <Radio.Button value="merchant" style={{ width: '50%', textAlign: 'center' }}>
                  <ShopOutlined /> Merchant
                </Radio.Button>
                <Radio.Button value="admin" style={{ width: '50%', textAlign: 'center' }}>
                  <SafetyOutlined /> Admin
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Button type="primary" htmlType="submit" block size="large" style={{ height: '50px', marginTop: '10px', borderRadius: '8px' }}>
              Sign In
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;