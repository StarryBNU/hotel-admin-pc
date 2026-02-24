import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Space, Divider, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  ShopOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  CloudServerOutlined,
  SafetyOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Logic for registration
    console.log('Success:', values);
    message.success('Registration successful! Please sign in.');
    navigate('/login');
  };

  return (
    <Row style={{ minHeight: '100vh', width: '100vw', margin: 0, overflow: 'hidden' }}>
      
      {/* LEFT SIDE: Branding Section (Matched to Login) */}
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
            Join our professional network of merchant partners
          </Title>
          
          <Divider style={{ borderColor: 'rgba(255,255,255,0.15)', width: '80%', margin: '0 auto 40px' }} />
          
          <div style={{ display: 'inline-block', textAlign: 'left' }}>
            <Space direction="vertical" size="large">
              <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '12px' }} />
                Instant Account Activation
              </div>
              <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
                <CloudServerOutlined style={{ color: '#1890ff', marginRight: '12px' }} />
                Secure Hotel Data Storage
              </div>
              <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
                <SafetyOutlined style={{ color: '#faad14', marginRight: '12px' }} />
                Direct Communication with Admins
              </div>
            </Space>
          </div>
        </div>
      </Col>

      {/* RIGHT SIDE: Register Form */}
      <Col xs={24} md={12} lg={10} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#fff',
        padding: '40px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={2} style={{ marginBottom: '8px' }}>Merchant Registration</Title>
            <Text type="secondary">Create an account to start listing hotels</Text>
          </div>
          
          <Form 
            layout="vertical" 
            size="large"
            onFinish={onFinish}
          >
            <Form.Item 
              name="username" 
              rules={[{ required: true, message: 'Please create a username' }]}
            >
              <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Username" />
            </Form.Item>

            <Form.Item 
              name="email" 
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Enter a valid email' }
              ]}
            >
              <Input prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} placeholder="Email Address" />
            </Form.Item>

            <Form.Item 
              name="hotelName" 
              rules={[{ required: true, message: 'Please enter your hotel name' }]}
            >
              <Input prefix={<ShopOutlined style={{ color: '#bfbfbf' }} />} placeholder="Hotel/Company Name" />
            </Form.Item>

            <Form.Item 
              name="password" 
              rules={[{ required: true, message: 'Please create a password' }]}
            >
              <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="Password" />
            </Form.Item>

            <Form.Item 
              name="confirm" 
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="Confirm Password" />
            </Form.Item>

            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large" 
              style={{ height: '50px', marginTop: '10px', borderRadius: '8px' }}
            >
              Register Now
            </Button>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Button 
                type="link" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/login')}
                style={{ color: '#595959' }}
              >
                Already have an account? Sign In
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;