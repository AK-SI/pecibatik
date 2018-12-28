import React from 'react'
import { Link } from 'gatsby'
import './style.css'
import { Menu,Col } from 'antd';
const AntL = require('antd').Layout
const { Header, Content, Footer } = AntL;

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    return (
      <AntL className="layout">
        <Header>
          <h1 className="logo" style={{ float: 'left' }}>
            <Link to={'/'} >
              {title}
            </Link>
          </h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{display:'flex',justifyContent:'center'}}>
          <Col style={{ background: '#fff' }} xs={22} md={21}>
            {children}
          </Col>
        </Content>
      </AntL>
    )
  }
}

export default Layout
