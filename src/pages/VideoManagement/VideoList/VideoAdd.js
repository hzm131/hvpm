import React, { PureComponent } from 'react';
import { connect } from 'dva';
import axiosApi from "../../../services/axios";
import { formatMessage, FormattedMessage } from 'umi/locale';
import storage from '@/utils/storage'
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Row,
  Icon,
  Col,
  AutoComplete,
  Upload,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './style.less';
function onSelect(value) {
  console.log('onSelect', value);
}
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

@connect(({PA,loading }) => ({
  PA,
  submitting: loading.effects['PA/submitRegularForm'],
}))
@Form.create()
class ProjectAddForms extends PureComponent {
  state ={
    type:'',
    payload: "",
    token:null,
  }
  pmdatasource = ['anne', 'jack', 'jone'];
  validate = e => {
    const { dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log('0000000000',values)
      const formData = new FormData();
      values.attachment.fileList.map(item => {
        formData.append('file', item);
      });
      dispatch({
        type: 'PA/uploadFile',
        payload: formData,
      });
    });
  };
  componentDidMount() {
    const { dispatch } = this.props;
    // this.getMock();
    const aa = storage.get("token");
    this.setState({token:aa})
    console.log('stor',aa)
  }

  render() {
    const {formManage, submitting } = this.props;
    const { token } = this.state;
    const props = {
      name: 'file',
      action: '/upload/image',
      onChange(info) {
        const { status } = info.file;
        let fileList = [...info.fileList];
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {

          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card title="新增视频">
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='电影名称'>
                {getFieldDecorator('moviename',{
                  rules: [{required: true}]
                })(<Input placeholder="请输入电影名称" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='电影语种'>
                {getFieldDecorator('movielang',{
                  rules: [
                    {
                      required: true,
                      message:'请选择语种类型'
                    }
                  ]
                })(
                  <Select placeholder="请选择语种类型" style={{ width: '100%' }}>
                    <Option value="chinese">中文</Option>
                    <Option value="english">英文</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='电影时长'>
                {getFieldDecorator('movietime', {
                  rules: [
                    {
                      required: true,
                      message:'请输入电影时长'
                    }
                  ]
                })(<Input placeholder="请输入电影时长"  />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='电影评分'>
                {getFieldDecorator('moviemark',{
                  rules: [
                    {
                      required: true,
                      message:'请输入电影评分'
                    }
                  ]
                })(
                  <Input placeholder="请输入电影评分" type='number'/>
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='电影类别'>
                {getFieldDecorator('movieclass',{
                  rules: [{required: true}]
                })(
                  <Select placeholder="请选择电影类别" style={{ width: '100%' }}>
                    <Option value="action">动作片</Option>
                    <Option value="comedy">喜剧片</Option>
                    <Option value="terror">恐怖片</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='电影简介'>
                {getFieldDecorator('moviememo',{
                  rules: [
                    {
                      required: true,
                      message:'请输入电影简介'
                    }
                  ]
                })(
                  <Input placeholder="请输入电影简介" type='number'/>
                )}
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={24}>
              <FormItem {...formItemLayout} label="上传文件">
                {getFieldDecorator('attachment')(
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit from uploading company
                      data or other band files
                    </p>
                  </Dragger>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16} style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
            <Col style={{marginLeft:'12px'}}>
              <Button type="primary" onClick={this.validate}>提交</Button>
            </Col>
            <Col style={{marginLeft:'12px'}}>
              <Button >取消</Button>
            </Col>
          </Row>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default ProjectAddForms;
