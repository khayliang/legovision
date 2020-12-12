import { request } from 'umi';

export interface VideoNameInfo {
  name: string;
  processed: boolean;
}

const serverUrl = 'https://legovision-server.herokuapp.com';
//const serverUrl = 'http://0.0.0.0:5000';

export const fullUrl = (path: string = ''): string => {
  const url: string = serverUrl + path;

  return url;
};
export const getVideoNames = async (): Promise<VideoNameInfo[]> => {
  const response = await request(fullUrl('/names'), {
    method: 'get',
  });
  const names: VideoNameInfo[] = response.message;
  return names;
};

export const getLegoInfo = async (
  videoName: string | any,
): Promise<string[]> => {
  const response = await request(fullUrl('/video/info'), {
    method: 'get',
    params: {
      name: videoName,
    },
  });
  const info: string[] = response.message;
  return info;
};

export const uploadVideo = async (video: any): Promise<boolean> => {
  await request(fullUrl(), {
    method: 'post',
    data: video,
  });
  return true;
};
export const getVideo = async (videoName: string): Promise<any> => {
  const response = await request(fullUrl('/video'), {
    method: 'get',
    params: {
      name: videoName,
    },
  });
  return response;
};
