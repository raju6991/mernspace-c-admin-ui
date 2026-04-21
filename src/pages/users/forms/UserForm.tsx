import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import type { Tenants } from "../../../types";
import { useAuthStore } from "../../../store";
import { Navigate } from "react-router-dom";

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
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "First Name is required",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Last Name is required",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Email Address is required",
                      type: "email",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Security Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required",
                    },
                  ]}
                >
                  <Input.Password size="large" type="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Roles">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Roles"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Role is required",
                    },
                  ]}
                >
                  <Select
                    key={tenants.id}
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
                <Form.Item
                  label="Restaurant"
                  name="tenantId"
                  rules={[
                    {
                      required: true,
                      message: "Restaurant is required",
                    },
                  ]}
                >
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
