import React from "react";
import { Table, Button, Card } from "react-bootstrap";
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
        return (
            <Card style={{ width: '18rem', margin: '10px', display: 'inline-block' }}>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.name}</Card.Subtitle>
                    <Card.Text>하루 인증 횟수 {this.props.authPerDay}</Card.Text>
                    <Card.Text>인증 기간 {this.props.authAvailStart} ~ {this.props.authAvailEnd}</Card.Text>
                    <Card.Text>참가비 {this.props.pee}</Card.Text>
                    <Card.Link><NavLink to={detailLink}>참여하기</NavLink></Card.Link>
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
                        name={item.name}
                        authPerDay = {item.authPerDay}
                        authAvailStart = {item.authAvailStart}
                        authAvailEnd = {item.authAvailEnd}
                        pee = {item.pee}

                        startMon = {item.startMon}
                        startDay = {item.startDay}
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
