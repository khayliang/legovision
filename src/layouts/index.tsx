import React from 'react';
import { Menu } from 'antd';
import styles from './index.less';
import HeaderIcon from '../assets/headerLego.svg';
import { Link } from 'umi';

export default ({ children }: { children: any }) => {
  return (
    <div>
      <div className={styles.headerDiv}>
        <img src={HeaderIcon} className={styles.icon} />
        <Menu
          className={styles.menu}
          mode="horizontal"
          defaultSelectedKeys={['2']}
        >
          <Menu.Item key="detections">
            <Link to="/dashboard">Detections</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">About</a>
          </Menu.Item>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
        </Menu>
      </div>
      {children}
    </div>
  );
};
