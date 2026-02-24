import React from 'react';
import { Row, Col, Card, Statistic, Typography, Tag } from 'antd';
import { 
  ShopOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  InfoCircleOutlined,
  GlobalOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

const DashboardHome = ({ hotels }) => {
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin';

  // Calculate statistics based on role
  const pending = hotels.filter(h => h.status === 'pending').length;
  const approved = hotels.filter(h => h.status === 'approved').length;
  const total = hotels.length;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            {isAdmin ? 'Platform Overview' : 'Merchant Workspace'}
          </Title>
          <Text type="secondary">
            {isAdmin ? 'Global system statistics and audit monitoring' : 'Manage your hotel listings and track approval status'}
          </Text>
        </div>
        <Tag color={isAdmin ? 'pro' : 'blue'} style={{ padding: '4px 12px' }}>
          {isAdmin ? <GlobalOutlined /> : <ShopOutlined />} {userRole.toUpperCase()} MODE
        </Tag>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false} style={{ borderTop: '4px solid #1890ff' }}>
            <Statistic 
              title={isAdmin ? "Total Platform Hotels" : "My Total Listings"} 
              value={total} 
              prefix={<ShopOutlined />} 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ borderTop: '4px solid #faad14' }}>
            <Statistic 
              title={isAdmin ? "Total Pending Audit" : "Awaiting Review"} 
              value={pending} 
              prefix={<ClockCircleOutlined />} 
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ borderTop: '4px solid #52c41a' }}>
            <Statistic 
              title={isAdmin ? "Total Live Hotels" : "Published Hotels"} 
              value={approved} 
              prefix={<CheckCircleOutlined />} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Required Actions" style={{ marginTop: '24px' }}>
        {isAdmin ? (
          <p><InfoCircleOutlined /> You have <strong>{pending}</strong> hotels waiting for your review. Please visit the Audit Center.</p>
        ) : (
          <p><InfoCircleOutlined /> Your published hotels are now visible to users. If a hotel is rejected, please check the Audit notes.</p>
        )}
      </Card>
    </div>
  );
};

export default DashboardHome;