import {
  query as queryUsers,
  queryCurrent,
  fetchUserDashboard,
  fetchUserSchedule,
  fetchUserAfterInvestMsg,
  fetchUserTaskMsg,
  markRead,
} from '@/services/user';
import storage from '@/utils/storage';

export default {
  namespace: 'user',

  state: {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    list: [],
    currentUser: storage.get('userinfo') || {},
    userDashboard: {},
    userSchedule: [],
    userAfterInvestMsg: {
      data: [],
      total: 0,
      unreadCount: 0,
    },
    userTaskMsg: {
      data: [],
      total: 0,
      unreadCount: 0,
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    // 获取用户面板数据
    *fetchUserDashboard(_, { call, put }) {
      const { resData } = yield call(fetchUserDashboard);
      console.log('获取用户面板数据',resData);
      yield put({
        type: 'setUserDashboard',
        payload: resData[0],
      });
    },
    // 获取用户日程
    *fetchUserSchedule({ payload,callback }, { call, put }) {
      const { resData } = yield call(fetchUserSchedule, payload);
      yield put({
        type: 'setUserSchedule',
        payload: resData,
      });
      if (callback) callback(resData);
    },
    // 获取任务信息列表
    *fetchUserTaskMsg({ payload }, { call, put }) {
      const { resData: data, total, userDefineInt1: unreadCount } = yield call(
        fetchUserTaskMsg,
        payload
      );

      yield put({
        type: 'setUserTaskMsg',
        payload: { data, total, unreadCount },
      });
    },
    // 获取投后信息列表
    *fetchUserAfterInvestMsg({ payload }, { call, put }) {
      const { resData: data, userDefineInt1: unreadCount, total } = yield call(
        fetchUserAfterInvestMsg,
        payload
      );
      yield put({
        type: 'setUserAfterInvestMsg',
        payload: { data, total, unreadCount },
      });
    },
    *markRead({ payload }, { call, put }) {
      const { type, index, id } = payload;

      if (type === 'task') {
        // 任务信息
        yield put({
          type: 'changeTaskMsgRead',
          payload: index,
        });
      } else if (type === 'afterInvest') {
        // 投后信息
        yield put({
          type: 'changeAfterInvestMsgRead',
          payload: index,
        });
      }

      yield call(markRead, { reqData: { id } });
    },
  },

  reducers: {
    save(state, action) {
      console.log(action);
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    setUserDashboard(state, { payload: userDashboard }) {
      return {
        ...state,
        userDashboard,
      };
    },
    setUserSchedule(state, { payload: userSchedule }) {
      return { ...state, userSchedule };
    },
    setUserTaskMsg(state, { payload: userTaskMsg }) {
      return { ...state, userTaskMsg };
    },
    setUserAfterInvestMsg(state, { payload: userAfterInvestMsg }) {
      return { ...state, userAfterInvestMsg };
    },
    changeTaskMsgRead(state, { payload: index }) {
      const userTaskMsg = {
        data: [
          ...state.userTaskMsg.data.slice(0, index),
          { ...state.userTaskMsg.data[index], state: 1 },
          ...state.userTaskMsg.data.slice(index + 1),
        ],
        unreadCount: state.userTaskMsg.unreadCount - 1,
        total: state.userTaskMsg.total,
      };
      return { ...state, userTaskMsg };
    },
    changeAfterInvestMsgRead(state, { payload: index }) {
      const userAfterInvestMsg = {
        data: [
          ...state.userAfterInvestMsg.data.slice(0, index),
          { ...state.userAfterInvestMsg.data[index], state: 1 },
          ...state.userAfterInvestMsg.data.slice(index + 1),
        ],
        unreadCount: state.userAfterInvestMsg.unreadCount - 1,
        total: state.userAfterInvestMsg.total,
      };
      return { ...state, userAfterInvestMsg };
    },
  },
};
