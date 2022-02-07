import React, { useState, useEffect } from 'react';

const UnauthenticatedPosts = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts")
                .then(response => response.json())
                .then(result => {
                    console.log(result.data.posts);
                    setPosts(result.data.posts);
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
            <div id="logoutPost">
            <h1>Posts</h1>

            <input type="text" placeholder="Search Post..."
             value={searchTerm} className="search-Bar"
             onChange={(event) => setSearchTerm(event.target.value)}></input>

             </div>

            {
                postsToDisplay.map((post) => (
                    <div key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <h3>Price: {post.price}</h3>
                        <h3>Seller: {post.author.username}</h3>
                        <h3>Location: {post.location}</h3> 
                    </div>)
                )}

        </>
    )
}

export default UnauthenticatedPosts;