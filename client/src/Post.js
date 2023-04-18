import React from "react"
import './App.css';
import Header from "./Header";
import { Link } from "react-router-dom";
import { formatISO9075 } from 'date-fns';

const Post = props => (

    <div className="post">
        <div className="image">
            <Link to={`/post/${props._id}`}>
                <img src={"http://localhost:4000/" + props.cover} alt="" />
            </Link>
        </div>


        <div className="texts">
            <Link to={`/post/${props._id}`}>
                <h2>{props.title}</h2>
            </Link>
            <p className="info">
                <a className="author">{props.author.username}</a>
                <time>{formatISO9075(new Date(props.createdAt))}</time>
            </p>
            <p className="summary">
                {props.summary}
            </p>
        </div>
    </div>






)
export default Post;