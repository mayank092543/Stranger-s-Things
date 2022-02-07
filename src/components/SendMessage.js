import React, { useState } from 'react';

const SendMessage = ({ posts, setPosts, postId, setPostId }) => {
    const [content, setContent] = useState("");

    const handleMessageSubmit = (event) => {
        event.preventDefault();
        let messageInfo =
        {
            message: {
                content: `${content}`
            }
        }
        //console.log(messageInfo);
        //console.log(postId);

        const token = localStorage.getItem("userToken")

        const response = fetch(`https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts/${postId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                messageInfo
            )
        }).then(response => response.json())
            .then(result => {
                console.log(result);

                setContent("");

            })
            .catch(console.error);
    }

    return (
        <form onSubmit={handleMessageSubmit}>
            <textarea rows="4" cols="30" value={content} placeholder="Please click the Send Message before write or submit message..."
                onChange={(event) => setContent(event.target.value)}></textarea>

            <button type="submit" className="msg-Submit-Btn">Submit</button>
        </form>
    )
}

export default SendMessage;