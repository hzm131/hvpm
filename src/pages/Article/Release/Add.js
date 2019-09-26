import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Card,
  message,
  Button,
  Row,
  Col,
  Input,
  Upload,
  Icon,
  Divider
} from 'antd';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import router from 'umi/router';

const { TextArea } = Input;

@connect(({ release, loading }) => ({
  release,
  loading: loading.models.release,
}))
@Form.create()
class Add extends PureComponent {

  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null)
  }

  async componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
    //const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    /*this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    })*/
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    const result = await saveEditorContent(htmlContent)
  }

  handleEditorChange = (editorState) => {
    console.log("输出",editorState.toHTML())
    this.setState({ editorState })
  }

  uploadFn = (param) => {
    console.log("param",param)
    const formData = new FormData();
    formData.append('image', param.file);
    const { dispatch } = this.props;
    dispatch({
      type:'release/uploadFileImage',
      payload:formData,
      callback:(res)=>{
        if(res.status === 200){
          const { id,src,title } = res.data;
          param.success({
            url: src,
            meta: {
              id,
              title,
              alt: title,
              //loop: true, // 指定音视频是否循环播放
              //autoPlay: true, // 指定音视频是否自动播放
              //controls: true, // 指定音视频是否显示控制栏
              //poster: 'http://xxx/xx.png', // 指定视频播放器的封面
            }
          })
        }else{
          message.error(res.data);
          param.error({
            msg: res.data
          })
        }
      }
    })
  };

  myValidateFn = (file) => {
    return new Promise((resolve, reject) => {
      if(file.size < 1024 * 100 * 500){
        resolve()
      }else{
        reject()
      }
    })
  };

  backClick =()=>{
    router.push('/article/release/list')
  };

  render() {
    const {
      form: { getFieldDecorator },
      dispatch,
      loading
    } = this.props;
    const { editorState } = this.state;

    const fileList = [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ];

    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      listType: 'picture',
      defaultFileList: [...fileList],
    };


    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <Col lg={24} md={24} sm={24}>
              <Form.Item label="设置标题">
                {getFieldDecorator('title',{
                  rules: [{required: true,message:'标题必须有'}],
                })(<TextArea  maxlength={'40'} placeholder="限制40字以内" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row className="my-component" style={{marginTop:'20px'}}>
            <Form.Item label="主题内容">
              {getFieldDecorator('content',{
              rules: [{required: true,message:'内容不能为空'}],
              initialValue:editorState
            })(<BraftEditor
              //value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
              media={{
                uploadFn: this.uploadFn,
                validateFn: this.myValidateFn,
                accepts:{
                  image: 'image/jpeg,image/gif,image/webp,image/apng,image/svg',
                  video: 'video/mp4',
                  audio: 'audio/mp3'
                }
              }}
            />)}
            </Form.Item>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col lg={16} md={16} sm={16}>
              <Form.Item label="设置主题图片">
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <FooterToolbar >
          <Button
            onClick={this.backClick}
          >
            取消
          </Button>
          <Button type="primary"
                  onClick={()=>this.validate()}
          >
            提交
          </Button>

        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default Add;
