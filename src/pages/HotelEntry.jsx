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
  message,
  Tooltip,
  Divider,
  Row, 
  Col
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  SaveOutlined, 
  QuestionCircleOutlined,
  ShopOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const HotelEntry = ({ onSave }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      openingDate: values.openingDate ? values.openingDate.format('YYYY-MM-DD') : '',
    };
    onSave(formattedValues);
    message.success('Hotel information submitted successfully!');
    form.resetFields();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderRadius: '12px' }}>
        <div style={{ marginBottom: 30 }}>
          <Title level={2}><ShopOutlined /> Register New Hotel</Title>
          <Text type="secondary">Enter property details for administrator review.</Text>
        </div>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ starRating: 5, roomTypes: [{ type: '', price: 100 }] }}
        >
          <Divider orientation="left">Basic Information</Divider>
          
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item 
                label="Hotel Name (Chinese)" 
                name="nameCn" 
                rules={[{ required: true, message: 'Please enter Chinese name' }]}
              >
                <Input placeholder="e.g. 易宿大酒店" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label="Hotel Name (English)" 
                name="nameEn" 
                rules={[{ required: true, message: 'Please enter English name' }]}
              >
                <Input placeholder="e.g. Yi-Su Grand Hotel" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item 
            label="Detailed Address" 
            name="address" 
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <Input.TextArea placeholder="Full street address" rows={2} />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Star Rating" name="starRating" rules={[{ required: true }]}>
                <Select size="large">
                  <Option value={3}>3 Stars</Option>
                  <Option value={4}>4 Stars</Option>
                  <Option value={5}>5 Stars</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Opening Date" name="openingDate" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" style={{ marginTop: 40 }}>Room Types & Pricing</Divider>
          
          <Form.List name="roomTypes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 16 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      rules={[{ required: true, message: 'Missing room type' }]}
                    >
                      <Input placeholder="Room Type" style={{ width: 250 }} size="large" />
                    </Form.Item>
                    
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      rules={[{ required: true }, { type: 'number', min: 1 }]}
                    >
                      <InputNumber
                        placeholder="Price"
                        size="large"
                        style={{ width: 150 }}
                        formatter={value => `$ ${value}`}
                      />
                    </Form.Item>

                    {fields.length > 1 && (
                      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)} />
                    )}
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} size="large">
                  Add Room Type
                </Button>
              </>
            )}
          </Form.List>

          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />} 
            size="large" 
            block
            style={{ height: '50px', marginTop: 40 }}
          >
            Submit for Audit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default HotelEntry;