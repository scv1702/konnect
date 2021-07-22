import React from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
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

class StudyWriteForm extends React.Component {
    state = {
        category: "",
        startDate: new Date(),
        endDate: new Date()
    };

    writeStudy = () => {
        let url;
        let send_param;

        const studyTitle = this.studyTitle.value;
        const studyCategory = this.state.category;
        const studyRule = this.studyRule.value;
        const studyGoal = this.studyGoal.value;
        const studyKaTalkLink = this.studyKaTalkLink.value;
        const studyName = this.studyName.value;
        const studyDepartment = this.studyDepartment.value;

        url = "http://localhost:8080/study/write";
        send_param = {
            headers,
            "_id": $.cookie("login_id"),
            "title": studyTitle,
            "category": studyCategory,
            "rule": studyRule,
            "goal": studyGoal,
            "kaTalkLink": studyKaTalkLink,
            "name": studyName,
            "department": studyDepartment,
            "startDate": this.state.startDate,
            "endDate": this.state.endDate
        };

        axios.post(url, send_param).then(returnData => {
            if (returnData.data.message) {
                alert(returnData.data.message);
                window.location.href = "/study";
            } else {
                alert("스터디 작성에 실패 하였습니다.");
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
                        <Card.Title style={{ textAlign: 'center'}}>스터디 개설</Card.Title><hr />
                        <Form.Group>
                            <Form.Label>스터디 제목</Form.Label>
                            <Form.Control type="text" ref={ref => (this.studyTitle = ref)} /><hr />
                            <Form.Group>
                                <Form.Label>카테고리</Form.Label>
                                <div>
                                    <Form.Check inline label="학업" name="category" type='radio' value="학업" onChange={this.handleChange} />
                                    <Form.Check inline label="어학" name="category" type='radio' value="어학" onChange={this.handleChange} />
                                    <Form.Check inline label="자격증" name="category" type='radio' value="자격증" onChange={this.handleChange} />
                                    <Form.Check inline label="기타" name="category" type='radio' value="기타" onChange={this.handleChange} />
                                </div>
                            </Form.Group><hr />
                            <Form.Label>스터디 설명 & 규칙</Form.Label>
                            <Form.Control as="textarea" rows={5} ref={ref => (this.studyRule = ref)} /><hr />
                            <Form.Label>스터디 최종 목표</Form.Label>
                            <Form.Control type="text" ref={ref => (this.studyGoal = ref)} /><hr />
                            모집기간<br />
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
                            <Form.Label>카카오톡 오픈 채팅방 링크</Form.Label>
                            <Form.Control type="text" ref={ref => (this.studyKaTalkLink = ref)} /><hr />
                            <Form.Label>스터디 개설자 정보</Form.Label>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Control type="text" placeholder="이름" ref={ref => (this.studyName = ref)} />
                                </Col>
                                <Col md>
                                    <Form.Control type="text" placeholder="학과" ref={ref => (this.studyDepartment = ref)} />
                                </Col>
                            </Row><hr />
                        </Form.Group>
                        
                        <div className="formStyle">
                            <Button variant="dark" onClick={this.writeStudy} block>저장하기</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        );
    }
}

export default StudyWriteForm;