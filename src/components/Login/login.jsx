import React, { Component } from 'react';
import {
  Form,
  FormGroup, Label, Input,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../home/home.css';
import * as actions from '../../store/actions/auth' 
import Facebook from './fb_login';
import axios from 'axios';
import {api} from '../api';


class Login extends Component {

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.onAuth(e.target.username.value, e.target.password.value)
        this.props.history.push('/');
      }

    handleFb = async (response)=>{
        console.log(response);
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        let token = response.accessToken
        let data = {
            auth_token : token
        }
        let res = await api.post(
            "rest-auth/facebook/",data, {
                    headers:{
                        'Content-Type': 'application/json',}
                }
          );
          if(res.status === 200){
            console.log(res.data);
            this.props.onAuth(res.data.username, "a7ffd1c381");
            this.props.history.push('/');
          }
    }

    render() {
        return (
            <Form className="login login-form" onSubmit={this.handleSubmit}>
                <h2 className='text-center'>Sign In</h2>
                <FormGroup>
                <Label>Username</Label>
                <Input
                    type="text"
                    name="username"
                    id="user"
                    placeholder="user123"
                />
                </FormGroup>
                <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="********"
                />
                </FormGroup>
            <Button className='btn-lg btn-dark btn-block'>Submit</Button>
            <div className='text-center pt-3'> Or continue to your social account</div>
            <Facebook callback={this.handleFb} />
            {/* <Button color='primary' className='btn-lg btn-block'>Login with FACEBOOK</Button> */}
            </Form>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter((Login)));