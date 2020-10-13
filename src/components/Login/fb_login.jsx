import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';


export default class FacebookAuth extends Component {

    render(){
        return (
            <FacebookLogin 
                textButton='Login With Facebook'
                appId='3689737627713107'
                fields='name, email, picture'
                {...this.props}
            />
        )
    }
}
