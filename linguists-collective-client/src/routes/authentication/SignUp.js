import React, { useContext, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Select, Checkbox, Button, Spin} from "antd"
import client from '../../apollo';
import { createUser } from '../../utils/operations';
import CurrentUserContext from '../../context/current-user.context'
import { COUNTRY_CODES } from '../../utils/utilityLists'


const { Option } = Select;
const countryCodeOptions = COUNTRY_CODES.map((code)=><Option key ={code} value={code}>{code}</Option>)

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

const SignUp = ({history}) => {
  const [loading, setLoading]=useState(false)
  const [error, setError]= useState(false)
  const [currentUser, setCurrentUser] =useContext(CurrentUserContext)
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true)
    const variables={
      data:{
        name: values.otherNames + " " + values.surname,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber
      }
    }

    client.mutate({
      mutation: createUser,
      variables
    }).then(({ data })=>{
      const userDetails={
        token: data.createUser.token,
        userId: data.createUser.user.id
      }

      setLoading(false)
      setCurrentUser(userDetails)
  
      localStorage.setItem('user', JSON.stringify(userDetails))
      
      if(data.createUser.token){
        history.push(`/profile/${data.createUser.user.id}`)
      }
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 80
        }}
      >
        {countryCodeOptions}
      </Select>
    </Form.Item>
  );

  return (
    <>
        <h1> Sign Up Form</h1>
        <br/>
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
        >
        <Form.Item
            name="surname"
            label="Surname"
            validateTrigger="onBlur"
            rules={[
            {
                required: true,
                message: "Please input your Surname!"
            }
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="otherNames"
            label="Other Names"
            validateTrigger="onBlur"
            rules={[
            {
                required: true,
                message: "Please input your Other Names!"
            }
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="email"
            label="E-mail"
            validateTrigger="onBlur"
            rules={[
            {
                type: "email",
                message: "The input is not valid E-mail!"
            },
            {
                required: true,
                message: "Please input your E-mail!"
            }
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="password"
            label="Password"
            validateTrigger="onBlur"
            rules={[
            {
                min: 8,
                required: true,
                message: "Your password must be 8 characters or longer!"
            }
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            validateTrigger="onBlur"
            hasFeedback
            rules={[
            {
                required: true,
                message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                }

                return Promise.reject(
                    "The two passwords that you entered do not match!"
                );
                }
            })
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="phoneNumber"
            label="Phone Number"
            validateTrigger="onBlur"
            rules={[
            {
                required: true,
                message: "Please input your phone number!"
            }
            ]}
        >
            <Input
            addonBefore={prefixSelector}
            style={{
                width: "100%"
            }}
            />
        </Form.Item>

        <Form.Item
            name="agreement"
            valuePropName="checked"
            validateTrigger="onBlur"
            rules={[
            {
                validator: (_, value) =>
                value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement")
            }
            ]}
            {...tailFormItemLayout}
        >
            <Checkbox>
            I have read the <a href="">agreement</a>
            </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            {
              loading?(
                <Spin/>
                ):(
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                )
            }
            <br/>
            <br/>
            Already have an account? <Link to='/signin'>Sign In</Link>
        </Form.Item>
        </Form>
    </>
  );
};

export default withRouter(SignUp)