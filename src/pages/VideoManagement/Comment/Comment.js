import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import storage from '@/utils/storage'
import {
  Form,
  Input,
  Divider,
  Button,
  Card,
  Row,
  Col,
  Popconfirm,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from '@/pages/Sysadmin/UserAdmin.less';
import NormalTable from '@/components/NormalTable';

const FormItem = Form.Item;

@connect(({CM,loading }) => ({
  CM,
  submitting: loading.effects.CM,
}))
@Form.create()
class Comment extends PureComponent {
  state ={

  };

  columns = [
    {
      title: '视频名称',
      dataIndex: 'video',
      render:(text)=>text.name
    },
    {
      title: '评论人员',
      dataIndex: 'general_user',
      render:(text)=> text.username
    },
    {
      title: '评论内容',
      dataIndex: 'content',
    },
    {
      title: formatMessage({ id: 'validation.operation' }),
      render: (text, record) => (
        <Fragment>
          <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record)}>
            <a href="#javascript:;" style={{color:'#ff2340'}}>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <span style={{color:'#1890ff'}}>详情</span>

        </Fragment>
      ),
    },
  ];

  columns2 = [
    {
      title: '回复用户',
      dataIndex: 'username',
      //render:(text)=>text.name
    },
    {
      title: '回复者',
      dataIndex: '',
      //render:(text)=> text.username
    },
    {
      title: '评论内容',
      dataIndex: 'content',
    },
    {
      title: formatMessage({ id: 'validation.operation' }),
      render: (text, record) => (
        <Fragment>
          <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record)}>
            <a href="#javascript:;" style={{color:'#ff2340'}}>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <span style={{color:'#1890ff'}}>详情</span>

        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type:'CM/fetch',
      payload:{
        limit:10,
        offset:0
      }
    })
  }

  findList = (e) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      const { name } = values;
      if(name){
        this.setState({
          conditions:name
        });
        dispatch({
          type:'CM/fetch',
          payload: {
            limit:10,
            offset:0,
            condition:name,
          },
        })
      }
    })
  };

  handleSearch =()=>{
    const { dispatch,form } = this.props;
    const { page } = this.state;
    this.setState({
      conditions:""
    });
    form.resetFields();
    dispatch({
      type:'CM/fetch',
      payload:{
        ...page
      }
    })
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.findList} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={16}>
            <FormItem label=''>
              {getFieldDecorator('name')(<Input placeholder='' />)}
            </FormItem>
          </Col>
          <Col md={8} sm={16}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleSearch}>
              取消
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {

    const {
      form: { getFieldDecorator },
      CM:{data},
      loading
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.userAdmin}>
            <div className={styles.userAdminForm}>{this.renderForm()}</div>
              <div className={styles.userAdminOperator}>
            </div>
            <NormalTable
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Card bordered={false}>
          <div className={styles.userAdmin}>
            <NormalTable
              loading={loading}
              data={data}
              columns={this.columns2}
              //onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Comment;
