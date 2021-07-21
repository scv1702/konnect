import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// POS 정책 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class LoginForm extends React.Component {
    login = () => {
        const loginEmail = this.loginEmail.value;
        const loginPw = this.loginPw.value;

        if (loginEmail === "" || loginEmail === undefined) {
            alert("이메일 주소를 입력해주세요.");
            this.loginEmail.focus();
            return;
        } else if (loginPw === "" || loginPw === undefined) {
            alert("비밀번호를 입력해주세요.");
            this.loginPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.loginEmail.value,
            password: this.loginPw.value
        };

        axios.post("http://localhost:8080/member/login", send_param).then(returnData => {
            if (returnData.data.message) {
                $.cookie("login_id", returnData.data._id, { expires: 1 });
                $.cookie("login_email", returnData.data.email, { expires: 1 });
                alert(returnData.data.message);
                window.location.reload();
            } else {
                alert(returnData.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    render() {
        const formStyle = { margin: 50, width: '30%' };
        const buttonStyle = { marginTop: 10 };
        return (
            <Form style={formStyle}>
                <h2>로그인</h2>
                <Form.Group controlId="loginForm">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        maxLength="100"
                        ref={ref => (this.loginEmail = ref)}
                    />
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        maxLength="20"
                        ref={ref => (this.loginPw = ref)}
                    />
                    <Button
                        style={buttonStyle}
                        onClick={this.login}
                        variant="primary"
                        type="button"
                        block
                    >
                        로그인
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default LoginForm;