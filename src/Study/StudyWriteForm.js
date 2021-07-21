import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StudyWriteForm extends React.Component {
    writeStudy = () => {
        let url;
        let send_param;

        const studyTitle = this.studyTitle.value;
        /* const studyCategory = this.studyCategory.value; */
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
            /* "category": studyCategory, */
            "rule": studyRule,
            "goal": studyGoal,
            "kaTalkLink": studyKaTalkLink,
            "name": studyName,
            "department":studyDepartment,
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

    render() {
        const studyStyle = { margin: 15, width: '40%' };
        return (
            <div style={studyStyle}>
                <h2>스터디 개설</h2>
                <h3>스터디 정보</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>스터디 제목</Form.Label>
                        <Form.Control type="text" ref={ref => (this.studyTitle = ref)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>스터디 설명 & 규칙</Form.Label>
                        <Form.Control type="textarea" ref={ref => (this.studyRule= ref)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>스터디 최종 목표</Form.Label>
                        <Form.Control type="text" ref={ref => (this.studyGoal = ref)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>카카오톡 오픈 채팅방 링크</Form.Label>
                        <Form.Control type="text" ref={ref => (this.studyKaTalkLink = ref)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>카카오톡 개설자 정보</Form.Label>
                        <Form.Control type="text" placeholder="이름" ref={ref => (this.studyName = ref)} />
                        <Form.Control type="text" placeholder="학과" ref={ref => (this.studyDepartment = ref)} />
                    </Form.Group>
                </Form>
                <Button variant="dark" onClick={this.writeStudy} block>저장하기</Button>
            </div>
        );
    }
}

export default StudyWriteForm;