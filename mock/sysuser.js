import { parse } from 'url';

// mock userAdminDataSource
let userAdminDataSource = [];
for (let i = 0; i < 46; i += 1) {
  userAdminDataSource.push({
    key: i,
    code: `UserCode ${i}`,
    name: `一个用户名称 ${i}`,
  });
}

function querySysuser(req, res, u) {
  //获取url
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
 //讲url参数转换成对象
  const params = parse(url, true).query;

  const {code,name} = params;


  let arr = []

  if(code || name){
    if(code){
      arr = userAdminDataSource.filter(value => value.code === code)
    }
    if(name){
      arr = userAdminDataSource.filter(value => value.name === name)
    }
    const result = {
      list: arr,
      pagination: {
        total: arr.length,
      },
    };
    return res.json(result);
  }


  //拿到数组
  let dataSource = userAdminDataSource;

  //排序
  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
//如果前台有传status
  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }
  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1, //当前页数+10
    },
  };
  return res.json(result);
}

function postSysuser(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  //const body = (b && b.body) || req.body;

  const body = req.body;

  console.log(body)

  const {  code, name } = body;

  //const method = req.method;
  /*switch (method) {
    /!* eslint no-case-declarations:0 *!/
    case 'delete':
      userAdminDataSource = userAdminDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'POST':
      const i = Math.ceil(Math.random() * 10000);
      userAdminDataSource.unshift({
        key: i,
        code,
        name,
      });
      break;
    case 'update':
      userAdminDataSource = userAdminDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }*/

  const i = Math.ceil(Math.random() * 10000);
  userAdminDataSource.unshift({
    key: i,
    code,
    name,
  });

  const result = {
    list: userAdminDataSource,
    pagination: {
      total: userAdminDataSource.length,
    },
  };

  return res.json(result);

}

function updateSysuser(req,res){
  const {name,code,key} = req.body;
  userAdminDataSource = userAdminDataSource.map(item => {
    if (item.key === key) {
      Object.assign(item, { code, name });
      return item;
    }
    return item;
  });
  const result = {
    list: userAdminDataSource,
    pagination: {
      total: userAdminDataSource.length,
    },
  };
  return res.json(result);
}

function removeSysuser(req, res) {
  const key = req.body;
  userAdminDataSource = userAdminDataSource.filter(value => value.key !== key);

  const result = {
    list: userAdminDataSource,
    pagination: {
      total: userAdminDataSource.length,
    },
  };
  //console.log(result)
  return res.json(result);
}

export default {
  'GET /rest/sm/user/save': querySysuser,
  'POST /rest/sm/user/save': postSysuser,
  'POST /rest/sm/user/delete': removeSysuser,
  'POST /rest/sm/user/update/': updateSysuser,
};
