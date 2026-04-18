import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store";
import { useState } from "react";
import { getTenants } from "../../http/api";
import TenantsFilter from "./TenantsFilter";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
const Tenants = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: tenants,
    isLoading,
    isError,
    error,
  } = useQuery({
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
    <>
      <Space orientation="vertical" style={{ width: "100%" }} size="large">
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            { title: <Link to="/">Dashboard</Link> },
            { title: "Tenants" },
          ]}
        />
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}
        <TenantsFilter
          onFilterChange={(filterName: string, filterValue: string) => {
            console.log(filterName, filterValue);
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            Create tenants
          </Button>
        </TenantsFilter>
        <Table columns={columns} dataSource={tenants || []} rowKey="id" />
        <Drawer
          title="Create tenants"
          size={720}
          open={drawerOpen}
          destroyOnHidden={true}
          onClose={() => {
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button>Cancel</Button>
              <Button type="primary">Submit</Button>
            </Space>
          }
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Space>
    </>
  );
};

export default Tenants;
