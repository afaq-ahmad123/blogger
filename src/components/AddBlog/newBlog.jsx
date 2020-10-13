import React, {useEffect} from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import {useHistory} from 'react-router-dom'
import API from '../api';
import {useSelector} from 'react-redux';


export default function Blog() {

    let history = useHistory(); 

    const selector = useSelector;
    let values = {'header':'',
                    'description':'',
                    'image':''}

    const edit = selector(state=>state.edit);
    if (edit){
        values = selector(state=>state.selected);
        let file = document.getElementsByName('img');
        file.filename = values.image;
    }
    useEffect((dispatch, edit)=>{
        return() => {
            if (edit){
                dispatch({type:'edit', data:false});
            }
        }
    }, [])


    let image;
    const handleImageChange = (e) => {
          image= e.target.files[0]
      };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let form_data = new FormData();
        form_data.append('header', evt.target.name.value);
        form_data.append('description', evt.target.content.value);
        if(!edit){
            form_data.append('image', image, image.name);
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
        }else{

            if(image!==undefined){
                form_data.append('image', image, image.name);
            }
            API.patch(`blog/${values.id}`, form_data, { 
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
    }

    return (<div>
        <h2 className='text-center'>{edit?(<div>Edit BLOG</div>)
        :(<div>ADD NEW BLOG</div>)}</h2>
        <Form name='newform' className='blog-form' onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Blog Name</Label>
                <Input name='name' type='text' defaultValue={values.header} required/>
            </FormGroup>
            <FormGroup>
                <Label>Blog Content</Label>
                <Input name='content' type='textarea' defaultValue={values.description} aria-rowcount='40' required/>
            </FormGroup>
            <FormGroup>
                <Label>Blog Image</Label>
                <Input name='img' type='file' accept='image/png, image.jpeg' 
                onChange={handleImageChange}
                 />
            </FormGroup>
            <Button className='btn-lg btn-dark' type='submit'>Add Blog</Button>
        </Form>
    </div>);
}

