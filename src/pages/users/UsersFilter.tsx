import { Card, Col, Input, Row, Select } from "antd";
import debounce from "lodash/debounce";

type UsersFilterProps = {
  children: React.ReactNode;
  onSearch: (value: string) => void;
  onRoleChange: (role: string) => void;
};
const UsersFilter = ({
  children,
  onSearch,
  onRoleChange,
}: UsersFilterProps) => {
  const debouncedSearch = debounce(onSearch, 1000);

  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col>
              <Input.Search
                allowClear={true}
                placeholder="Search users..."
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Select
                allowClear={true}
                placeholder="Select role"
                style={{ width: "100%" }}
                onChange={(value) => onRoleChange(value || "")}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "manager", label: "Manager" },
                  { value: "customer", label: "Customer" },
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
