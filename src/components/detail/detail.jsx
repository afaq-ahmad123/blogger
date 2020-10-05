import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Button } from 'reactstrap';
import {useHistory} from 'react-router-dom';


export default function Detail() {

    let blog = useSelector(state=>state.selected);
    let username = useSelector(state => state.user.username);
    console.log(username);
    let dispatch = useDispatch();
    let history = useHistory();
    const editHandle = () => {
        dispatch({type:'edit', data:true});
        history.push({
            pathname: '/add'
        })
    }

    return (Object.keys(blog).length>0) ? (<div className='detail'>
                <h1>{blog.header}</h1>
                <h6>Written By {blog.author.toUpperCase()}</h6>
                <h3>Content:</h3>
                <p>{blog.description}</p>
                {blog.author === username?
                    (<Button onClick={editHandle} className='edit-btn'>Edit</Button>):
                (<div></div>)}
            </div>):
                (<div></div>);
}
