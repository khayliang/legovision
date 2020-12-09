import React from 'react';
import styles from './index.less';
import { Table, Popconfirm, Button } from 'antd';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();
  const startOnClick = () => {
    history.push('/dashboard');
  };
  return (
    <div className={styles.background}>
      <h1 className={styles.title}>Lego Detection.</h1>
      <h1 className={styles.subtitle}>
        Hello! I detect Lego blocks against a white background.
      </h1>
      <Button
        className={styles.start}
        size="large"
        shape="round"
        type="primary"
        onClick={startOnClick}
      >
        Start
      </Button>
    </div>
  );
};
