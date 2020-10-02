import React from 'react';
import {Col, Card, CardImg, CardSubtitle, CardText, 
    CardTitle, CardBody, Button} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import './home.css';

export default function Item(props){
    let element = props.element;
    let desc = element.description;
    if(desc.length > 43 ) {
        desc = desc.substring(0, 43);
        desc = desc + '...';
    }
    let title = element.header;
    if(title.length>12){
        title = title.substring(0,12)
        title = title + '...'
    }

    let dispatch = useDispatch();
    let history = useHistory();

    const handleClick = ()=>{
        dispatch({type:'AddS', data:element});
        history.push('detail/');
    }
    
    return (
        <Col xs='12' sm='6' md='6' lg='4' className='blog'>
        <Card className='card' onClick={handleClick}>
            <input type='hidden' value={element.id} name='id' />
            <CardImg top width='100%' src={element.image} alt='Blog image'/>
            <CardBody>
                <CardTitle><h3>{title}</h3></CardTitle>
                <CardSubtitle><small>Written By {element.author.toUpperCase()} </small>
                </CardSubtitle>
                <CardText>{desc}</CardText>
                <Link to='/add'>
                    <Button>View</Button>
                </Link>
            </CardBody>
        </Card>
        </Col>
    );
}