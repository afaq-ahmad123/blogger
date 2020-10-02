import React from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import {useHistory} from 'react-router-dom'
import API from '../api';


export default function Blog() {

    let image;
    const handleImageChange = (e) => {
          image= e.target.files[0]
      };
    let history = useHistory(); 
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt.target.img);
        let form_data = new FormData();
        form_data.append('header', evt.target.name.value);
        form_data.append('description', evt.target.content.value);
        form_data.append('image', image, image.name);
        console.log(form_data);
        API.post(`blog/`, form_data, { 
            headers: {
                'content-type': 'multipart/form-data',
                accept: 'application/json',
            }
            }).then(res => {
                console.log(res.data);
                history.push('/')
            })
            .catch(err => console.log(err))
    }

    return (<div>
        <h2 className='text-center'>ADD NEW BLOG</h2>
        <Form className='blog-form' onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Blog Name</Label>
                <Input name='name' type='text' required/>
            </FormGroup>
            <FormGroup>
                <Label>Blog Content</Label>
                <Input name='content' type='textarea' aria-rowcount='40' required/>
            </FormGroup>
            <FormGroup>
                <Label>Blog Image</Label>
                <Input name='img' type='file' accept='image/png, image.jpeg' 
                onChange={handleImageChange}/>
            </FormGroup>
            <Button className='btn-lg btn-dark' type='submit'>Add Blog</Button>
        </Form>
    </div>);
}