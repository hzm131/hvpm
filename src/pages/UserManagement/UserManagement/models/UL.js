import { queryUL } from '@/services/UL';

export default {
  namespace: 'UL',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  //effects方法用处理异步动作
  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(queryUL, payload);
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
