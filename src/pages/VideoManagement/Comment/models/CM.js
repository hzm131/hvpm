import {
  message,
} from 'antd';
import { queryCM,removePA,removeImg,add,childFetch } from '@/services/CM';

export default {
  namespace: 'CM',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    childData: {
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
    *childFetch({ payload,callback }, { call, put }) {
      console.log("payload",payload)
      const response = yield call(childFetch, payload);
      console.log('子表',response)
      let obj = {};
      if(response.data.replys){
        obj ={
          list:response.data.replys,
          pagination:{
            total: response.data.total
          }
        };
      }
      yield put({
        type: 'child',
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
    child(state, action) {
      return {
        ...state,
        childData: action.payload,
      };
    },
  },
};
