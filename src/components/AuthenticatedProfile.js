import React, { useState, useEffect } from 'react';

const AuthenticatedProfile = () => {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchPosts = async () => {

            const response = await fetch("https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/users/me", {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                },

            }).then(response => response.json())
                .then(result => {
                    console.log(result.data.posts);
                    setPosts(result.data.posts);
                    //    setPosts(result.data.posts);
                })
                .catch(console.error);

        }
        fetchPosts();

    }, [])

    return (
        <>
            <h1 id="profile-Title">Profile</h1>

            {
                posts.map((post =>
                    post.active ?
                        <div key={post._id}>
                            <h2>{post.title}</h2>
                            <h4>{post.description}</h4>
                            <h3>Price: {post.price}</h3>
                            <h3>Seller: {post.author.username}</h3>
                            <h3>Location: {post.location}</h3> <br></br>

                            {post.messages.map(message =>
                                <div id="message" key={message._id}>
                                    <h2>Message: {message.content}</h2>
                                    <h2>From: {message.fromUser.username}</h2>
                                </div>)

                            }

                        </div> : <React.Fragment>
                            <></>
                        </React.Fragment>
                )
              )
            }
        </>
    )
}

export default AuthenticatedProfile;



