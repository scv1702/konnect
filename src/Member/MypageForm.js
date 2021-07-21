import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// POS 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const MypageForm = () => {
    const divStyle = { margin: 50 };
    const marginBottom = { marginTop: 10, marginRight: 10 };
    return (
        <div style={divStyle}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" disabled value={$.cookie("login_email")}/>
                <Form.Label>이름</Form.Label>
                <Form.Control type="text" />
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" />
                <Form.Label>새로운 비밀번호</Form.Label>
                <Form.Control type="password" />
                <Form.Label>새로운 비밀번호 재확인</Form.Label>
                <Form.Control type="password" />
            </Form.Group>
            <Button variant="dark" block style={marginBottom}>
                회원정보 수정
            </Button>
            <Button variant="dark" block style={marginBottom}>
                회원 탈퇴
            </Button>
        </div>
    );
};

export default MypageForm;