import React from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import '../public/css/cardCenter.css';

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class ChallengeWriteForm extends React.Component {
    state = {
        category: '',
        startDate: new Date(),
        endDate: new Date()
    }

    writeChallenge = () => {
        let url;
        let send_param;

        const title = this._title.value;
        const category = this.state.category;
        const rule = this._rule.value;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const authPerDay = this._authPerDay.value;
        const pee = this._pee.value;
        const kaTalkLink = this._kaTalkLink.value;
        const name = this._name.value;
        const department = this._department.value;

        url = "http://localhost:8080/challenge/write";
        send_param = {
            headers,
            "_id": $.cookie("login_id"),
            title,
            category,
            rule,
            startDate,
            endDate,
            authPerDay,
            pee,
            kaTalkLink,
            name,
            department
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
        return (
            <Form className="formStyle">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center'}}>챌린지 개설</Card.Title><hr />
                        <Form.Group>
                            <Form.Label>챌린지 제목</Form.Label>
                            <Form.Control type="text" ref={ref => (this._title = ref)} /><hr />
                            <Form.Group>
                                <Form.Label>카테고리</Form.Label>
                                <div>
                                    <Form.Check inline label="생활 습관" name="category" type='radio' value="생활 습관" onChange={this.handleChange} />
                                    <Form.Check inline label="운동" name="category" type='radio' value="운동" onChange={this.handleChange} />
                                    <Form.Check inline label="학업" name="category" type='radio' value="학업" onChange={this.handleChange} />
                                    <Form.Check inline label="기타" name="category" type='radio' value="기타" onChange={this.handleChange} />
                                </div>
                            </Form.Group><hr />
                            <Form.Label>챌린지 설명 & 규칙</Form.Label>
                            <Form.Control as="textarea" rows={5} ref={ref => (this._rule = ref)} /><hr />
                            챌린지 기간<br />
                            <DatePicker 
                                locale={ko}
                                selected={this.state.startDate}
                                dateFormat="yyyy년 MM월 dd일"
                                onChange={date => this.setState({ startDate: date })} /> ~ <DatePicker 
                                locale={ko}
                                selected={this.state.endDate}
                                dateFormat="yyyy년 MM월 dd일"
                                onChange={date => this.setState({ endDate: date })} />
                            <hr />
                            <Form.Label>하루 인증 횟수</Form.Label>
                            <Form.Control type="text" ref={ref => (this._authPerDay = ref)} /><hr />
                            <Form.Label>챌린지 벌금</Form.Label>
                            <Form.Control type="text" ref={ref => (this._pee = ref)} />
                            <Form.Text className="text-muted">
                                챌린지에 한 번 미참여시, 벌금 만큼 포인트가 차감됩니다.
                            </Form.Text><hr />
                            <Form.Label>카카오톡 오픈 채팅방 링크</Form.Label>
                            <Form.Control type="text" ref={ref => (this._kaTalkLink = ref)} /><hr />
                            <Form.Label>챌린지 개설자 정보</Form.Label>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Control type="text" placeholder="이름" ref={ref => (this._name = ref)} />
                                </Col>
                                <Col md>
                                    <Form.Control type="text" placeholder="학과" ref={ref => (this._department = ref)} />
                                </Col>
                            </Row><hr />
                        </Form.Group>
                        <div className="formStyle">
                            <Button variant="dark" onClick={this.writeChallenge} block>저장하기</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        );
    }
}

export default ChallengeWriteForm;