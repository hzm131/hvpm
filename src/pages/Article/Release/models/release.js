import { uploadFileImage } from '@/services/release';

export default {
  namespace: 'release',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  //effects方法用处理异步动作
  effects: {
    *uploadFileImage({ payload,callback }, { call, put }) {
      const response = yield call(uploadFileImage, payload);
      console.log('上传返回',response)
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
