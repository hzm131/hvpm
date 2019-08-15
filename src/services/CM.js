import request from '@/utils/request';
import { stringify } from 'qs'

const baseUrl = '/wookong';

export async function queryCM(params) {
  return request(`${baseUrl}/comment/query?${stringify(params)}`,{
    method:'GET',
  });
}

export async function childFetch(params) {
  console.log("params",params)
  return request(`${baseUrl}/reply/query?${stringify(params)}`,{
    method:'GET',
  });
}
