import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';



@Form.create()
class Update extends PureComponent {


  render() {

    return (
      <PageHeaderWrapper>
        Update
      </PageHeaderWrapper>
    );
  }
}

export default Update;
