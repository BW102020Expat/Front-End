import React, { useState, useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import axios from 'axios';

export default function StoryDashBoard(props) {
    
    //STATE
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false);

    //GET posts
    useEffect(() =>{
        axiosWithAuth()
        .get('/api/posts')
        .then(res => {
            setPosts(res.data)
        })
        .catch(err => console.log("GET error", err))
    }, [update])

    //GET comments
    useEffect(() =>{
        axiosWithAuth()
        .get('/api/posts/comments')
        .then(res => {
            console.log(res.data)
            setComments(res.data)
        })
        .catch(err => console.log("GET error", err))
    }, [posts])

    //DELETE post
    const deleteHandler = (postId) => {
        axiosWithAuth()
          .delete(`api/posts/${postId}`)
          .then((res) => {
            setUpdate(!update) //changes update state so above side-effect renders.
          })
          .catch((err) => {
            console.log('delete error:', err);
          });
      };

    const editHandler = (postId) => {
        console.log(postId)
    }


    return (
        <div className='parent'>
            {posts.map(singlePost => (
                <div className='container' key={singlePost.postId}>
                
                <div className='thumbnail'>
                    <img src={singlePost.imageURL} alt='' />
                </div>

                <div className='preview'> 
                    <h3>{singlePost.title}</h3>
                    <h5>{singlePost.description}</h5>
                </div>

                
                <button onClick={() => deleteHandler(singlePost.postId)}>Delete</button>
                <button onClick={() => editHandler(singlePost.postId)}>Edit</button>

                <div>----------------------------------</div>
                <div className='commentSection'> Comment Section
                    {comments.map( singleComment => {
                        if(singleComment.postId === singlePost.postId){
                            return (
                            <h5 key={singleComment.commentId}>~{singleComment.comment}</h5>)
                        }
                    })}
                </div>
                </div>
            )
            )}

        </div>
    )
}