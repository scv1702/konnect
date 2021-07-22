import React from "react";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
import logoImg from "./public/images/konnect_logo.png";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Header extends React.Component {
    state = { buttonDisplay: "none" };

    componentDidMount() {
        if ($.cookie("login_id")) {
            this.setState({ buttonDisplay: "block" });
        } else {
            this.setState({ buttonDisplay: "none" });
        }
    }

    logout = () => {
        axios.get("http://localhost:8080/member/logout", { headers }).then(returnData => {
            if (returnData.data.message) {
                $.removeCookie("login_id");
                alert("로그아웃 되었습니다!");
                window.location.href = "/";
            }
        });
    };

    render() {
        const navStyle = { textDecoration: 'none', color: 'white' };
        const btnStyle = { textDecoration: 'none', color: 'black', float: 'right' };
        let nav;
        
        if ($.cookie("login_id")) {
            nav = (
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logoImg}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Konnect Logo"
                            /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link><NavLink to="/study" style={navStyle}>스터디</NavLink></Nav.Link>
                                <Nav.Link><NavLink to="/challenge" style={navStyle}>챌린지</NavLink></Nav.Link>
                                <Nav.Link><NavLink to="/mentor" style={navStyle}>멘토-멘티</NavLink></Nav.Link>
                                <Nav.Link><NavLink to="/mypage" style={navStyle}>내 페이지</NavLink></Nav.Link>
                                <Nav.Link><NavLink to="/regist" style={navStyle}>회원가입</NavLink></Nav.Link>
                            </Nav>
                            <Nav className="justify-content-end">
                                <Button style={btnStyle} onClick={this.logout} variant="light">로그아웃</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                </div>
            );
        } else {
            nav = (
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    src={logoImg}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Konnect Logo"
                                /></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link><NavLink to="/study" style={navStyle}>스터디</NavLink></Nav.Link>
                                    <Nav.Link><NavLink to="/challenge" style={navStyle}>챌린지</NavLink></Nav.Link>
                                    <Nav.Link><NavLink to="/mentor" style={navStyle}>멘토-멘티</NavLink></Nav.Link>
                                    <Nav.Link><NavLink to="/mypage" style={navStyle}>내 페이지</NavLink></Nav.Link>
                                    <Nav.Link><NavLink to="/regist" style={navStyle}>회원가입</NavLink></Nav.Link>
                                </Nav>
                                <Nav className="justify-content-end">
                                    <Button variant="light"><NavLink to="/login" style={btnStyle}>로그인</NavLink></Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            );
        }
        return (nav);
    }
}

export default Header;