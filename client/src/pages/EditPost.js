import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns';
import { UserContext } from '../UserContext';
import Header from '../Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
];
const EditPost = props => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [location, setLocation] = useState(null);


    const { id } = useParams()
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(post => {
                setTitle(post.title)
                setSummary(post.summary)
                setContent(post.content)
                setFiles(post.cover)
                setLocation(post.location)
            })
        })
    }, []);


    async function ModifyPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set("id", id);
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        data.set('location', location)
        const response = await fetch("http://localhost:4000/post", {
            method: 'PUT',
            body: data,
            credentials: 'include',
        })
        if (response.status === 400) {
            alert('Post edit failed');
            setRedirect(true);
        }
        else if (response.ok) {
            alert('Post edit successfully');
            setRedirect(true);
        }

    }
    if (redirect) {
        return <Redirect to='/' />
    }


    return (
        <React.Fragment>
            <Header />
            <form onSubmit={ModifyPost}>
                <input type="title"
                    placeholder={'Title'}
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                <input type="summary"
                    placeholder={'Summary'}
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)} />
                <input type="file"
                    defaultvalue={files}
                    onChange={ev => setFiles(ev.target.files)} />
                <input type="text"
                    placeholder='Location'
                    value={location}
                    onChange={ev => setLocation(ev.target.value)} />
                <ReactQuill theme="snow" value={content} placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats} onChange={(value) => setContent(value)} ></ReactQuill>
                <button style={{ marginTop: '5px' }}>Edit post</button>
            </form>
        </React.Fragment >
    )

}
export default EditPost