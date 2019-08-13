import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';



@Form.create()
class Home extends PureComponent {


  render() {

    return (
      <PageHeaderWrapper>
        首页
      </PageHeaderWrapper>
    );
  }
}

export default Home;
