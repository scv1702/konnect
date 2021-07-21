import React from "react";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

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
        const buttonStyle = {
            margin: "0px 5px 0px 10px",
            display: this.state.buttonDisplay
        };

        const navStyle = { textDecoration: 'none', color: 'black' };

        return (
            <div>
                <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Konnect</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><NavLink to="/study" style={navStyle}>스터디</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="/challenge" style={navStyle}>챌린지</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="/mypage" style={navStyle}>내 페이지</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="/login" style={navStyle}>로그인</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="/regist" style={navStyle}>회원가입</NavLink></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Button style={buttonStyle} onClick={this.logout} variant="primary">로그아웃</Button>
                </Container>
            </Navbar>
            </div>
        );
    }
}

export default Header;