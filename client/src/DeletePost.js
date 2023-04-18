import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom';
function DeletePost() {
    const { id } = useParams()
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        async function deletePost() {
            const response = await fetch(`http://localhost:4000/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (response.status === 400) {
                alert('Post delete failed');
                setRedirect(true);
            }
            else if (response.ok) {
                alert('Post delete successfully');
                setRedirect(true);
            }
        }
        deletePost();
    }, [])
    if (redirect) {
        return <Redirect to='/' />
    }


}
export default DeletePost;