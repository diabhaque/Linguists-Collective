import moment from 'moment'
import React, { useContext, useState }  from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Select, DatePicker, Button, Spin, InputNumber } from "antd"
import CurrentUserContext from '../../context/current-user.context'
import { LANGUAGES, ASSOCIATE_TYPES, CURRENCIES } from '../../utils/utilityLists'
import getClient from '../../utils/getClient'
import { createJob } from '../../utils/operations'

const { Option } = Select;
const { TextArea } = Input

const languageOptions =LANGUAGES.map((language)=><Option key ={language.name} value={language.name}>{`${language.name}, ${language.nativeName}`}</Option>)
const associateTypeOptions=ASSOCIATE_TYPES.map((associateType)=><Option key ={associateType} value={associateType}>{associateType}</Option>)
const currencyOptions =CURRENCIES.map((currency)=><Option key ={currency.code} value={currency.code}>{`${currency.code}, ${currency.name}`}</Option>)

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 6
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 6
    }
  }
};

const PostJobPage = ( { history } ) => {
    const [loading, setLoading]=useState(false)
    const [error, setError]= useState(false)
    const [currentUser, setCurrentUser] =useContext(CurrentUserContext)
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true)
        const client = getClient(currentUser.token)

        const variables={
            data:{
                title: values.title,
                description: values.description,
                languages: values.languages,
                associateType: values.associateType,
                date: values.date.format('MMMM Do YYYY, h:mm:ss a'),
                location: values.location,
                currency: values.currency,
                bill: values.bill
            }
        }

        console.log(variables.data)
    
        client.mutate({
          mutation: createJob,
          variables
        }).then(({ data })=>{
            if(data.createJob.id){
                history.push(`/job/${data.createJob.id}`)
            }
            setLoading(false)
        })
      };    
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const disabledDate=(current)=>{
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    return (
        <>
            <h1>Post a Job</h1>
            <br/>
            {
                !currentUser.token?(
                    <>
                        You have to sign in to post a Job
                        <br/>
                        Sign in <Link to='/signin'>here</Link>
                    </>
                ):(
                    <>
                    <Form
                    {...formItemLayout}
                    // layout="vertical"
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                    >
                        <Form.Item
                            name="title"
                            label="Job Title"
                            validateTrigger="onBlur"
                            rules={[
                            {
                                required: true,
                                message: "Please include the title of the job"
                            }
                            ]}
                        >
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item 
                            name="description" 
                            label="Job Description"
                            validateTrigger="onBlur"
                            rules={[
                            {
                                required: true,
                                message: "Please include a description of the job"
                            }
                            ]}
                        >
                            <TextArea placeholder="Details of the job"/>
                        </Form.Item>
                        <Form.Item
                            name="languages"
                            label="Languages Reguired"
                            validateTrigger="onBlur"
                            rules={[
                            {
                                required: true,
                                message: 'Please select the languages required', 
                                type: 'array'
                            },
                            ]}
                        >
                            <Select mode="multiple" placeholder="Languages required for the task">
                                {languageOptions}
                            </Select>

                        </Form.Item>
                        <Form.Item
                            name="associateType"
                            label="Linguist Category"
                            validateTrigger="onBlur"
                            rules={[
                            {
                                required: true,
                                message: 'Please select the category of linguist required',
                            },
                            ]}
                        >
                            <Select
                            placeholder="Linguist Category"
                            allowClear
                            >
                                {associateTypeOptions}
                            </Select>

                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Meeting Date and Time"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select',
                                }
                            ]}
                        >
                            <DatePicker 
                                disabledDate={disabledDate}
                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            />
                        </Form.Item>    
                        <Form.Item 
                            name="location" 
                            label="Meeting Point/Address"
                            validateTrigger="onBlur"
                            rules={[
                            {
                                required: true,
                                message: "Please enter the location of the meeting point"
                            }
                            ]}
                        >
                            <TextArea placeholder="Where do you need them to show up?"/>
                        </Form.Item>
                        <Form.Item
                            name="currency"
                            label="Currency"
                            rules={[
                            {
                                required: true,
                                message: 'Please select a currency',
                            },
                            ]}
                        >
                            <Select
                            placeholder="Currency"
                            allowClear
                            >
                                {currencyOptions}
                            </Select>

                        </Form.Item>

                        <Form.Item
                            name="bill"
                            label="Payment Amount"
                            rules={[
                            {
                                required: true,
                                message: 'Please input the payment amount',
                            },
                            ]}
                        >
                        <InputNumber placeholder="100"/>

                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            {
                            loading?(
                                <Spin/>
                                ):(
                                <Button type="primary" htmlType="submit">
                                    Post Job
                                </Button>
                                )
                            }
                        </Form.Item>

                    </Form>
                    </>
                )
            }
        </>
    )
}

export default PostJobPage