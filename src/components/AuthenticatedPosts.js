
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HandleCreatePost from '../helpers/HandleCreatePost';
import SendMessage from './SendMessage';
import Profile from './Profile';

const AuthenticatedPosts = () => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // console.log(searchTerm);

    const token = localStorage.getItem("userToken")

    const handleDelete = async (postIdToDelete) => {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts/${postIdToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(result => {
                console.log(result);

                if (result) {
                    const newPosts = posts.filter(post => post._id !== postIdToDelete);
                    setPosts(newPosts)
                }

            })
            .catch(console.error);

    }

    useEffect(() => {
        const fetchPosts = async () => {

            const response = await fetch("https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts", {
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

    function postMatches(post, text) {
        if (post.title.toLowerCase().includes(text.toLowerCase())) {
            return true
        }
    }

    const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;

    return (
        <>

            <div id="title-Addpost">

                <h1 id="post-title">Posts</h1>

                <input type="text" placeholder="Search Post..."
                    value={searchTerm} className="search-Bar"
                    onChange={(event) => setSearchTerm(event.target.value)}></input>

                <Link to="/posts/add" className="addlink">Add Post</Link>


            </div>

            <div id="main">
                <Route path="/posts/add">
                    <HandleCreatePost posts={posts} setPosts={setPosts} />
                </Route>

            </div>

            {

                postsToDisplay.map((post) => (

                    <div key={post._id}>
                        <h2>{post.title}</h2>
                        <h4>{post.description}</h4>
                        <h3>Price: {post.price}</h3>
                        <h3>Seller: {post.author.username}</h3>
                        <h3>Location: {post.location}</h3>

                        <button disabled={post.isAuthor ? true : false}
                         className="sendMessage" onClick={() => setPostId(post._id)}>
                         Send Message
                        </button>

                        <button disabled={post.isAuthor ? false : true}
                         className="delete-btn" onClick={() => handleDelete(post._id)}>
                         Delete
                        </button>

                        {
                            postId.length ? <SendMessage posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} /> : ""
                        }

                    </div>)
                )}
        </>
    )
}
export default AuthenticatedPosts;


