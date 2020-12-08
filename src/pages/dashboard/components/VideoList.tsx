import React from 'react'
import { List,  Avatar } from 'antd';
import queryString from 'query-string'
import ThumbnailImg from '../../../assets/thumbnail.svg'
import { Link } from "umi";
import {VideoNameInfo} from '../../../services/api'
import {LoadingOutlined, CheckCircleOutlined} from '@ant-design/icons'
import style from './VideoList.less'
export default ({data}: {data: VideoNameInfo[]}) => {
  const renderItem = (info: VideoNameInfo) => {
    if (info.processed == true) {
      return (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={ThumbnailImg}/>}
            title={<Link to={`/video?${queryString.stringify({videoName: info.name})}`}>{info.name}</Link>}
            description="A video of lego bricks. "
          />
          <CheckCircleOutlined className={style.icon}/>
        </List.Item>
      )
    }
    return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={ThumbnailImg}/>}
        title={info.name}
        description="A video of lego bricks. "
      />
      <LoadingOutlined className={style.icon}/>
    </List.Item>
  )}
  return(
    <List dataSource={data} renderItem={renderItem} pagination={{pageSize: 5}}/>
  )
}