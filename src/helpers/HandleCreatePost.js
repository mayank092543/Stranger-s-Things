import React, { useState } from 'react';

const HandleCreatePost = ({ posts, setPosts }) => {
    //console.log(posts);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("userToken")

        const response = await fetch("https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: willDeliver,

                }
            })
        }).then(response => response.json())
            .then(result => {
                console.log([result.data.post]);

                const arr = posts.concat([result.data.post]);

                setPosts(arr);

                console.log(posts);

            })
            .catch(console.error);

        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);

    }

    return (
        <>
            <h1>Create Post</h1>

            <form id="createPostForm" onSubmit={handleSubmit}>

                <input type="text" placeholder="title" className="newPost" value={title}
                    onChange={(event) => { setTitle(event.target.value) }}></input>

                <input type="text" placeholder="description" className="newPost" value={description}
                    onChange={(event) => { setDescription(event.target.value) }}></input>

                <input type="text" placeholder="price" className="newPost" value={price}
                    onChange={(event) => { setPrice(event.target.value) }}></input>

                <input type="text" placeholder="location" className="newPost" value={location}
                    onChange={(event) => { setLocation(event.target.value) }}></input>

                <input type="checkbox" className="checkBox" value="Deliver"
                    onClick={() => setWillDeliver(true)}></input>

                <label htmlFor="willDeliver" className="deliver">Willing to Deliver?</label> <br></br><br></br>

                <button type="submit" className="submitPost-Btn">Submit</button>

            </form>
        </>
    )
}

export default HandleCreatePost;