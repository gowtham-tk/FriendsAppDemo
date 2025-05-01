import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Tables({onModify}) {
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState('');

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

    const toggleWish = async (friend) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const updateWished = !friend.wished;

        try {
            await axios.patch(`http://localhost:3001/friends/${friend.id}`,
                {
                    friend: { wished: updateWished }
                },
                {
                    headers: {
                      Authorization: `Bearer ${storedUser.token}`,
                    }
                }
            );

            setFriends(prev => prev.map(f => f.id === friend.id ? {...f, wished: updateWished} : f))
            
        } catch (err) {
            console.log(err);
        }

    }

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

    const tableItems = friends.map((friend) => 
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td class="px-6 py-4">{friend.id}</td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{friend.first_name}</td>
            <td class="px-6 py-4">{friend.last_name}</td>
            <td class="px-6 py-4">{friend.email}</td>
            <td class="px-6 py-4">{friend.phone}</td>
            <td class="px-6 py-4">{friend.dob}</td>
            <td class="px-6 py-4 cursor-pointer" onClick={() => toggleWish(friend)}>{friend.wished ? "✅ Yes" : "❌ No"} </td>
            <td class="px-6 py-4">{friend.created_at}</td>
            <td class="px-6 py-4 cursor-pointer text-blue-500" onClick={() => onModify(friend)}>modify</td>
            <td class="px-6 py-4 cursor-pointer text-red-500" onClick={() => handleDelete(friend.id)}>delete</td>
        </tr>
    );


    return (
        <div class="relative overflow-x-auto">
            <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">ID</th>
                        <th scope="col" class="px-6 py-3">First Name</th>
                        <th scope="col" class="px-6 py-3">Last Name</th>
                        <th scope="col" class="px-6 py-3">Email</th>
                        <th scope="col" class="px-6 py-3">Phone</th>
                        <th scope="col" class="px-6 py-3">Date of Birth</th>
                        <th scope="col" class="px-6 py-3">Wished</th>
                        <th scope="col" class="px-6 py-3">Created At</th>
                        <th scope="col" class="px-6 py-3">Modify</th>
                        <th scope="col" class="px-6 py-3">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
        </div>
    )
}

export default Tables;