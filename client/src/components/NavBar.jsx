import React, { Component } from 'react'

import Bisection from '../pages/Bisection';
import False from '../pages/False';
import Onepoint from '../pages/Onepoint';
import Raphson from '../pages/Raphsons';
import Secant from '../pages/Secant';


import { GithubOutlined } from '@ant-design/icons';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

//const [page,setpage]=useState()
//const Bisectionpage = () => setpage(<Bisection/>)


class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      pageContent: (<div>Please select page !!!</div>)
    };
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onSelectMenu = (pageKey) => {
    switch (pageKey) {
      case "1":
        this.setState({ pageContent: <Bisection /> });
        break;
      case "2":
        this.setState({ pageContent: <False /> });
        break;
      case "3":
        this.setState({ pageContent: <Onepoint /> });
        break;
      case "4":
        this.setState({ pageContent: <Raphson /> });
        break;
      case "5":
        this.setState({ pageContent: <Secant /> });
        break;
      default:
        this.setState({ pageContent: (<div>Please select page {pageKey} !!!</div>) });
        break;
    }

  };

  createSidebar = () => {
    return (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <SubMenu key="sub1"
          title={<span><GithubOutlined />Root of equation</span>}
        >
          <Menu.Item onClick={() => { this.onSelectMenu('1') }}>Bisection</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('2') }}>False</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('3') }}>Onepoint</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('4') }}>Raphson</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('5') }}>Secant</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><GithubOutlined />Linear Algebra</span>}
        >
          <Menu.Item onClick={() => { this.onSelectMenu('6') }} >Cramer's Rule</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('7') }}>Gauss's Elimination</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('8') }}>Gauss Jordon</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('9') }}>LU Decomposition</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('10') }}>Jacobi Iteration Method</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('11') }}>Gauss Seidel Iteration</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('12') }}>Conjugate Gradient Method</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={<span><GithubOutlined />Interpolation</span>}
        >
          <Menu.Item onClick={() => { this.onSelectMenu('13') }}>Newton Divide Difference</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('14') }}>Lagrange</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('15') }}>Spline</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={<span><GithubOutlined />Least Square Error</span>}
        >
          <Menu.Item onClick={() => { this.onSelectMenu('16') }}>Linear Regression</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('17') }}>Polynomial Regression</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('18') }}>Multiple Linear Regression</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub5"
          title={<span><GithubOutlined />Integration</span>}
        >
          <Menu.Item onClick={() => { this.onSelectMenu('19') }}>Composite Trapezoidal Rule</Menu.Item>
          <Menu.Item onClick={() => { this.onSelectMenu('20') }}>Composite Simpson's Rule</Menu.Item>
        </SubMenu>
        <Menu.Item key="21">
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          {this.createSidebar()}
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '30px 0' }}>

            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 30, minHeight: 360 }}>
              {this.state.pageContent}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ประชานาถ วรสิทธิ์ 6004062630302</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default NavBar