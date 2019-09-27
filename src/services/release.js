import request from '@/utils/request';

// 代理路径
const baseUrl = '/wookong';
// 假数据接口



export async function uploadFileImage(params) {
  return request(`${baseUrl}/upload/image`,{
    method:'POST',
    body: params
  });
}
export async function uploadFileVideo(params) {
  return request(`${baseUrl}/upload/video`,{
    method:'POST',
    body: params
  });
}
export async function uploadFileAudio(params) {
  return request(`${baseUrl}/upload/audio`,{
    method:'POST',
    body: params
  });
}
