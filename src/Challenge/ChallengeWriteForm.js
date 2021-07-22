import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class ChallengeWriteForm extends React.Component {
    state = {
        category: ''
    }

    writeChallenge = () => {
        let url;
        let send_param;

        const challengeTitle = this.challengeTitle.value;
        const challengeName = this.challengeName.value;
        const studyCategory = this.state.category;
        const challengeStartMon = this.challengeStartMon.value;
        const challengeStartDay = this.challengeStartDay.value;
        const challengeAuthPerDay = this.challengeAuthPerDay.value;
        const challengeAuthAvailStart = this.challengeAuthAvailStart.value;
        const challengeAuthAvailEnd = this.challengeAuthAvailEnd.value;
        const challengePee = this.challengePee.value;

        url = "http://localhost:8080/challenge/write";
        send_param = {
            headers,
            "_id": $.cookie("login_id"),
            "title": challengeTitle,
            "authPerDay": challengeAuthPerDay,
            "category": studyCategory,
            "authAvailStart": challengeAuthAvailStart,
            "authAvailEnd": challengeAuthAvailEnd,
            "pee": challengePee,
            "startMon": challengeStartMon,
            "startDay": challengeStartDay,
            "name": challengeName
        };

        axios.post(url, send_param).then(returnData => {
            if (returnData.data.message) {
                alert(returnData.data.message);
                window.location.href = "/challenge";
            } else {
                alert("챌린지 작성에 실패 하였습니다.");
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    handleChange = (event) => {
        this.setState({ category: event.target.value });
    }

    render() {
        const challengeStyle = { margin: 15, width: '40%' };
        return (
            <div style={challengeStyle}>
                <h2>챌린지 개설</h2>
                <h3>챌린지 정보</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>챌린지 제목</Form.Label>
                        <Form.Control type="text" ref={ref => (this.challengeTitle = ref)} />
                        <Form.Label>챌린지장 이름</Form.Label>
                        <Form.Control type="text" ref={ref => (this.challengeName = ref)} />
                        <Form.Group>
                            <Form.Label>카테고리</Form.Label>
                            <div>
                                <Form.Check inline label="생활 습관" name="category" type='radio' value="생활 습관" onChange={this.handleChange} />
                                <Form.Check inline label="운동" name="category" type='radio' value="운동" onChange={this.handleChange} />
                                <Form.Check inline label="학업" name="category" type='radio' value="학업" onChange={this.handleChange} />
                                <Form.Check inline label="기타" name="category" type='radio' value="기타" onChange={this.handleChange} />
                            </div>
                        </Form.Group>
                        <h4>시작 날짜</h4>
                            <Form.Label>월(Month)</Form.Label>
                            <Form.Control type="text" ref={ref => (this.challengeStartMon = ref)} />
                            <Form.Label>일(Day)</Form.Label>
                            <Form.Control type="text" ref={ref => (this.challengeStartDay = ref)} />
                            <Form.Label>하루 인증 횟수</Form.Label>
                            <Form.Control type="text" ref={ref => (this.challengeAuthPerDay = ref)} />
                        <h4>인증 가능 시간</h4>
                            <Form.Label>시작</Form.Label>
                            <Form.Control type="text" ref={ref => (this.challengeAuthAvailStart = ref)} />
                            <Form.Label>종료</Form.Label>
                            <Form.Control type="text" ref={ref => (this.challengeAuthAvailEnd = ref)} />
                            <Form.Label>참가비</Form.Label>
                            <Form.Control type="text" ref={ref => (this.challengePee = ref)} />
                    </Form.Group>
                </Form>
                <Button variant="dark" onClick={this.writeChallenge} block>저장하기</Button>
            </div>
        );
    }
}

export default ChallengeWriteForm;