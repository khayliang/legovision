import React, { useState } from 'react';
import { Modal, Upload, message } from 'antd';
import styles from './UploadModal.less';
import { InboxOutlined } from '@ant-design/icons';
import { uploadVideo } from '../../../services/api';
import { RcFile } from 'antd/es/upload/interface';
const { Dragger } = Upload;

export default ({
  onOk,
  onCancel,
  visible,
}: {
  onOk: any;
  onCancel: any;
  visible: boolean;
}) => {
  const [state, setState] = useState({
    fileList: [] as RcFile[],
    uploading: false,
  });

  const handleUpload = () => {
    const { fileList } = state;
    if (fileList.length > 0) {
      const formData = new FormData();
      fileList.forEach((file: RcFile) => {
        const is10MB = file.size / 1024 / 1024 < 10;
        if (!is10MB) {
          message.error('Upload file must be smaller than 10MB!');
        } else {
          formData.append('file', file);
          uploadVideo(formData);
        }
        setState({
          fileList: [],
          uploading: true,
        });
      });
    }
    onOk();
  };

  const uploadProps = {
    accept: '.mp4, video/mp4',
    onRemove: () => {
      setState({
        ...state,
        fileList: [],
      });
    },
    beforeUpload: (file: RcFile) => {
      setState({
        ...state,
        fileList: [file],
      });
      return false;
    },
    fileList: state.fileList,
    multiple: false,
    name: 'file',
  };
  return (
    <Modal
      title="Upload Video"
      visible={visible}
      onOk={handleUpload}
      onCancel={onCancel}
      className={styles.uploadModal}
    >
      <Dragger {...uploadProps}>
        <p className={'ant-upload-drag-icon'}>
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </Modal>
  );
};
