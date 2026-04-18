import { Button, Card, Col, Input, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const UsersFilter = () => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col>
              <Input.Search placeholder="Search users..." />
            </Col>
            <Col span={8}>
              <Select
                allowClear={true}
                placeholder="Select role"
                style={{ width: "100%" }}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "manager", label: "Manager" },
                  { value: "customer", label: "Customer" },
                ]}
              />
            </Col>
            <Col span={8}>
              <Select
                allowClear={true}
                placeholder="Select status"
                style={{ width: "100%" }}
                options={[
                  { value: "banned", label: "Ban" },
                  { value: "active", label: "Active" },
                ]}
              />
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          <Button type="primary" icon={<PlusOutlined />}>
            Create users
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
