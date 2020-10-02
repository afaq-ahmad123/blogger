import React, { Component } from 'react';
import { Container, Row,
          Col, ListGroup, ListGroupItem 
        } from 'reactstrap';
import './home.css';
import axios from 'axios';
import {connect} from 'react-redux';
import Item from './item';


class Home extends Component {
    constructor(props){
        super(props);

        console.log(props.data, props.list);
        this.state = {
            data: [],
            list: []
        }
    }
    
    // detail(element){
    //     console.log(this.props);
    //     this.props.addSelected(element);
    // }

    componentDidMount() {
        window.scrollTo(0, 0);
        let data_1, response=[];
        console.log(this.statedata);
        axios.get(`blog/`, {
            headers: {
                'Authorization': `token f5a254322465b9b5915f73bb34ff802a3f98f963`,
            },
            })
            .then(res => {
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
        return (<div>
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
            </div>);
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
        addSelected: (data) =>{dispatch({type:'AddS', data: data})},
        addData: (data) => {dispatch({type:'Data', data:data})}
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home)