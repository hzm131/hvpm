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
const data = [
  {
    key: '1',
    predict: '20',
    process: '40',
    people: 'Allay',
    data: '了肯',
    class:'测试部',
    aa:'未完成'
  },
  {
    key: '2',
    predict: '40',
    process: '70',
    people: 'Allay',
    data: '2019-2-22',
    class:'测试部',
    aa:'完成'
  },
]
const FormItem = Form.Item;
const mockData = [];
const handleCorpAdd = () => {
  console.log('----')
  router.push('/videomanagement/VideoList/add');
};
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const oriTargetKeys = mockData
// .filter(item => +item.key % 3 > 1)
// .map(item => item.key);
@connect(({ PA, loading }) => ({
  PA,
  loading: loading.models.PA,
}))
@Form.create()

class VideoLists extends PureComponent {
  state = {
    initData:null,
  };

  columns = [
    {
      title: '文件名称',
      dataIndex: 'name',

    },
    {
      title: '创建时间',
      dataIndex: 'CreatedAt',
      render:(text)=>{
        const aa = text.substring(0,10)
        return aa
      }
    },
    {
      title: '更新时间',
      dataIndex: 'UpdatedAt',
      render:(text)=>{
        const time = text.substring(0,10)
        return time
      }

    },
    {
      title: formatMessage({ id: 'validation.operation' }),
      render: (text, record) => (
        <Fragment>
          <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record)}>
            <a href="javascript:;" style={{color:'#ff2340'}}>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <span style={{color:'#1890ff'}}>详情</span>

        </Fragment>
      ),
    },
  ];
  //点击删除
  handleDelete = (record)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'fundproject/remove',
      payload:{
        projectid: record.id
      }
    })
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // this.getMock();
    //从缓存取公司id
    dispatch({
      type:'PA/fetch',
    })
  }
  findList = (e) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      const conditions = [];
      const {name } = values
      if(name){
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
    const { dispatch } = this.props;
    dispatch({
      type:'PA/fetch',
    })
  }
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

              <Button icon="plus" onClick={handleCorpAdd} type="primary" style={{ marginLeft: 15 }}>
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
    console.log('---',initData)
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
