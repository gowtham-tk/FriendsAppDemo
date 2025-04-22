import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Typography, Button, Form, Input, Alert } from "antd";

const { Text } = Typography;

export default function Register(){

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await axios.post('http://localhost:3000/users', {
                email : values.email,
                password : values.password
            }) 
            
            localStorage.setItem('user', JSON.stringify(response.data));

            setSuccess(true);
            setError('');
            console.log(response.data);
            navigate("/");
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setSuccess(false);
        }

    };
      
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
    <div className="min-h-screen" style={{ textAlign: 'center', margin: '20px 0', alignItems: 'center'  }}>
        {success && <Alert message="Registration Successful!" type="success" showIcon></Alert>}
        {error && <Alert message="UnSuccessful Registration!" type="error" showIcon></Alert>}

        <div style={{ margin: "20px 20px"}}>
            <Text strong style={{ fontSize: '20px', color: '#1890ff' }}>Registration Page</Text>
        </div>
        <br></br>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} style={{ alignItems: 'center' }} initialValues={{ remember: true }}
                onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"> 
                
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
                
        </Form>
    </div>
    )
}