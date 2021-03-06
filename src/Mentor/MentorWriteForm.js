import React from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";

import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
import '../public/css/cardCenter.css';

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class MentorWriteForm extends React.Component {
    state = {
        category: ""
    };

    writeMentor = () => {
        let url;
        let send_param;

        const name = this._name.value;
        const department = this._department.value;
        const admissionYear = this._admissionYear.value;
        const grade = this._grade.value;
        const category = this.state.category;
        const introduce = this._introduce.value;
        const numberOfPeople = this._numberOfPeople.value;
        const kaTalkLink = this._kaTalkLink.value;

        url = "http://localhost:8080/mentor/write";
        send_param = {
            headers,
            "_id": $.cookie("login_id"),
            name,
            introduce,
            department,
            admissionYear,
            grade,
            category,
            numberOfPeople,
            kaTalkLink
        };

        axios.post(url, send_param).then(returnData => {
            if (returnData.data.message) {
                alert(returnData.data.message);
                window.location.href = "/mentor";
            } else {
                alert("멘토 신청서 작성에 실패 하였습니다.");
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
                        <Card.Title style={{ textAlign: 'center'}}>멘토 신청서</Card.Title><hr />
                        <Form.Group>
                            <Form.Label>멘토 이름</Form.Label>
                            <Form.Control type="text" ref={ref => (this._name = ref)} /><hr />
                            <Form.Group>
                                <Form.Label>카테고리</Form.Label>
                                <div>
                                    <Form.Check inline label="학업" name="category" type='radio' value="학업" onChange={this.handleChange} />
                                    <Form.Check inline label="친목" name="category" type='radio' value="친목" onChange={this.handleChange} />
                                    <Form.Check inline label="운동" name="category" type='radio' value="운동" onChange={this.handleChange} />
                                    <Form.Check inline label="기타" name="category" type='radio' value="기타" onChange={this.handleChange} />
                                </div>
                            </Form.Group><hr />
                            <Form.Label>멘토 정보</Form.Label>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Control type="text" placeholder="학과" ref={ref => (this._department = ref)} />
                                </Col>
                                <Col md>
                                    <Form.Control type="text" placeholder="학번" ref={ref => (this._admissionYear = ref)} />
                                </Col>
                                <Col md>
                                    <Form.Control type="text" placeholder="학년" ref={ref => (this._grade = ref)} />
                                </Col>
                            </Row><hr />
                            <Form.Label>자기 소개</Form.Label>
                            <Form.Control as="textarea" rows={5} ref={ref => (this._introduce = ref)} /><hr />
                            <Form.Label>카카오톡 오픈 채팅방 링크</Form.Label>
                            <Form.Control type="text" ref={ref => (this._kaTalkLink = ref)} /><hr />
                            <Form.Label>최대 인원 수</Form.Label>
                            <Form.Control type="text" ref={ref => (this._numberOfPeople = ref)} /><hr />
                        </Form.Group>
                        <div className="formStyle">
                            <Button variant="dark" onClick={this.writeMentor} block>저장하기</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        );
    }
}

export default MentorWriteForm;