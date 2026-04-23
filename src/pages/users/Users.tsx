import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUsers } from "../../http/api";
import type { CreateUserData, User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useState } from "react";
import UserForm from "./forms/UserForm";
import { PER_PAGE } from "../../constants";

const columns = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const Users = () => {
  const [form] = Form.useForm();
  const queryClient = new QueryClient();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParams.currentPage, queryParams.perPage],
    queryFn: () => {
      const queryString = new URLSearchParams({
        perPage: String(queryParams.perPage),
        currentPage: String(queryParams.currentPage),
      }).toString();
      console.log(queryString);
      return getUsers(queryString).then((res) => res.data);
    },
  });

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    await userMutate(form.getFieldsValue() as CreateUserData);
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
          items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Users" }]}
        />
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}
        <UsersFilter
          onFilterChange={(filterName: string, filterValue: string) => {
            console.log(filterName, filterValue);
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            Create users
          </Button>
        </UsersFilter>
        <Table
          pagination={{
            total: users?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            onChange: (page) => {
              {
                setQueryParams((prev) => {
                  return { ...prev, currentPage: page };
                });
              }
            },
          }}
          columns={columns}
          dataSource={users?.users}
          rowKey="id"
        />
        <Drawer
          styles={{ body: { background: colorBgLayout } }}
          title="Create user"
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
            <UserForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
