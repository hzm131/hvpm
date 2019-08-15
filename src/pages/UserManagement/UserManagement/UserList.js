import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ UL, loading }) => ({
  UL,
  loading: loading.models.UL,
}))
@Form.create()

class UserList extends PureComponent {

  render() {

    return (
      <PageHeaderWrapper>
        用户管理
      </PageHeaderWrapper>
    );
  }
}

export default UserList;
