import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavbarToggler, NavItem, Collapse } from 'reactstrap';
import './header.css';

export default class Header extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isOpen: false
    //     }
    // }

    // toggle(){
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     })
    // }

    render(){
        return (
            <div className='mb-50'>
                <Navbar color='faded' light fixed='top' expand='md'>
                    <Link href='/' to='/'>Afaq Blogs</Link>
                    {/* <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar> */}
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <Link to='/'>Home</Link> 
                        </NavItem>
                        <NavItem>
                            <Link href='/add' to='/add'>Add Blog</Link>
                        </NavItem>
                        <NavItem>
                            <Link href='/detail' to='/detail'>About</Link>
                        </NavItem>

                    </Nav>
                    {/* </Collapse> */}
                </Navbar>
            </div>
        )
    }
}