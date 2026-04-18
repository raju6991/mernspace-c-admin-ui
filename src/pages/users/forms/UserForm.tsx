import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import type { Tenants } from "../../../types";

const UserForm = () => {
  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const res = await getTenants();
      const data = res.data;
      if (Array.isArray(data)) {
        return data;
      }
      return data?.tenants ?? [];
    },
  });
  return (
    <Row>
      <Col span={24}>
        <Space orientation="vertical" size="large">
          <Card title="Basic Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email Address" name="email">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Security Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Password" name="password">
                  <Input.Password size="large" type="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Roles">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Roles" name="role">
                  <Select
                    size="large"
                    allowClear={true}
                    onChange={() => {}}
                    placeholder="Select role"
                    style={{ width: "100%" }}
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "manager", label: "Manager" },
                      { value: "customer", label: "Customer" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId">
                  {tenants?.map((tenants: Tenants) => (
                    <Select
                      size="large"
                      allowClear={true}
                      onChange={() => {}}
                      placeholder="Select restaurant"
                      style={{ width: "100%" }}
                      options={[{ value: tenants.id, label: tenants.name }]}
                    />
                  ))}
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
