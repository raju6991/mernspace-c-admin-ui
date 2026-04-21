import { Breadcrumb, Button, Drawer, Form, Space, Table } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createTenant, getTenants } from "../../http/api";
import TenantsFilter from "./TenantsFilter";
import TenantForm from "./forms/tenantForm";
import { useAuthStore } from "../../store";
import type { CreateTenantData } from "../../types";
import create from "@ant-design/icons/lib/components/IconFont";
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
  const [form] = Form.useForm();
  const queryClient = new QueryClient();
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
  const { mutate: tenantMutate } = useMutation({
    mutationKey: ["tenant"],
    mutationFn: async (data: CreateTenantData) =>
      createTenant(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
  });
  const onHandleSubmit = async () => {
    await form.validateFields();
    await tenantMutate(form.getFieldsValue() as CreateTenantData);
    form.resetFields();
    setDrawerOpen(false);
  };
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
            form.resetFields();
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form}>
            <TenantForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Tenants;
