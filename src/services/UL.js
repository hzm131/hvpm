import request from '@/utils/request';
import { stringify } from 'qs'

const baseUrl = '/wookong';

export async function queryUL(params) {
  return request(`${baseUrl}/comment/query?${stringify(params)}`,{
    method:'GET',
  });
}


