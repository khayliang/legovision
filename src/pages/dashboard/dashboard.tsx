import React, { useState, useEffect } from 'react';
import styles from './dashboard.less';
import { Button, Divider, notification } from 'antd';
import VideoList from './components/VideoList';
import UploadModal from './components/UploadModal';
import { getVideoNames, VideoNameInfo } from '../../services/api';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoNames, setVideoNames] = useState([] as VideoNameInfo[]);
  const [previousNames, setPreviousNames] = useState([] as VideoNameInfo[]);
  useEffect(() => {
    pollVideoNames();
    const interval = setInterval(pollVideoNames, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (previousNames.length > 0) {
      const changes: VideoNameInfo[] = getChanges(previousNames, videoNames);
      if (changes.length > 0) {
        changes.forEach(function(item, index) {
          if (item.processed == true) {
            notification.open({
              message: 'Video Processed!',
              description: `${item.name} has finished processing.`,
            });
          }
        });
      }
    }
    setPreviousNames(videoNames);
  }, [videoNames]);

  const getChanges = (
    oldArray: VideoNameInfo[],
    newArray: VideoNameInfo[],
  ): VideoNameInfo[] => {
    let changes: VideoNameInfo[] = [];
    let i, item, j, len;
    if (JSON.stringify(oldArray) === JSON.stringify(newArray)) {
      return changes;
    }
    for (i = j = 0, len = newArray.length; j < len; i = ++j) {
      item = newArray[i];
      if (JSON.stringify(item) !== JSON.stringify(oldArray[i])) {
        changes.push(item);
      }
    }
    return changes;
  };

  const pollVideoNames = () => {
    getVideoNames().then((val: VideoNameInfo[]) => {
      setVideoNames(val);
    });
  };

  const detectOnClick = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={styles.mainDiv}>
      <UploadModal
        onOk={handleOk}
        onCancel={handleCancel}
        visible={isModalVisible}
      />
      <div className={styles.headerDiv}>
        <h1 className={styles.title}>Your Detections</h1>
        <Button
          size="large"
          shape="round"
          type="primary"
          onClick={detectOnClick}
        >
          Detect new Legos
        </Button>
      </div>
      <div className={styles.tableDiv}>
        <Divider />
        <h3 className={styles.subtitle}>Past Detections</h3>
        <VideoList data={videoNames} />
      </div>
    </div>
  );
};
