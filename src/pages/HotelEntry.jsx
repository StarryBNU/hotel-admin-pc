import React from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  DatePicker, 
  InputNumber, 
  Space, 
  Card, 
  Typography, 
  message 
} from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const HotelEntry = ({ onSave }) => { 
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSave(values); 
    message.success('Hotel information submitted to Admin for review!');
    form.resetFields(); 
  };
 

  return (
    <div style={{ padding: '20px' }}>
      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Title level={3} style={{ marginBottom: 30 }}>Register New Hotel</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ starRating: 5 }}
        >
          {/* Basic Info Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Form.Item 
              label="Hotel Name (Chinese)" 
              name="nameCn" 
              rules={[{ required: true, message: 'Please enter Chinese name' }]}
            >
              <Input placeholder="e.g. 易宿大酒店" />
            </Form.Item>

            <Form.Item 
              label="Hotel Name (English)" 
              name="nameEn" 
              rules={[{ required: true, message: 'Please enter English name' }]}
            >
              <Input placeholder="e.g. Yi-Su Grand Hotel" />
            </Form.Item>
          </div>

          <Form.Item 
            label="Detailed Address" 
            name="address" 
            rules={[{ required: true }]}
          >
            <Input placeholder="Full street address" />
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Form.Item label="Star Rating" name="starRating" rules={[{ required: true }]}>
              <Select>
                <Option value={3}>3 Stars</Option>
                <Option value={4}>4 Stars</Option>
                <Option value={5}>5 Stars</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Opening Date" name="openingDate" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Title level={4} style={{ marginTop: 20 }}>Room Types & Pricing</Title>
          <p style={{ color: '#8c8c8c', marginBottom: 20 }}>Add at least one room type and its nightly rate.</p>

          {/* Dynamic List for Room Types */}
          <Form.List name="roomTypes" initialValue={[{ type: '', price: 0 }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      rules={[{ required: true, message: 'Missing room type' }]}
                    >
                      <Input placeholder="Room Type (e.g. Deluxe Suite)" style={{ width: 250 }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <InputNumber
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        style={{ width: 150 }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <DeleteOutlined style={{ color: 'red' }} onClick={() => remove(name)} />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Room Type
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item style={{ marginTop: 40 }}>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
              Submit Hotel for Audit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HotelEntry;