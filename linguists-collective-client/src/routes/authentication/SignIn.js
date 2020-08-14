import React, { useContext, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import client from '../../apollo';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { login } from '../../utils/operations';
import CurrentUserContext from '../../context/current-user.context'
import { useMutation} from '@apollo/react-hooks'


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

const SignIn = (props) => {
  const [loading, setLoading]=useState(false)
  const [error, setError]= useState(false)
  const { history }=props
  const [currentUser, setCurrentUser] =useContext(CurrentUserContext)
 
  const onFinish = async (values) => {
    setLoading(true)
    const variables ={
      data:{
          email: values.email,
          password: values.password
      }
    } 
    client.mutate({
      mutation: login,
      variables
    }).then(({data})=>{
      const userDetails={
        token: data.loginUser.token,
        userId: data.loginUser.user.id
      }

      setLoading(false)
      setCurrentUser(userDetails)

      localStorage.setItem('user', JSON.stringify(userDetails))

      if(data.loginUser.token){
        history.push(`/profile/${data.loginUser.user.id}`)

      }
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
      <>
        <h1>Sign In Form</h1>
        <br/>
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
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
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Link to='/'>Forgot Password?</Link>
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                {
                  loading?(
                    <Spin/>
                    ):(
                      <Button type="primary" htmlType="submit">
                        Sign In
                      </Button>
                    )
                }
                <br/>
                <br/>
                Dont have an account? <Link to='/signup'>Sign Up</Link>
            </Form.Item>
        </Form>
      </>
    
  );
};
export default withRouter(SignIn)