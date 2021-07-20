import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StudyWriteForm extends React.Component {
    state = { data: "" };

    componentDidMount() {
        if (this.props.location.query !== undefined) {
            this.studyTitle.value = this.props.location.query.title;
        }
    }

    componentWillMount(){
        if (this.props.location.query !== undefined) {
            this.setState({
                data: this.props.location.query.content
            });
        }
    }

    writeStudy = () => {
        let url;
        let sendParam;

        const studyTitle = this.studyTitle.value;
        const studyContent = this.studyContent.value;

        if (studyTitle === undefined || studyTitle === "") {
            alert("스터디 제목을 입력 해주세요.");
            studyTitle.focus();
            return;
        } else if (studyContent === undefined || studyContent === "") {
            alert("스터디 내용을 입력 해주세요.");
            studyContent.focus();
        }
        
        if (this.props.location.query !== undefined) {
            url = "http://localhost:8080/study/update";
            sendParam = {
                headers,
                "_id" : this.props.location.query._id,
                "title": studyTitle,
                "content": studyContent
            };
        } else {
            url = "http://localhost:8080/study/write";
            sendParam = {
                headers,
                "_id" : $.cookie("login_id"),
                "title": studyTitle,
                "content": studyContent
            };
        }

        axios.post(url, sendParam).then(returnData => {
            if (returnData.data.message) {
                alert(returnData.data.message);
                window.location.href = "/";
            } else {
                alert("스터디 작성 실패");
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    render() {
        const divStyle = { margin: 50 };
        const titleStyle = { marginBottom: 5 };
        const buttonStyle = { marginTop: 5 };

        return (
            <div>
                <h2>스터디 모집</h2>
                <Form.Control
                    type="text"
                    style={titleStyle}
                    placeholder="스터디 제목"
                    ref={ref => (this.studyTitle = ref)}/>
                <Form.Control
                    type="text"
                    style={titleStyle}
                    placeholder="스터디 내용"
                    ref={ref => (this.studyContent = ref)}/>
                <Button style={buttonStyle} onClick={this.writeStudy} block>저장하기</Button>
            </div>
        );
    }
}

export default StudyWriteForm;