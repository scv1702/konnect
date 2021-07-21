import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { } from "jquery.cookie";
import '../public/css/cardCenter.css';

// POS 정책 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class RegistForm extends React.Component {
    join = () => {
        const joinEmail = this.joinEmail.value;
        const joinName = this.joinName.value;
        const joinPw = this.joinPw.value;
        const regExpForEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regExpForPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;;
        if (joinEmail === "" || joinEmail === undefined) {
            alert("이메일 주소를 입력해주세요.");
            this.joinEmail.focus();
            return;
        } else if (joinEmail.match(regExpForEmail) === null || joinEmail.match(regExpForEmail) === undefined) {
            alert("이메일 형식에 맞게 입력해주세요.");
            this.joinEmail.value = "";
            this.joinEmail.focus();
            return;
        } else if (joinName === "" || joinName === undefined) {
            alert("이름을 입력해주세요.");
            this.joinName.focus();
            return;
        } else if (joinPw === "" || joinPw === undefined) {
            alert("비밀번호를 입력해주세요.");
            this.joinPw.focus();
            return;
        } else if (joinPw.match(regExpForPw) === null || joinPw.match(regExpForPw) === undefined) {
            alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
            this.joinPw.value = "";
            this.joinPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.joinEmail.value,
            name: this.joinName.value,
            password: this.joinPw.value
        };

        axios.post("http://localhost:8080/member/join", send_param).then(returnData => {
            if (returnData.data.message) {
                alert(returnData.data.message);
                if (returnData.data.dupYn === "1") {
                    this.joinEmail.value = "";
                    this.joinEmail.focus();
                } else {
                    this.joinEmail.value = "";
                    this.joinName.value = "";
                    this.joinPw.value = "";
                    window.location.href = "/";
                }
            } else {
                alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    render() {        
        const buttonStyle = { marginTop: 10 };
        return (
            <Form className="formStyle">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center'}}>회원가입</Card.Title>
                        <Form.Group controlId="joinForm">
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="20"
                                ref={ref => (this.joinName = ref)}
                            />
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                maxLength="100"
                                ref={ref => (this.joinEmail = ref)}
                            />
                            <Form.Text className="text-muted">
                                이메일은 다른 이에게 공유되지 않습니다.
                            </Form.Text><br></br>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                maxLength="20"
                                ref={ref => (this.joinPw = ref)}
                            />
                            <Form.Text className="text-muted">
                                비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.
                            </Form.Text><br></br>
                            <Form.Label>학과</Form.Label>
                            <Form.Control type="depart" /><br></br>
                            <Form.Label>성별</Form.Label>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="남자"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label="여자"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                </div>
                            ))}
                            <Form.Label>학년</Form.Label>
                            <Form.Select>
                                <option value="1">1학년</option>
                                <option value="2">2학년</option>
                                <option value="3">3학년</option>
                                <option value="4">4학년</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="formStyle">
                            <Button
                                style={buttonStyle}
                                onClick={this.join}
                                variant="dark"
                                type="button"
                                block
                            >
                                가입하기
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        );
    }
}

export default RegistForm;