import React, { Component } from 'react';
import { Container, Row,
          Col, ListGroup, ListGroupItem 
        } from 'reactstrap';
import './home.css';
import {connect} from 'react-redux';
import API from '../api';
import Item from './item';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            list: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let data_1, response=[];

        API.get('user/').then(res => {
            this.props.addUser(res.data[0]);
        })

        API.get(`blog/`).then(res => {
                data_1 = res.data.map((element)=>{
                    response.push(<ListGroupItem >
                                     <div className='img-div'>
                                     <img top='true' src={element.image} width='100%' alt='Blog img'/>
                                     </div>
                                     <h2 className='hist'>{element.header}</h2>
                                 </ListGroupItem>)

                    return (
                        <Item element={element} />
                    );
            });
            }).then(()=>{
                this.setState({
                    data: data_1,
                    list: response
                });
                this.props.addData(data_1);
            })
    }
    
    render() {
        return this.state.data?(<div>
                <Container className='.container'>
                    <Row>
                        <Col xs='12' sm='8' md='9' lg='9'>
                        <Row>
                            {this.state.data}
                        </Row>
                        </Col>
                        <Col>
                            <ListGroup className='list_group'>
                                <h3 className='text-center'>History</h3>
                                {this.state.list}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>)
            :
            (<div>No Blog Found</div>);
    }
}

const mapStatetoProps = (state) => {
    return {
        statedata: state.data,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (data) =>{dispatch({type:'addUser', data: data})},
        addData: (data) => {dispatch({type:'Data', data:data})}
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home)