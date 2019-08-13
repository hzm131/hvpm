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
  return request(`${baseUrl}/video/query`,{
    method:'GET',
  });
}

export async function searchList(params) {
  return request(`${baseUrl}/video/query?${stringify(params)}`,{
    method:'GET',
  });
}
