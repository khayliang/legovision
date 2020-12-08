import React, {useState} from 'react'
import {Modal, Upload} from 'antd'
import styles from './UploadModal.less'
import {InboxOutlined} from '@ant-design/icons'
import {uploadVideo} from '../../../services/api'
import { RcFile } from 'antd/es/upload/interface'
const { Dragger } = Upload;

export default (
  {onOk, onCancel, visible}: {onOk: any, onCancel: any, visible: boolean}) => {
    const [state, setState] = useState({
      fileList: [] as RcFile[],
      uploading: false,
    });

    const handleUpload = () => {
      const { fileList } = state;
      const formData = new FormData();
      fileList.forEach((file: RcFile) => {
        formData.append('file', file);
      });
      setState({
        fileList: [],
        uploading: true,
      });
      uploadVideo(formData)
      onOk()
    }

    const uploadProps = {
      onRemove: () => {
        setState({
          ...state,
          fileList: []
        })
      },
      beforeUpload: (file: RcFile) => {
        setState({
          ...state,
          fileList: [file]
        });
        return false
      },
      fileList: state.fileList,
      multiple: false,
      name: 'file'
    }
    return(
      <Modal
      title="Upload Video"
      visible={visible}
      onOk={handleUpload}
      onCancel={onCancel}
      className={styles.uploadModal}
    >
      <Dragger 
      {...uploadProps}
      >
    <p className={"ant-upload-drag-icon"}>
    <InboxOutlined/>
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
  </Dragger>
    </Modal>
    )
}