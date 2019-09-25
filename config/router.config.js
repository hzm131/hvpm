import authoritizeRoutes from './routesAuthority.config';

const routesConfig = [
  // user
  {
    path: '/user',
    // component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      /*{ path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },*/
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // 首页
      {
        path: '/home/news',
        component: './Home/Home',
      },
      {
        path: '/usermanagement',
        icon: 'project',
        name: 'user',
        routes: [
          {
            path: '/usermanagement/generaluser',
            name: 'generaluser',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/usermanagement/generaluser',
                redirect: '/usermanagement/generaluser/list',
              },
              {
                path: '/usermanagement/generaluser/list',
                name: 'list',
                component: './UserManagement/UserManagement/UserList',
              },
            ],
          },
        ],
      },
      {
        path: '/videomanagement',
        icon: 'project',
        name: 'videomanagement',
        routes: [
          {
            path: '/videomanagement/VideoList',
            name: 'VideoList',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/videomanagement/VideoList',
                redirect: '/videomanagement/VideoList/list',
              },
              {
                path: '/videomanagement/VideoList/list',
                name: 'list',
                component: './VideoManagement/VideoList/VideoList',
              },
              {
                path: '/videomanagement/VideoList/add',
                name: 'add',
                component: './VideoManagement/VideoList/VideoAdd',
              },
              {
                path: '/videomanagement/VideoList/update',
                name: 'update',
                component: './VideoManagement/VideoList/VideoUpdate',
              },
            ],
          },
          {
            path: '/videomanagement/comment',
            name: 'comment',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/videomanagement/comment',
                redirect: '/videomanagement/comment/list',
              },
              {
                path: '/videomanagement/comment/list',
                name: 'list',
                component: './VideoManagement/Comment/Comment',
              },
              /*{
                path: '/videomanagement/comment/add',
                name: 'add',
                component: './VideoManagement/Comment/CommentAdd',
              },*/
              /*{
                path: '/videomanagement/comment/update',
                name: 'update',
                component: './VideoManagement/Comment/CommentUpdate',
              },*/
            ],
          },
        ],
      },
      {
        path: '/article',
        icon: 'project',
        name: 'article',
        routes: [
          {
            path: '/article/release',
            name: 'release',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/article/release',
                redirect: '/article/release/list',
              },
              {
                path: '/article/release/list',
                name: 'list',
                component: './Article/Release/List',
              },
              {
                path: '/article/release/add',
                name: 'add',
                component: './Article/Release/Add',
              },
              {
                path: '/article/release/update',
                name: 'update',
                component: './Article/Release/Update',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routesConfig;
