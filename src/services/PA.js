import { stringify } from 'qs';
import request from '@/utils/request';
import storage from '@/utils/storage'
// 代理路径
const baseUrl = '/wookong';
// 假数据接口



export async function uploadFile(params) {
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

export async function removeImg(params) {
  return request(`${baseUrl}/video/image/delete/${params.id}`,{
    method:'DELETE',
  });
}
export async function add(params) {

  return request(`${baseUrl}/video/create`,{
    method:'POST',
    body: params
  });
}
