import {
  message,
} from 'antd';
import { queryCM,removePA,removeImg,add } from '@/services/CM';

export default {
  namespace: 'CM',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  //effects方法用处理异步动作
  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(queryCM, payload);
      console.log('获得数据',response)
      let obj = {};
      if(response.data.comments){
        obj ={
          list:response.data.comments,
          pagination:{
            total: response.data.total
          }
        };
      }
      yield put({
        type: 'save',
        payload: obj,
      });
    },
    *remove({ payload,callback }, { call, put }) {
      const response = yield call(removePA, payload);
      if(callback) callback(response)
    },
    *removeImg({ payload,callback }, { call, put }) {
      const response = yield call(removeImg, payload);
      if(callback) callback(response)
    },
    *add({ payload,callback }, { call, put }) {
      const response = yield call(add, payload);
      console.log('add',response)
      if(response.status === 200){
        if(callback) callback(response)
      }else{
        message.error('新建失败')
      }

    },
  },
  //reducers方法处理同步
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
