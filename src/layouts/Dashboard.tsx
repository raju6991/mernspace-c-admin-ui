import { Navigate, NavLink, Outlet } from "react-router-dom";
import Icon from "@ant-design/icons";
import Logo from "../components/icons/Logo";
import Home from "../components/icons/Home";
import { foodIcon } from "../components/icons/FoodIcon";
import BasketIcon from "../components/icons/BasketIcon";
import GiftIcon from "../components/icons/GiftIcon";
import { useAuthStore } from "../store";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import UserIcon from "../components/icons/UserIcon";

const { Sider, Header, Content, Footer } = Layout;
const items = [
  {
    key: "/",
    icon: <Icon component={Home} />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: "/users",
    icon: <Icon component={UserIcon} />,
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    key: "/products",
    icon: <Icon component={foodIcon} />,
    label: <NavLink to="/products">Products</NavLink>,
  },
  {
    key: "/orders",
    icon: <Icon component={BasketIcon} />,
    label: <NavLink to="/orders">Orders</NavLink>,
  },
  {
    key: "/promos",
    icon: <Icon component={GiftIcon} />,
    label: <NavLink to="/promos">Promos</NavLink>,
  },
];
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAuthStore();

  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return (
    <>
      <div>
        <Layout style={{ minHeight: "100vh", background: colorBgContainer }}>
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="logo">
              <Logo />
            </div>
            <Menu
              theme="light"
              defaultSelectedKeys={["/"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: "0 16px" }}>
              <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Mernspace Pizza Shop
            </Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Dashboard;
