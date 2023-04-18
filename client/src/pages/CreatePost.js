import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../Header';
import { Redirect } from 'react-router-dom';
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
export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [location, setLocation] = useState(null);



    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        data.set('location', location)


        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })

        if (response.status === 400) {
            alert('Post creation failed');
            setRedirect(true);
        }
        else if (response.ok) {
            alert('Post created successfully');
            setRedirect(true);
        }

    }
    if (redirect) {
        return <Redirect to='/' />
    }


    return (
        <React.Fragment>
            <Header />
            <form onSubmit={createNewPost}>
                <input type="title"
                    placeholder={'Title'}
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                <input type="summary"
                    placeholder={'Summary'}
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)} />
                <input type="file"
                    onChange={ev => setFiles(ev.target.files)} />
                <input type="text" onChange={ev => setLocation(ev.target.value)} placeholder="Location" />
                <ReactQuill theme="snow" value={content} placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats} onChange={(value) => setContent(value)} ></ReactQuill>
                <button style={{ marginTop: '5px' }}>Create post</button>
            </form>
        </React.Fragment >
    )
}