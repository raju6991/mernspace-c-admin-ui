import { Card, Col, Input, Row, Select } from "antd";

type UsersFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children: React.ReactNode;
};
const TenantsFilter = ({ onFilterChange, children }: UsersFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col>
              <Input.Search
                allowClear={true}
                placeholder="Search restaurants..."
                onChange={(e) => onFilterChange("searchFilter", e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Select
                allowClear={true}
                onChange={(value) => onFilterChange("roleFilter", value || "")}
                placeholder="Category"
                style={{ width: "100%" }}
                options={[
                  { value: "margherita", label: "Margherita" },
                  { value: "pepperoni", label: "Pepperoni" },
                  { value: "veggie", label: "Veggie" },
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

export default TenantsFilter;
