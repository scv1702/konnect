import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StudyWriteForm extends React.Component {
    state = {
        data: ""
    };

    componentDidMount() {
        if (this.props.location.query !== undefined) {
            this.title.value = this.props.location.query.title;
        }
    }

    componentWillMount() {
        if (this.props.location.query !== undefined) {
            this.setState({
                data: this.props.location.query.content
            });
        }
    }

    writeStudy = () => {
        let url;
        let send_param;

        const studyTitle = this.studyTitle.value;
        const studyWriter = this.studyWriter.value;
        const studyContact = this.studyContact.value;
        const studyContent = this.state.data;

        if (studyTitle === undefined || studyTitle === "") {
            alert("스터디 제목을 입력 해주세요.");
            studyTitle.focus();
            return;
        } else if (studyWriter === undefined || studyWriter === "") {
            alert("스터디장 이름을 입력 해주세요.");
            studyWriter.focus();
        } else if (studyContact === undefined || studyContact === "") {
            alert("카카오톡 오픈 채팅방 링크를 입력 해주세요.");
            studyContact.focus();
        } else if (studyContent === undefined || studyContent === "") {
            alert("스터디 내용을 입력 해주세요.");
            studyContent.focus();
        }

        if (this.props.location.query !== undefined) {
            url = "http://localhost:8080/study/update";
            send_param = {
                headers,
                "_id": this.props.location.query._id,
                "title": studyTitle,
                "writer": studyWriter,
                "contact": studyContact,
                "content": studyContent,
            };
        } else {
            url = "http://localhost:8080/study/write";
            send_param = {
                headers,
                "_id": $.cookie("login_id"),
                "title": studyTitle,
                "name": studyWriter,
                "contact": studyContact,
                "content": studyContent,
            };
        }

        axios.post(url, send_param).then(returnData => {
            if (returnData.data.message) {
                alert(returnData.data.message);
                window.location.href = "/";
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
                <h2>스터디 모집</h2>
                <Form >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>스터디 제목</Form.Label>
                        <Form.Control type="text" ref={ref => (this.studyTitle = ref)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>스터디장 이름</Form.Label>
                        <Form.Control type="text" ref={ref => (this.studyWriter = ref)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>카카오톡 오픈 채팅방 링크</Form.Label>
                        <Form.Control type="text" ref={ref => (this.studyContact = ref)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>스터디 내용</Form.Label>
                        <Form.Control type="text" ref={ref => (this.studyContent = ref)} />
                    </Form.Group>
                </Form>
                <Button onClick={this.writeStudy} block>저장하기</Button>
            </div>
        );
    }
}

export default StudyWriteForm;