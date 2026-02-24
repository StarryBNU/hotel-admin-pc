import React from 'react';
import { Table, Tag, Card, Typography, Space, Empty } from 'antd'; // Added Space and Empty here

const { Title, Text } = Typography;

const MyHotels = ({ hotels }) => {
  const columns = [
    {
      title: 'Hotel Name',
      key: 'name',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.nameCn || 'Unnamed Hotel'}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.nameEn || 'No English Name'}</Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'gold';
        if (status === 'approved') color = 'green';
        if (status === 'rejected') color = 'red';
        if (status === 'offline') color = 'default';
        return <Tag color={color}>{(status || 'pending').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Admin Feedback',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => reason ? <Text type="danger">{reason}</Text> : <Text type="secondary">No feedback yet</Text>,
    },
  ];

  return (
    <div style={{ padding: '2px' }}>
      <Card bordered={false} title="My Submission Tracking">
        <Table 
          dataSource={hotels} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: <Empty description="You haven't submitted any hotels yet." /> }}
        />
      </Card>
    </div>
  );
};

export default MyHotels;