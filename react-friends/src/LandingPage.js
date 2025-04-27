import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button, Table} from "antd";
import {Typography} from "antd";
import axios from "axios";

import CreateFriend from "./CreateFriend";

const { Text } = Typography;

export default function LandingPage(){
    const [user, setUser] = useState('');
    const [friends, setFriends] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    const columns = [
        { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
        { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
        { title: 'Wished', dataIndex: 'wished', key: 'wished', render: (value, record) => (
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => toggleWished(record)}
            >
              {value ? '✅ Yes' : '❌ No'}
            </span>
          ) },
        { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
        { title: 'Delete', dataIndex: 'delete', key: 'delete', render: (text, record) => 
            (
            <Button type="link" danger onClick={() => handleDelete(record.id)}>
                Delete
              </Button>
            ),
        },
      ];

    const toggleWished = async (friend) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const updateWished = !friend.wished;

        try{
            await axios.patch(
                `http://localhost:3001/friends/${friend.id}`,
                {
                  friend: { wished: updateWished }
                },
                {
                  headers: {
                    Authorization: `Bearer ${storedUser.token}`,
                  }
                }
              );
            setFriends(prev => 
                prev.map(f => f.id === friend.id ? { ...f, wished: updateWished} : f)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            try{
                await axios.delete(`http://localhost:3001/friends/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${parsedUser.token}`,
                          },
                    }
                );
                console.log("Deleted !");
                setFriends(prev => prev.filter(friend => friend.id !== id));
            } catch (error) {
                console.log(error);
            }
        };
    };

    const handleFriendAdded = (newFriend) => {
        setFriends(prev => {
            const updateFriends = [...prev, newFriend];
            //return updateFriends.sort((a, b) => a.firstname.localeCompare(b.firstname));
            return updateFriends;
        });
    };


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser).token);
            //const token = user.token;
            const fetchFriends = async () => {
                try {
                    const friendsResponse = await axios.get("http://localhost:3001/friends",{
                        headers : {
                            Authorization : `Bearer ${JSON.parse(storedUser).token}`,
                        },
                    });
                    setFriends(friendsResponse.data);
                    console.log(friendsResponse.data);
                } catch (error) {
                    console.log("Error fetch", error);
                }
            };

            fetchFriends();
        }
    }, []);

    function signout() {
        localStorage.setItem('user', '');
        navigate("/login");
    }

    return (
        <div className="min-h-screen">
            <Text>Landing Page</Text>
            { user ? (
                <div>
                    <h2>Hello {user.user.email} </h2>
                    <Button type="primary" danger onClick={signout}>Signout</Button>
                    <Button type="primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Hide Create Friend' : 'Create Friend'}
                    </Button>
                    {showForm && <CreateFriend onFriendAdded={handleFriendAdded}/>}
                    <Table columns={columns} dataSource={friends} rowKey="id" />
                </div>
            ) : (
                <div>
                    <h2>Login/Register to Continue</h2>
                    <Link to="/login">
                        <Button type="primary" >Login</Button>
                    </Link>
                </div>
            )}

        </div>

    );
}