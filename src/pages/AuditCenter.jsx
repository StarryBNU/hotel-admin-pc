import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal, Input, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, StopOutlined, ReloadOutlined } from '@ant-design/icons';

const AuditCenter = ({ hotels, setHotels }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const updateStatus = (id, newStatus, reason = '') => {
    const updated = hotels.map(h => 
      h.id === id ? { ...h, status: newStatus, reason: reason } : h
    );
    setHotels(updated);
    message.success(`Status updated to ${newStatus}`);
    setIsModalOpen(false);
    setRejectReason('');
  };

  const columns = [
    { title: 'Hotel Name (CN)', dataIndex: 'nameCn', key: 'nameCn' },
    { title: 'English Name', dataIndex: 'nameEn', key: 'nameEn' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      render: (status) => {
        let color = status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'gold';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      } 
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      render: (text) => text || '-'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button type="link" icon={<CheckCircleOutlined />} onClick={() => updateStatus(record.id, 'approved')}>Approve</Button>
              <Button type="link" danger icon={<CloseCircleOutlined />} onClick={() => {
                setCurrentHotelId(record.id);
                setIsModalOpen(true);
              }}>Reject</Button>
            </>
          )}
          {record.status === 'approved' && (
            <Button danger icon={<StopOutlined />} onClick={() => updateStatus(record.id, 'offline')}>Take Offline</Button>
          )}
          {record.status === 'offline' && (
            <Button icon={<ReloadOutlined />} onClick={() => updateStatus(record.id, 'approved')}>Restore</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
      <h2>Hotel Audit Center</h2>
      <Table columns={columns} dataSource={hotels} rowKey="id" />

      <Modal 
        title="Rejection Reason" 
        open={isModalOpen} 
        onOk={() => updateStatus(currentHotelId, 'rejected', rejectReason)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input.TextArea 
          rows={4} 
          placeholder="Please explain why this hotel listing was rejected..." 
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AuditCenter;