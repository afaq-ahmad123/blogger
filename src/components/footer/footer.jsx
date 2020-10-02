import React, { Component } from 'react';
import './footer.css';


export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <div className='container'>
                        <p className='text-center'>
                            Copyright @2020 | Designed By AFAQ
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
}