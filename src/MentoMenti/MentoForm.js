import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StudyRow extends React.Component {
    render() {
        const detailLink = '/study/detail/:' + this.props._id;
        const navStyle = { textDecoration: 'none', color: 'white' }
        return (
            <Card style={{ width: '18rem', margin: '10px', display: 'inline-block', marginLeft: '0' }}>
                <Card.Body>
                    <Card.Title>{this.props.title} <Badge bg="primary">{this.props.category}</Badge></Card.Title> 
                    <Card.Subtitle className="mb-2 text-muted">{this.props.name} </Card.Subtitle>
                    <Card.Text>{this.props.goal} </Card.Text>
                    <Card.Link><Button variant="dark"><NavLink to={detailLink} style={navStyle}> 참여하기</NavLink></Button></Card.Link>
                </Card.Body>
            </Card>
        );
    }
}

class StudyForm extends React.Component {
    state = {
        studyList: []
    };
    
    getStudyList = () => {
        axios.post("http://localhost:8080/study/getStudyList").then(returnData => {
            let studyList;
            if (returnData.data.list.length > 0) {
                const studys = returnData.data.list;
                studyList = studys.map(item => (
                    <StudyRow
                        key={Date.now() + Math.random() * 500}
                        _id={item._id}
                        category={item.category}
                        createdAt={item.createdAt}
                        title={item.title}
                        name={item.name}
                        goal={item.goal}
                    ></StudyRow>
                ));
                this.setState({ studyList });
            } else {
                studyList = (
                    <tr>
                        <td colSpan="2">작성된 스터디가 존재하지 않습니다.</td>
                    </tr>
                );
                this.setState({ studyList });
            }
        }).catch(err => {
            console.log(err);
        });
    };

    componentDidMount() {
        this.getStudyList();
    };

    render() {
        const divStyle = { margin: 50 };
        const btnStyle = { margin: 10, marginLeft: 0 };
        const navStyle = { textDecoration: 'none', color: 'white' };

        return (
            <div style={divStyle}>
                <h1>스터디</h1>
                <Button style={btnStyle} variant="dark"><NavLink to='/study/write' style={navStyle}>스터디 모집하기</NavLink></Button>
                <div>
                    {this.state.studyList}
                </div>
            </div>
        );
    }
}

export default StudyForm;