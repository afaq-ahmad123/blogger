import React from 'react';
import {useSelector} from 'react-redux';
import { Button } from 'reactstrap';


export default function Detail() {

    let blog = useSelector(state=>state.selected);
    console.log(blog);
    return (Object.keys(blog).length>0) ? (<div className='detail'>
                <h1>{blog.header}</h1>
                <h6>Written By {blog.author.toUpperCase()}</h6>
                <h3>Content:</h3>
                <p className=''>{blog.description}</p>
                {/* <Button className=''>Edit</Button> */}
            </div>):
                (<div></div>);
}
