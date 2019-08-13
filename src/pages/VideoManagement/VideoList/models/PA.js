import { queryPlan,uploadFile,searchList } from '@/services/PA';

export default {
  namespace: 'PA',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  //effects方法用处理异步动作
  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(queryPlan, payload);
      console.log('获得数据',response)
      if(response){
        const obj ={
          list:response.data.videos,
          pagination:{
            total: response.data.total
          }
        };
        yield put({
          type: 'save',
          payload: obj,
        });
      }
      if (callback) callback(response.data);
    },
    *uploadFile({ payload,callback }, { call, put }) {
      const response = yield call(uploadFile, payload);
      console.log('上传返回',response)
      if (callback) callback(response);
    },
    *search({ payload,callback }, { call, put }) {
      const response = yield call(searchList, payload);
      console.log('查询',response)
      if(response){
        const obj ={
          list:response.data.videos,
          pagination:{
            total: response.data.total
          }
        };
        yield put({
          type: 'save',
          payload: obj,
        });
      }
      if (callback) callback(response);
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
