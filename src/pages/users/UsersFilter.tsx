import { Button, Card, Col, Input, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type UsersFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children: React.ReactNode;
};
const UsersFilter = ({ onFilterChange, children }: UsersFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col>
              <Input.Search
                allowClear={true}
                placeholder="Search users..."
                onChange={(e) => onFilterChange("searchFilter", e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Select
                allowClear={true}
                onChange={(value) => onFilterChange("roleFilter", value || "")}
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
            </Col>
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
