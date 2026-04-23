import { Card, Col, Form, Input, Row, Select } from "antd";

type UsersFilterProps = {
  children: React.ReactNode;
};
const UsersFilter = ({ children }: UsersFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col>
              <Form.Item name="q">
                <Input.Search allowClear={true} placeholder="Search users..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="role">
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
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Select
                onChange={(value) =>
                  onFilterChange("statusFilter", value || "")
                }
                allowClear={true}
                placeholder="Select status"
                style={{ width: "100%" }}
                options={[
                  { value: "banned", label: "Ban" },
                  { value: "active", label: "Active" },
                ]}
              />
            </Col> */}
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
