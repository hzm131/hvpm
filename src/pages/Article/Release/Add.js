import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Card,
  message
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

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
          message.error(res.error);
          param.error({
            msg: res.error
          })
        }
      }
    })
  };

  render() {
    const { editorState } = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          <div className="my-component">
            <BraftEditor
              value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
              media={{ uploadFn: this.uploadFn }}
            />
          </div>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default Add;
