import React from "react";
import { Form, Input, Space, Button } from "antd";
import { DatePicker } from "antd";
import axios from "axios";

export default function CreateFriend({ onFriendAdded }){
    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };

      const onFinish = async (values) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          //console.log(parsedUser.user.id)
      
          try {
            const response = await axios.post("http://localhost:3000/friends", {
              friend: {
                first_name: values.firstname,
                last_name: values.lastname,
                dob: values.dob,
                phone: values.phone,
                email: values.email,
                wished: false,
                user_id: parsedUser.user.id
              }
            }, {
              headers: {
                Authorization: `Bearer ${parsedUser.token}`
              }
            });
      
            console.log("Friend added successfully");
            onFriendAdded(response.data);
          } catch (error) {
            console.log("Error creating friend:", error);
          }
        }
      };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form name="basic" labelCol={{ span: 8}} wrapperCol={{ span: 16 }} style={{ maxWidth: 600}}
                initialValues={{ remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="on">

                <Form.Item label="First Name" name="firstname">
                    <Input/>
                </Form.Item>
                <Form.Item label="Last Name" name="lastname">
                    <Input/>
                </Form.Item>  
                <Form.Item label="Email" name="email">
                    <Input/>
                </Form.Item> 
                <Form.Item label="Phone" name="phone">
                    <Input/>
                </Form.Item> 
                <Form.Item label="Date of Birth" name="dob"  rules={[{ required: true, message: 'Please select DOB' }]}>
                    <DatePicker />
                </Form.Item> 
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}