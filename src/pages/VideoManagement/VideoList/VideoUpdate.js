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
import router from 'umi/router';
const { TextArea } = Input;
const { Option } = Select;

@connect(({PA,loading }) => ({
  PA,
  submitting: loading.effects['PA/submitRegularForm'],
}))
@Form.create()
class VideoUpdate extends PureComponent {
  state ={
    strToken:"",
    imgId:null,
    imageList:0,
  };

  validate = e => {
    const { dispatch, form} = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      /*if(!values.name || !values.origin || !values.duration || !values.language || !values.years || !values.score
        || !values.introduction || !values.category || !this.state.imgId || this.state.videoId
      ){
        message.error('填写完整表单')
        return
      }*/
      const obj = {
        ...values,
        years:values.years.format('YYYY-MM-DD'),
        score:Number(values.score),
        image_src_id:this.state.imgId,
        video_src_id:this.state.videoId,
      }
      delete obj.uploadImage
      delete obj.uploadVideo

      console.log('obj',obj)
      dispatch({
        type:'PA/add',
        payload: obj,
        callback:(res)=>{
          message.success('新建成功',1.5,()=>{
            router.push('/videomanagement/VideoList/list');
          })
        }
      })
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


  render() {

    const {
      form: { getFieldDecorator },
      dispatch
    } = this.props;

    let that = this;

    const props = {
      name: 'file',
      accept:"image/*",
      multiple: false,
      action: '/wookong/upload/image',
      listType:'picture',
      headers: {
        authorization: this.state.strToken,
      },
      onChange(info) {
        console.log('info',info)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
          if(info.file.response.status === 200){
            message.success(`${info.file.name} 封面上传成功`,1,()=>{
              that.setState({
                imgId:info.file.response.data,
                imageList:info.fileList
              })
            });
          }
        } else if (info.file.status === 'error'){
          message.error(`${info.file.name} 封面上传失败`,1,()=>{
            router.push('/user/login')
          });
        }

      },
      onRemove: file => {
        dispatch({
          type:'PA/removeImg',
          payload:{
            id:file.response.data
          }
        })

      },
    };
    const propsVideo = {
      name: 'file',
      accept:"video/*",
      action: '/wookong/upload/video',
      headers: {
        authorization: this.state.strToken,
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if(info.file.response.status === 200){
            message.success(`${info.file.name} 视频上传成功`,1,()=>{
              that.setState({
                videoId:info.file.response.data,
              })
            });
          }
        } else if (info.file.status === 'error'){
          message.error(`${info.file.name} 视频上传失败`,1,()=>{
            router.push('/user/login')
          });
        }
      },
    };

    return (
      <PageHeaderWrapper>
        <Card title="新增视频">
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24} >
              <Form.Item label='视频名称'>
                {getFieldDecorator('name',{
                  rules: [{required: true,message:'视频名称'}]
                })(<Input placeholder="请输入电影名称" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='产地'>
                {getFieldDecorator('origin',{
                  rules: [{required: true,message:'产地'}]
                })(
                  <Input placeholder="请输入产地" />
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='片长(分钟)'>
                {getFieldDecorator('duration', {
                  rules: [{required: true,message:'片长(分钟)'}]
                })(<Input placeholder="请输入视频片长"  />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='语种'>
                {getFieldDecorator('language',{
                  rules: [{required: true,message:'语种'}]
                })(
                  <Input placeholder="请输入语种"/>
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='年份'>
                {getFieldDecorator('years',{
                  rules: [{required: true,message:'年份'}]
                })(
                  <DatePicker  placeholder="请选择年份" style={{ width: '100%' }}/>
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='评分'>
                {getFieldDecorator('score',{
                  rules: [{required: true,message:'评分'}]
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
                  rules: [{required: true,message:'类别'}]
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
                  rules: [{required: true,message:'视频简介'}]
                })(
                  <TextArea rows={4} placeholder="请输入视频简介"/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='上传封面'>
                {getFieldDecorator('uploadImage',{
                  rules: [{required: true,message:'上传封面'}]
                })(
                  <Upload {...props}>
                    {
                      this.state.imageList.length>0?'':<Button>
                        <Icon type="upload" />上传封面
                      </Button>
                    }

                  </Upload>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='上传视频'>
                {getFieldDecorator('uploadVideo',{
                  rules: [{required: true,message:'上传视频'}]
                })(
                  <Upload {...propsVideo}>
                    <Button>
                      <Icon type="upload" />上传视频
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

export default VideoUpdate;
