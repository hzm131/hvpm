import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import storage from '@/utils/storage'
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Divider,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Modal,
  message,
  Table,
  Popconfirm,
  Transfer,
} from 'antd';
import NormalTable from '@/components/NormalTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from '../../Sysadmin/UserAdmin.less';

const { Option } = Select;
const FormItem = Form.Item;


@connect(({ PA, loading }) => ({
  PA,
  loading: loading.models.PA,
}))
@Form.create()

class VideoLists extends PureComponent {
  state = {
    initData:null,
    conditions:"",
    page:{}
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '产地',
      dataIndex: 'origin',
    },
    {
      title: '片长',
      dataIndex: 'duration',
    },
    {
      title: '语种',
      dataIndex: 'language',
    },
    {
      title: '年份',
      dataIndex: 'years',
    },
    {
      title: '评分',
      dataIndex: 'score',
    },
    {
      title: '类别',
      dataIndex: 'category',
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
  //点击删除
  handleDelete = (record)=>{
    console.log("record",record);
    const { dispatch } = this.props;
    dispatch({
      type: 'PA/remove',
      payload:{
        videoId: record.id
      }
    })
  };

  handleCorpAdd = () => {
    router.push('/videomanagement/VideoList/add');
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // this.getMock();
    //从缓存取公司id
    dispatch({
      type:'PA/fetch',
      payload:{
        limit:10,
        offset:0
      }
    })
  }

  handleStandardTableChange = (pagination)=>{
    const { dispatch } = this.props;
    const { conditions} = this.state;
    const obj = {
      offset: (pagination.current-1)*pagination.pageSize,
      limit: pagination.pageSize,
    };
    console.log("obj",obj);
    if(conditions){
      const param = {
        ...obj,
        conditions
      };
      dispatch({
        type:'PA/fetch',
        payload: param,
      });
      return
    }
    dispatch({
      type:'PA/fetch',
      payload: obj,
    });
    this.setState({
      page:obj
    });
  };

  findList = (e) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      const { name } = values;
      if(name){
        this.setState({
          conditions:name
        });
        dispatch({
          type:'PA/search',
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
      type:'PA/fetch',
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
        <Row>
          <Col md={8} sm={24}>
            <span>

              <Button icon="plus" onClick={this.handleCorpAdd} type="primary" style={{ marginLeft: 15 }}>
               新建
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      loading,
      PA:{ data }
    } = this.props;
    const {  initData } = this.state;

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
      </PageHeaderWrapper>
    );
  }
}

export default VideoLists;
