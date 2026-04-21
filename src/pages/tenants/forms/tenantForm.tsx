import { Card, Col, Form, Input, Row, Space } from "antd";
import { useAuthStore } from "../../../store";
import { Navigate } from "react-router-dom";

const TenantForm = () => {
  const { user } = useAuthStore();
  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <Row>
      <Col span={24}>
        <Space orientation="vertical" size="large">
          <Card title="Basic Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Tenant Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Tenant Name is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter tenant name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tenant Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Tenant Address is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter tenant name" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default TenantForm;
