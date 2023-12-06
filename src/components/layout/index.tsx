import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PacienteForm } from "../paciente-form";
import { ExameForm } from "../exame-form";
import { PacientesList } from "../pacientes-list";

const { Header, Content, Sider } = Layout;

const LayoutApp: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center", color: "white", fontFamily: "cursive", fontSize: 30 }} >DiaDiet</Header>
        <Content>
          <Layout style={{ background: colorBgContainer }}>
            <Sider
              style={{ background: colorBgContainer, minHeight: "90vh" }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["pacientes"]}
                defaultOpenKeys={["pacientes"]}
                style={{ height: "100%" }}
              >
                <Menu.Item key="pacientes">
                  <Link to="/pacientes">Criar paciente</Link>
                </Menu.Item>
                <Menu.Item key="pacientesList">
                  <Link to="/pacientesList">Lista de Pacientes</Link>
                </Menu.Item>
                <Menu.Item key="exames">
                  <Link to="/exames">Exames</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "10px 24px", minHeight: 280 }}>
              <Routes>
                <Route path="/pacientes" element={<PacienteForm />} />
                <Route path="/exames" element={<ExameForm />} />
                <Route path="/pacientesList" element={<PacientesList />} />
                <Route path="*" element={<Navigate to="/pacientes" />} />
              </Routes>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Router>
  );
};

export { LayoutApp };
