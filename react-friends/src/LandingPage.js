import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button} from "antd";
import {Typography} from "antd";
import axios from "axios";
import Tables from "./Tables";
import "./LandingPage.css";

import CreateFriend from "./CreateFriend";

const { Text } = Typography;

export default function LandingPage(){
    const [user, setUser] = useState('');
    const [friends, setFriends] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editFriend, setEditFriend] = useState(null);


    const navigate = useNavigate();


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

    const handleModify = (friend) => {
        setEditFriend(friend);
        setShowForm(true);
    }

    return (
        <div className="min-h-screen">
            <h1 class="text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Remember Friends App</span></h1>
            { user ? (
                <div className="text-center">
                    <h2>Hello {user.user.email} </h2>
                    { !showForm &&
                        <Button type="primary" className="create-friend-btn" onClick={() => setShowForm(true)}>
                            Create Friend
                        </Button>
                    }
                    {showForm && <CreateFriend onFriendAdded={handleFriendAdded} friend={editFriend} onSuccess={()=>{setShowForm(false); setEditFriend(null);}}/>}
                    { showForm &&
                        <Button type="primary" className="create-friend-btn" onClick={() => {setShowForm(false); setEditFriend(null);}}>
                            Cancel
                        </Button>
                    }
                    <Tables onModify={handleModify}></Tables>
                </div>
            ) : (
                <div className="text-center place-items-center">
                    <h2>Login/Register to Continue</h2>
                    <br></br>
                    <Link to="/login">
                        <Button type="primary" >Login</Button>
                    </Link>
                </div>
            )}

        </div>

    );
}