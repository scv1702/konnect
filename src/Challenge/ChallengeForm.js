import React from "react";
import { Table, Button, Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class ChallengeRow extends React.Component {
    render() {
        const detailLink = '/challenge/detail/:' + this.props._id;
        const navStyle = { textDecoration: 'none', color: 'white' };
        return (
            <Card style={{ width: '20rem', margin: '10px', display: 'inline-block', marginLeft: '0' }}>
                <Card.Body>
                <Card.Title>{this.props.title} <Badge bg="primary">{this.props.category}</Badge></Card.Title> 
                    <Card.Subtitle className="mb-2 text-muted">{this.props.name}</Card.Subtitle>
                    <b>하루 인증 횟수</b> {this.props.authPerDay}<br />
                    <b>챌린지 기간</b> {this.props.startDate.substr(0, 10)} ~ {this.props.endDate.substr(0, 10)}<br />
                    <b>벌금</b> {this.props.pee}<br /><br />
                    <Card.Link><Button variant="dark"><NavLink to={detailLink} style={navStyle}>참여하기</NavLink></Button></Card.Link>
                </Card.Body>
            </Card>
        );
    }
}

class ChallengeForm extends React.Component {
    state = {
        challengeList: []
    };
    
    getChallengeList = () => {
        axios.post("http://localhost:8080/challenge/getChallengeList").then(returnData => {
            let challengeList;
            if (returnData.data.list.length > 0) {
                const challenges = returnData.data.list;
                challengeList = challenges.map(item => (
                    <ChallengeRow
                        key={Date.now() + Math.random() * 500}
                        _id={item._id}
                        createdAt={item.createdAt}

                        title={item.title}
                        category={item.category}
                        rule={item.rule}
                        startDate = {item.startDate}
                        endDate = {item.endDate}
                        authPerDay = {item.authPerDay}
                        pee = {item.pee}
                        kaTalkLink = {item.kaTalkLink}
                        name={item.name}
                        department={item.department}
                    ></ChallengeRow>
                ));
                this.setState({ challengeList });
            } else {
                challengeList = (
                    <tr>
                        <td colSpan="2">작성된 챌린지가 존재하지 않습니다.</td>
                    </tr>
                );
                this.setState({ challengeList });
            }
        }).catch(err => {
            console.log(err);
        });
    };

    componentDidMount() {
        this.getChallengeList();
    };

    render() {
        const divStyle = { margin: 50 };
        const btnStyle = { margin: 10, marginLeft: 0 };
        const navStyle = { textDecoration: 'none', color: 'white' }
        return (
            <div style={divStyle}>
                <h1>챌린지</h1>
                <Button style={btnStyle} variant="dark"><NavLink to='/challenge/write' style={navStyle}>챌린지 모집하기</NavLink></Button>
                <div>
                    {this.state.challengeList}
                </div>
            </div>
        );
    }
}

export default ChallengeForm;
