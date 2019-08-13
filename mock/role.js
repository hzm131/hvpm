import { parse } from 'url';

// mock roleDataSource
let roleDataSource = [];
let data2 = [];
for (let i = 0; i < 3; i += 1) {
  roleDataSource.push({
    key: i,
    title: `Role ${i}`,
    description: `一个角色名称 ${i}`,
  });
}

for (let i = 4; i < 5; i += 1) {
  data2.push({
    key: i,
    title: `Role ${i}`,
    description: `一个角色名称 ${i}`,
  });
}

let roleAdminDataSource = [];
for (let i = 0; i < 46; i += 1) {
  roleAdminDataSource.push({
    key: i,
    code: `RoleCode ${i}`,
    name: `一个角色名称 ${i}`,
  });
}

function getRoleForTable(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = roleAdminDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

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
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function getRoles(req, res, u) {
  //获取url
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  //讲url参数转换成对象
  const params = parse(url, true).query;

  const {code,name} = params


  let arr = []

  if(code || name){
    if(code){
      arr = roleAdminDataSource.filter(value => value.code === code)
    }
    if(name){
      arr = roleAdminDataSource.filter(value => value.name === name)
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
  let dataSource = roleAdminDataSource;

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

function postRole(req, res, u) {
  console.log("post 11122222222222222231")
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = roleDataSource;


  const result = {dataSource,roleByUserDataSource};

  return res.json(result);

}

const getRole1 = {
  data2
};


function deleteRole(req,res) {
  const key = req.body;
  roleAdminDataSource = roleAdminDataSource.filter(value => value.key !== key);
  const result = {
    list: roleAdminDataSource,
    pagination: {
      total: roleAdminDataSource.length,
    },
  };
  return res.json(result);
}

function updateRole(req,res) {
  const {name,code,key} = req.body;
  roleAdminDataSource = roleAdminDataSource.map(item => {
    if (item.key === key) {
      Object.assign(item, { code, name });
      return item;
    }
    return item;
  });
  const result = {
    list: roleAdminDataSource,
    pagination: {
      total: roleAdminDataSource.length,
    },
  };
  return res.json(result);
}

function addRole(req,res){
  const body = req.body;

  console.log(body)

  const {  code, name } = body;

  const i = Math.ceil(Math.random() * 10000);
  roleAdminDataSource.unshift({
    key: i,
    code,
    name,
  });

  const result = {
    list: roleAdminDataSource,
    pagination: {
      total: roleAdminDataSource.length,
    },
  };

  return res.json(result);
}

function getRole(req,res){
  console.log(req.body);
  const { code, name } = req.body;
  console.log(code);
  console.log(name);
  let arr = [];
  if(code || name) {
    if (code) {
      arr = roleAdminDataSource.filter(value => value.code === code)
    }
    if (name) {
      arr = roleAdminDataSource.filter(value => value.name === name)
    }
    const result = {
      list: arr,
      pagination: {
        total: arr.length,
      },
    };
    console.log(result)
    return res.json(result);
  }
}

export default {
  'GET /api/role': getRoles,
 /* 'POST /api/role': postRole,
  'GET /api/rolefortable': getRoleForTable,*/
  'POST /rest/sm/role/delete': deleteRole,
  'POST /rest/sm/role/update': updateRole,
  'POST /rest/sm/role/save': addRole,
  'POST /rest/sm/role/find': getRole,
};

