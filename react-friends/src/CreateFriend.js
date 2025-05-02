import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { DatePicker } from "antd";
import axios from "axios";
import "./CreateFriend.css";
import dayjs from "dayjs";

export default function CreateFriend({ onFriendAdded, friend, onSuccess }){


    const [form] = Form.useForm();

    useEffect(() => {
      if (friend) {
        form.setFieldsValue({
          firstname: friend.first_name || '',
          lastname: friend.last_name || '',
          email: friend.email || '',
          phone: friend.phone || '',
          dob: friend.dob ? dayjs(new Date(friend.dob)) : null,
        });
      } else {
        form.resetFields();
      }
    }, [friend, form]);

      const onFinish = async (values) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          //console.log(parsedUser.user.id)
      
          try {

            if(friend) {
              //console.log(values.dob);
              await axios.put(`http://localhost:3001/friends/${friend.id}`,{
                friend: {
                  ...values,
                  first_name: values.firstname,
                  last_name: values.lastname,
                  dob: values.dob.format("YYYY-MM-DD")
                } 
              },{
                headers: {
                  Authorization: `Bearer ${parsedUser.token}`,
                }
              }
              )
              onFriendAdded();
            } else {
              //console.log(values.dob);
              const response = await axios.post("http://localhost:3001/friends", {
                friend: {
                  first_name: values.firstname,
                  last_name: values.lastname,
                  dob: values.dob.format("YYYY-MM-DD"),
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
            }
            onSuccess();
          } catch (error) {
            console.log("Error creating friend:", error);
          }
        }
      };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="center-div">
            <Form form={form} name="basic" labelCol={{ span: 8}} wrapperCol={{ span: 16 }} style={{ maxWidth: 600}}
                onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="on">

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
                        {friend ? "Update Friend" : "Create Friend"}
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}