import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import storage from '@/utils/storage'
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Row,
  Icon,
  Col,
  Upload,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { TextArea } = Input;
const { Option } = Select;

@connect(({PA,loading }) => ({
  PA,
  submitting: loading.effects['PA/submitRegularForm'],
}))
@Form.create()
class ProjectAddForms extends PureComponent {
  state ={
    strToken:"",
  };

  validate = e => {
    const { dispatch, form} = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log("values",values);
      const { uploadVideo } = values;
      const formData = new FormData();
      uploadVideo.fileList.map(item => {
        formData.append('file', item);
      });
      dispatch({
        type: 'PA/uploadFile',
        payload: formData,
      });
    });
  };

  componentDidMount() {
    const token = storage.get("token");
    if(token){
      const strToken = `token  ${token}`;
      this.setState({
        strToken
      })
    }
  }

  props = {
    name: 'file',
    action: 'http://192.168.2.219:3000/upload/video',
    headers: {
      authorization: this.state.strToken,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  render() {

    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Card title="新增视频">
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24} >
              <Form.Item label='视频名称'>
                {getFieldDecorator('name',{
                  rules: [{required: true}]
                })(<Input placeholder="请输入电影名称" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='产地'>
                {getFieldDecorator('origin',{
                })(
                  <Input placeholder="请输入产地" />
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='片长(分钟)'>
                {getFieldDecorator('duration', {
                })(<Input placeholder="请输入视频片长"  />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='语种'>
                {getFieldDecorator('language',{
                })(
                  <Input placeholder="请输入语种"/>
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='年份'>
                {getFieldDecorator('years',{
                })(
                  <DatePicker  placeholder="请选择年份" style={{ width: '100%' }}/>
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='评分'>
                {getFieldDecorator('score',{
                })(
                  <Input placeholder="请输入评分" type="Number"/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='类别'>
                {getFieldDecorator('category',{
                })(
                  <Select placeholder="请选择类型"style={{ width: '100%' }}>
                    <Option value="恐怖片">恐怖片</Option>
                    <Option value="喜剧片">喜剧片</Option>
                    <Option value="动作片">动作片</Option>
                    <Option value="科幻片">科幻片</Option>
                    <Option value="漫改">漫改</Option>
                    <Option value="原创">原创</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='视频简介'>
                {getFieldDecorator('introduction',{
                })(
                  <TextArea rows={4} placeholder="请输入视频简介"/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='上传视频'>
                {getFieldDecorator('uploadVideo',{
                })(
                  <Upload {...this.props}>
                    <Button>
                      <Icon type="upload" /> 上传视频
                    </Button>
                  </Upload>
                )}
              </Form.Item>
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
