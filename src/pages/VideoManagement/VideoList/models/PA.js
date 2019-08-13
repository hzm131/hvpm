import { queryPlan,uploadFile,removePA } from '@/services/PA';

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
      let obj = {};
      if(response.data.videos){
        obj ={
          list:response.data.videos,
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
    *uploadFile({ payload,callback }, { call, put }) {
      const response = yield call(uploadFile, payload);
      console.log('上传返回',response)
      if (callback) callback(response);
    },
    *remove({ payload,callback }, { call, put }) {
      const response = yield call(removePA, payload);
      console.log("ressss",response);
      console.log("type",typeof response);
      console.log("sssss")
      if(callback) callback(response)
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
