import React from "react";
import { Table, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StudyRow extends React.Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.name}</Card.Subtitle>
                    <Card.Text>{this.props.goal}</Card.Text>
                    <Card.Link href={`/study/detail/:{this.props.id}`}>참여하기</Card.Link>
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
        const sendParam = { headers, _id: $.cookie("login_id") };
        axios.post("http://localhost:8080/study/getStudyList", sendParam).then(returnData => {
            let studyList;
            if (returnData.data.list.length > 0) {
                const studys = returnData.data.list;
                studyList = studys.map(item => (
                    <StudyRow
                        key={Date.now() + Math.random() * 500}
                        _id={item._id}
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
        const navStyle = { textDecoration: 'none', color: 'white' }
        return (
            <div>
                <div style={divStyle}>
                <Button style={btnStyle} variant="primary"><NavLink to='/study/write' style={navStyle}>스터디 모집하기</NavLink></Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>스터디 제목</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.studyList}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default StudyForm;