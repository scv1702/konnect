import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class MentorRow extends React.Component {
    render() {
        const detailLink = '/mentor/detail/:' + this.props._id;
        const navStyle = { textDecoration: 'none', color: 'white' }
        return (
            <Card style={{ width: '18rem', margin: '10px', display: 'inline-block', marginLeft: '0' }}>
                <Card.Body>
                    <Card.Title>{this.props.name} 멘토 <Badge bg="primary">{this.props.category}</Badge></Card.Title> 
                    <Card.Subtitle className="mb-2 text-muted">{this.props.department}</Card.Subtitle>
                    <b>입학 년도(학번)</b> {this.props.admissionYear}<br />
                    <b>학년</b> {this.props.grade}<br />
                    <b>최대 인원 수</b> {this.props.numberOfPeople}<br /><br />
                    <Card.Link><Button variant="dark"><NavLink to={detailLink} style={navStyle}>멘티 신청하기</NavLink></Button></Card.Link>
                </Card.Body>
            </Card>
        );
    }
}

class MentorForm extends React.Component {
    state = {
        mentorList: []
    };
    
    getMentorList = () => {
        axios.post("http://localhost:8080/mentor/getMentorList").then(returnData => {
            let mentorList;
            if (returnData.data.list.length > 0) {
                const mentors = returnData.data.list;
                mentorList = mentors.map(item => (
                    <MentorRow
                        key={Date.now() + Math.random() * 500}
                        _id={item._id}
                        createdAt={item.createdAt}

                        name={item.name}
                        introduce={item.introduce}
                        department={item.department}
                        admissionYear={item.admissionYear}
                        grade={item.grade}
                        category={item.category}
                        numberOfPeople={item.numberOfPeople}
                    ></MentorRow>
                ));
                this.setState({ mentorList });
            } else {
                mentorList = (
                    <tr>
                        <td colSpan="2">멘토가 존재하지 않습니다.</td>
                    </tr>
                );
                this.setState({ mentorList });
            }
        }).catch(err => {
            console.log(err);
        });
    };

    componentDidMount() {
        this.getMentorList();
    };

    render() {
        const divStyle = { margin: 50 };
        const btnStyle = { margin: 10, marginLeft: 0 };
        const navStyle = { textDecoration: 'none', color: 'white' };

        return (
            <div style={divStyle}>
                <h1>멘토-멘티</h1>
                <Button style={btnStyle} variant="dark"><NavLink to='/mentor/write' style={navStyle}>멘토 신청하기</NavLink></Button>
                <div>
                    {this.state.mentorList}
                </div>
            </div>
        );
    }
}

export default MentorForm;