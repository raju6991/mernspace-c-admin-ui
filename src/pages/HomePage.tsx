import {
  Card,
  Col,
  Row,
  Skeleton,
  Space,
  Statistic,
  Typography,
  Tag,
  Button,
} from "antd";
import Icon from "@ant-design/icons";
import { useAuthStore } from "../store";
import type { ComponentType } from "react";
import { BarChartIcon } from "../components/icons/BarChart";
import BasketIcon from "../components/icons/BasketIcon";
import { Link } from "react-router-dom";
interface CardTitleProps {
  title: string;
  PrefixIcon: ComponentType<unknown>;
}
const { Title, Text } = Typography;

const list = [
  {
    OrderSummary: "Peperoni, Margarita ...",
    address: "Bandra, Mumbai",
    amount: 1200,
    status: "preparing",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
];
const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
  return (
    <Space>
      <Icon component={PrefixIcon} />
      {title}
    </Space>
  );
};
function HomePage() {
  const { user } = useAuthStore();
  return (
    <div>
      <Title level={4}>Welcome, {user?.firstName} 😄</Title>
      <Row className="mt-4" gutter={16}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card variant="borderless">
                <Statistic title="Total orders" value={28} />
              </Card>
            </Col>
            <Col span={12}>
              <Card variant="borderless">
                <Statistic
                  title="Total sale"
                  value={70000}
                  precision={2}
                  prefix="$"
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title={<CardTitle title="Sales" PrefixIcon={BarChartIcon} />}
                variant="borderless"
              ></Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Card
            variant="borderless"
            title={<CardTitle title="Recent orders" PrefixIcon={BasketIcon} />}
          >
            <Space
              orientation="vertical"
              size="middle"
              style={{ width: "100%" }}
            >
              {list.map((item, index) => (
                <Skeleton
                  key={`order-${index}`}
                  avatar
                  title={false}
                  loading={item.loading}
                  active
                >
                  <Row
                    align="middle"
                    justify="space-between"
                    style={{ gap: 16 }}
                  >
                    <Col flex="auto">
                      <div>
                        <a href="https://ant.design">{item.OrderSummary}</a>
                        <div>{item.address}</div>
                      </div>
                    </Col>
                    <Col>
                      <Text strong>${item.amount}</Text>
                      <Tag color="volcano" style={{ marginLeft: 8 }}>
                        {item.status}
                      </Tag>
                    </Col>
                  </Row>
                </Skeleton>
              ))}
            </Space>
            <div style={{ marginTop: 20 }}>
              <Button type="link">
                <Link to="/orders">See all orders</Link>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
