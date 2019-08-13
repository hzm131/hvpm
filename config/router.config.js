import authoritizeRoutes from './routesAuthority.config';

const routesConfig = [
  // user
  {
    path: '/user',
    // component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      // { path: '/user/register', component: './User/Register' },
      // { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // { path: '/', redirect: '/dashboard/projectDashboard' },
      // dashboard
      // { path: '/', redirect: '/dashboard/analysis' },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },

      // 管理员 dashboard
      {
        path: '/dashboard/projectDashboard',
        component: './Dashboard/projectDashboard',
      },
      // {
      //   path: '/dashboard/analysis',
      //   name: 'analysis',
      //   component: './Dashboard/Analysis',
      // },

      //系统管理
     /* {
        path: '/sysadmin',
        icon: 'setting',
        name: 'sysadmin',
        routes: [
          {
            path: '/sysadmin/useradmin',
            name: 'useradmin',
            component: './Sysadmin/UserAdmin',
          },
          {
            path: '/sysadmin/roleadmin',
            name: 'roleadmin',
            component: './Sysadmin/RoleAdmin',
          },
          {
            path: '/sysadmin/registered',
            name: 'registered',
            component: './Sysadmin/Registered',
          },
        ],
      },*/
      //基础数据
      /*{
        path: '/basicdata',
        icon: 'database',
        name: 'basicdata',
        routes: [

          {
            path: '/basicdata/areaadmin',
            name: 'areaadmin',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/basicdata/areaadmin',
                redirect: '/basicdata/areaadmin/add',
              },
              {
                path: '/basicdata/areaadmin/add',
                name: 'list',
                component: './Basicdata/Areaadmin/Add',
              },
            ],
          },
          {
            path: '/basicdata/businessadmin',
            name: 'businessadmin',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/basicdata/businessadmin',
                redirect: '/basicdata/businessadmin/businessadd',
              },
              {
                path: '/basicdata/businessadmin/businessadd',
                name: 'businessadmin',
                component: './Basicdata/BusinessAdmin/BusinessAdd',
              },
              {
                path: '/basicdata/businessadmin/businessnew',
                name: 'new',
                component: './Basicdata/BusinessAdmin/BusinessNew',
              },

            ],
          },
          {
            path: '/basicdata/dapartmanage',
            name: 'dapartmanage',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/basicdata/dapartmanage',
                redirect: '/basicdata/dapartmanage/list',
              },
              {
                path: '/basicdata/dapartmanage/list',
                name: 'list',
                component: './Basicdata/DapartManage/DapartManagelist',
              },
            ],
          },
          {
            path: '/basicdata/personalfile',
            name: 'personalfile',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/basicdata/personalfile',
                redirect: '/basicdata/personalfile/list',
              },
              {
                path: '/basicdata/personalfile/list',
                name: 'list',
                component: './Basicdata/PersonalFile/PersonalFilelist',
              },
              {
                path: '/basicdata/personalfile/add',
                name: 'add',
                component: './Basicdata/PersonalFile/PersonalFileadd',
              },
            ],
          },
          {
            path: '/basicdata/businessline',
            name: 'businessline',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/basicdata/businessline',
                redirect: '/basicdata/businessline/list',
              },
              {
                path: '/basicdata/businessline/list',
                name: 'list',
                component: './Basicdata/BusinessLine/BusinessLine',
              }
            ],
          },
        ],
      },*/
      //项目管理
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
            ],
          },

        ],
      },
      //绩效管理
      /* {
         path: '/postmanagement',
         icon: 'profile',
         name: 'postmanagement',
         routes: [
           {
             path: '/postmanagement/postmanagement',
             name: 'postmanagement',
             hideChildrenInMenu: true,
             routes: [
               {
                 path: '/postmanagement/postmanagement',
                 redirect: '/postmanagement/postmanagement/list',
               },
               {
                 path: '/postmanagement/postmanagement/list',
                 name: 'list',
                 // component: './PostManagement/PostManagement/PostManagement',
               },
             ],
           },
           {
             path: '/postmanagement/performance',
             name: 'performance',
             // component: './PostManagement/PostManagement/Performance',
           },
         ],
       },*/
      //合同管理
           /*{
             path: '/workmanagement',
             icon: 'schedule',
             name: 'workmanagement',
             routes: [
               {
                 path: '/workmanagement/projectmaintain',
                 name: 'projectmaintain',
                 hideChildrenInMenu: true,
                 routes: [
                   {
                     path: '/workmanagement/projectmaintain',
                     redirect: '/workmanagement/projectmaintain/list',
                   },
                   {
                     path: '/workmanagement/projectmaintain/list',
                     name: 'list',
                     // component: './WorkManagement/ProjectMaintain/ProjectMaintain',
                   },
                   {
                     path: '/workmanagement/projectmaintain/update',
                     name: 'update',
                     // component: './WorkManagement/ProjectMaintain/ProjectUpdate',
                   },
                 ],
               },
               {
                 path: '/workmanagement/dailyreport',
                 name: 'dailyreport',
                 // component: './WorkManagement/DailyReport',
               },
               {
                 path: '/workmanagement/investdecision',
                 name: 'investdecision',
                 hideChildrenInMenu: true,
                 routes: [
                   {
                     path: '/workmanagement/investdecision',
                     redirect: '/workmanagement/investdecision/list',
                   },
                   {
                     path: '/workmanagement/investdecision/list',
                     name: 'list',
                     // component: './WorkManagement/InvestDecision/InvestDecision',
                   },
                   {
                     path: '/workmanagement/investdecision/vote',
                     name: 'vote',
                     component: './WorkManagement/InvestDecision/Vote',
                   },
                 ],
               },
             ],
           },*/
      //日常审批
       /*{
         path: '/approval',
         icon: 'audit',
         name: 'approval',
         routes: [
           {
             path: '/approval/statustable',
             name: 'status',
             component: './Approval/Status/StatusTable',
             hideChildrenInMenu: true,
             routes: [
               {
                 path: '/approval/statustable',
                 redirect: '/approval/statustable/list',
               },
               {
                 path: '/approval/statustable/list',
                 name: 'list',
                  component: './Approval/Status/StatusTable',
               },
               {
                 path: '/approval/statustable/application',
                 name: 'application',
                 component: './Approval/Status/Application',
               },
               {
                 path: '/approval/statustable/approval',
                 name: 'approval',
                 component: './Approval/Status/Approval',
               },
               {
                 path: '/approval/statustable/save',
                 name: 'save',
               },
             ],
           },
           {
             path: '/approval/finance',
             name: 'finance',
              component: './Approval/Finance/Finance',
           },
           {
             path: '/approval/leave',
             name: 'leave',
              component: './Approval/Leave/Leave',
           },
         ],
       },*/
      //分析统计
        /*{
          path: '/analysis',
          icon: 'bar-chart',
          name: 'analysis',
          routes: [
            {
              path: '/analysis/fundnetvalue',
              name: 'fundnetvalue',
              // component: './Analysis/NetFund',
            },
            {
              path: '/analysis/riskWarning',
              name: 'riskWarning',
              // component: './Analysis/RiskWarning',
            },
            {
              path: '/analysis/funnelChart',
              name: 'funnelChart',
              // component: './Analysis/funnelChart',
            },
          ],
        },*/

    ],
  },
];

export default routesConfig;
