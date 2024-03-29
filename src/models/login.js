import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getFakeCaptcha } from '@/services/api';
// import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { requestLogin, requestLogout } from '@/services/user';
import storage from '@/utils/storage';
import {
  message,
} from 'antd';


export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(requestLogin, payload);
      //if (!data) return;
      console.log('登陆信息：',response);
      const { data,user } = response;
      // 本地持久化 sessionID
      if(data === "用户名或密码有问题" ){
        storage.remove(['token']);
        storage.remove(['user']);
        return message.error("用户名或密码有问题")
      }
      storage.set('token', data);
      storage.set('user', user);

      // 角色权限设置
      const getAuthority = ()=>['admin'];

      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'ok',
          currentAuthority: getAuthority(),
        },
      });
      yield put({
        type: 'user/saveCurrentUser',
        payload: ['admin'],
      });

      reloadAuthorized();
      // const urlParams = new URL(window.location.href);
      // const params = getPageQuery();
      // let { redirect } = params;
      // if (redirect) {
      //   const redirectUrlParams = new URL(redirect);
      //   if (redirectUrlParams.origin === urlParams.origin) {
      //     redirect = redirect.substr(urlParams.origin.length);
      //     if (redirect.match(/^\/.*#/)) {
      //       redirect = redirect.substr(redirect.indexOf('#') + 1);
      //     }
      //   } else {
      //     window.location.href = redirect;
      //     return;
      //   }
      // }

      yield put(routerRedux.replace('/'));
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put, call }) {
      //yield call(requestLogout);
      /*yield put({
        type: 'changeLoginStatus',
        payload: {
          status: undefined,
          currentAuthority: [],
        },
      });*/
      //reloadAuthorized();

      // 清除本地数据
      storage.remove(['token']);
      storage.remove(['user']);

      yield put(
        routerRedux.push({
          pathname: '/user/login',
          // search: stringify({
          //   redirect: window.location.href,
          // }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(
      state,
      {
        payload: { currentAuthority, ...rest },
      }
    ) {
      setAuthority(currentAuthority);
      return {
        ...state,
        ...rest,
      };
    },
  },
};
