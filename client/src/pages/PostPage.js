import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns';
import { UserContext } from '../UserContext';
import Header from '../Header';
import Map from '../Map';
const PostPage = props => {
    const { id } = useParams()
    const APIKEY = "AIzaSyBwPGK5SbTYI_Vsip8r2depJp_RNr3FDC4"
    const { userInfo } = useContext(UserContext);
    const [posts, setPosts] = useState([])
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [location, setLocation] = useState(null)
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json())
            .then(post => {
                setPosts(post);
                console.log(post);

                if (post.location) {
                    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + post.location + '&key=' + APIKEY)
                        .then(response => response.json())
                        .then(data => {
                            setLat(data.results[0].geometry.location.lat);
                            setLng(data.results[0].geometry.location.lng);
                        })
                        .catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));
    }, []);

    if (!posts) { return '' }

    return (
        <React.Fragment>
            <Header />
            < div className="post-page" >
                <h1>{posts.title}</h1>
                <time>{posts.createdAt && formatISO9075(new Date(posts.createdAt))}</time>
                {/* <time>{posts.createdAt}</time> */}
                <div className="author">by @{posts.author && posts.author.username}</div>
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${posts._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                    <Link className="delete-btn" to={`/delete/${posts._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                        Delete this post
                    </Link>
                    <Link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.25 13.5V7.75a2.25 2.25 0 012.25-2.25h7.5a2.25 2.25 0 012.25 2.25v5.75" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.25 17.75V13.5a1 1 0 011-1h2.5a1 1 0 011 1v4.25" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 16.5h1.25a.75.75 0 01.75.75V21h1.25v-4.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 13.5L12 6.75l-6.75 6.75" />
                        </svg>



                        Back to Home
                    </Link>
                </div>
                <div className='location'>
                    <p>{lat && lng && posts.location}</p>
                </div>
                <div className="image">
                    <img src={`http://localhost:4000/${posts.cover}`} alt="" />
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: posts.content }} />
                {/* {posts.content} */}
                {lat && lng && <Map lat={lat} lng={lng} />}
            </div >
        </React.Fragment >

    )



}
export default PostPage