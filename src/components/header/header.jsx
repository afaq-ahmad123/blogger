import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import './header.css';
import {logout} from '../../store/actions/auth';
import {connect} from 'react-redux';


class Header extends Component {


    handleLogout = ()=>{
        this.props.logout();
    }

    render(){
        return (
            <div className='mb-50'>
                <Navbar color='faded' light fixed='top' expand='md'>
                    <Link href='/' to='/'>Afaq Blogs</Link>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <Link to='/'>Home</Link> 
                        </NavItem>
                        <NavItem>
                            <Link href='/add' to='/add'>Add Blog</Link>
                        </NavItem>
                        <NavItem onClick={this.handleLogout}>
                            <Link to='login/'>Logout</Link>
                        </NavItem>

                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);