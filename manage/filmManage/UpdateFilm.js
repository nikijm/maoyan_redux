import React from "react";
import {ajax} from "../../common/tools";

import { Form, Input, Tooltip, Icon, Cascader, Radio,Upload,Select, Row, Col, Checkbox, Button ,Card , Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class UpdateFilm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			visible:false,
			indexImgList:[],
			indexImgPath:[]
		}
	}
	showModal(){
		this.props.showModal()
	}
	handleOk(e){
	var values=this.props.form.getFieldsValue()
	console.log("修改",values)
	values._id=this.props.updatas._id
	values.atlas=JSON.stringify(this.state.indexImgPath)
	console.log("修改",values)
	ajax({
		type:"get",
		url:"/maoyan/update",
		data:values,
		success:function(){
			  Modal.confirm({
			    title: '提示',
			    content: '数据修改成功',
			    okText: '确定',
			    cancelText: '取消'
			  });
			this.props.show()

		}.bind(this)
	})


	this.props.handleOk()
	}

	handleCancel(e){
		this.props.handleCancel()
	}
	render(){

		const props ={
			action:"/upload",
			listType:'picture',
			multiple:true,
			fileList:this.state.indexImgList,
			onChange:function(data){
				console.log(data)
				let fileList=data.fileList;
				let indexPath=fileList.map(function(file){
						return file.response
				})
				this.setState({
					indexImgList:fileList,
					indexImgPath:indexPath
				})
			}.bind(this)

		}
	
		const { getFieldDecorator } = this.props.form;
				const formItemLayout = {
					labelCol: {
						xs: { span: 24 },
						sm: { span: 6 },
					},
					wrapperCol: {
						xs: { span: 24 },
						sm: { span: 14 },
					},
				};

	return <div>
			
			<Modal title="修改" visible={this.props.visible} showModal={this.showModal.bind(this)}
			onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
			>
				<Form >
					<FormItem {...formItemLayout} label={(<span>中文名&nbsp;</span>)}>
						{getFieldDecorator('Cname', {rules: [{ required: true}]})(<Input />)}
					</FormItem>

					<FormItem {...formItemLayout} label={(<span>英文名&nbsp;</span>)}>
						{getFieldDecorator('Ename', {rules: [{ required: true}]})(<Input />)}
					</FormItem>

					<FormItem {...formItemLayout} label={(<span>导演&nbsp;</span>)}>
						{getFieldDecorator('director', {rules: [{ required: true}]})(<Input />)}
					</FormItem>

					<FormItem {...formItemLayout} label={(<span>主演&nbsp;</span>)}>
						{getFieldDecorator('star', {rules: [{ required: true}]})(<Input />)}
					</FormItem>

					<FormItem {...formItemLayout} label={(<span>上映时间&nbsp;</span>)}>
						{getFieldDecorator('time', {rules: [{ required: true}]})(<Input />)}
					</FormItem>

					<FormItem {...formItemLayout} label={(<span>上映地区&nbsp;</span>)}>
						{getFieldDecorator('area', {rules: [{ required: true}]})(<Input />)}
					</FormItem>

					<FormItem {...formItemLayout} label={(<span>电影时长&nbsp;</span>)}>
						{getFieldDecorator('length', {rules: [{ required: true}]})(<Input />)}
					</FormItem>


					<FormItem {...formItemLayout} label={(<span>票价&nbsp;</span>)}>
						{getFieldDecorator('Admission', {rules: [{ required: true}]})(<Input />)}
					</FormItem>


					<FormItem {...formItemLayout} label={(<span>语言&nbsp;</span>)}>
						{getFieldDecorator('language', {rules: [{ required: true}]})(<Input />)}
					</FormItem>


					<FormItem {...formItemLayout} label={(<span>电影详情&nbsp;</span>)}>
						{getFieldDecorator('details', {rules: [{ required: true}]})(<Input />)}
					</FormItem>


					 <FormItem {...formItemLayout}
			        		label = "图集">

		                <Upload {...props}>
		                  <Button>
		                    <Icon type="upload" /> upload
		                  </Button>
		                </Upload>
            		</FormItem>

				</Form>
			</Modal>
		</div>
	}
}

export default Form.create({
mapPropsToFields(props){
	return {
		Cname:{value:props.updatas.Cname},
		Ename:{value:props.updatas.Ename},
		director:{value:props.updatas.director},
		star:{value:props.updatas.star},
		time:{value:props.updatas.time},
		area:{value:props.updatas.area},
		length:{value:props.updatas.length},
		Admission:{value:props.updatas.Admission},
		language:{value:props.updatas.language},
		details:{value:props.updatas.details},
		atlas:{value:props.updatas.atlas}
	}
}
})(UpdateFilm);