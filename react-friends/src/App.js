import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography, Layout, Menu } from "antd";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '20px', marginRight: 'auto' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>
            Remember Friends App
          </Title>
        </div>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding : '0 50px'}}>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
