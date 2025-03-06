import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import AddCar from './AddCar';
import CarsList from './CarsList';

const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: 'Araçlar', component: <CarsList /> },
  { key: '2', label: 'Ekleme', component: <AddCar /> },
  { key: '3', label: 'İletişim', component: <div>İletişim Sayfası</div> },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState('1');

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          items={items.map(({ key, label }) => ({ key, label }))}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {items.find((item) => item.key === selectedKey)?.component}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Tiger ©{new Date().getFullYear()} Created by React
      </Footer>
    </Layout>
  );
};

export default App;
