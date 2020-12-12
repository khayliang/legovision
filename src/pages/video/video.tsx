import React, { useEffect, useState } from 'react';
import styles from './video.less';
import { Divider, Card } from 'antd';
import { useLocation } from 'umi';
import LegoList from './components/LegoList';
import ReactPlayer from 'react-player';
import queryString from 'query-string';
import { getLegoInfo, fullUrl } from '../../services/api';

export default () => {
  const location = useLocation();
  const { videoName } = queryString.parse(location.search);

  const [videoState, setVideoState] = useState({
    currentTime: 0,
    playing: false,
    currentInfo: '',
  });

  const [legoInfo, setLegoInfo] = useState(['']);

  useEffect(() => {
    getLegoInfo(videoName).then((value: string[]) => {
      setLegoInfo(value);
      setVideoState({
        ...videoState,
        currentInfo: value[0],
      });
    });
  }, []);

  useEffect(() => {
    const time: number = videoState.currentTime;
    const frame: number = Math.round(time * 20);
    setVideoState({
      ...videoState,
      currentInfo: legoInfo[frame],
    });
  }, [videoState.currentTime]);

  const onProgressCallback = ({ playedSeconds }: { playedSeconds: number }) => {
    setVideoState({
      ...videoState,
      currentTime: playedSeconds,
    });
  };

  const onPlayPause = () => {
    setVideoState({
      ...videoState,
      playing: !videoState.playing,
    });
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.videoDiv}>
        <h1 className={styles.title}>{videoName}</h1>
        <Divider />
        <ReactPlayer
          style={{ backgroundColor: 'black' }}
          onPlay={onPlayPause}
          onPause={onPlayPause}
          onProgress={onProgressCallback}
          controls={true}
          url={[
            {
              src: fullUrl(`/video?name=${videoName}`),
              type: 'video/webm',
            },
          ]}
        />
      </div>

      <Card title="Detections" bordered={true} className={styles.list}>
        <LegoList legoInfo={videoState.currentInfo} />
      </Card>
    </div>
  );
};
