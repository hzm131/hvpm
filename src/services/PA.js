import { stringify } from 'qs';
import request from '@/utils/request';
import storage from '@/utils/storage'
// 代理路径
const baseUrl = '/wookong';
// 假数据接口



export async function uploadFile(params) {
  const str = JSON.stringify(params);
  console.log('上传穿的数据：',str)
  return request(`${baseUrl}/upload/image`,{
    method:'POST',
    body: params
  });
}

export async function queryPlan(params) {
  console.log(`/video/query?${stringify(params)}`)
  return request(`${baseUrl}/video/query?${stringify(params)}`,{
    method:'GET',
  });
}

export async function removePA(params) {
  console.log(`/video/delete/${params.videoId}`)
  return request(`${baseUrl}/video/delete/${params.videoId}`,{
    method:'DELETE',
  });
}
