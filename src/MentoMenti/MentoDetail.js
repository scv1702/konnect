import React from "react";
import { Button, Card, Form, Badge } from "react-bootstrap";
import axios from "axios";
import '../public/css/cardCenter.css';

// POS 정책 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StudyDetail extends React.Component {
    state = {
        study: []
    };

    componentDidMount() {
        this.getDetail();
    }

    deleteStudy = (_id) => {
        const sendParam = { headers, _id };
        if (window.confirm('정말 이 스터디를 삭제하시겠습니까?')) {
            axios.post('http://localhost:8080/study/delete', sendParam)
                .then((returnData) => {
                    alert('스터디가 삭제되었습니다.');
                    window.location.href = '/study';
                })
                .catch((err) => {
                    console.log(err);
                    alert('스터디 삭제에 실패했습니다. 다시 시도해주세요.');
                });
        }
    };

    getDetail = () => {
        const { params } = this.props.match;
        const _id = params.id.substr(1);
        const sendParam = { headers, _id };
        const btnStyle = { margin: 10, marginLeft: 0 };
        const navStyle = { textDecoration: 'none', color: 'white' };
        axios.post("http://localhost:8080/study/detail", sendParam).then((returnData) => {
            const returnStudy = returnData.data.study[0];
            if (returnStudy) {
                const study = (
                    <Form className="formStyle">
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center'}}>{returnStudy.title}</Card.Title>
                                <Form.Group>
                                    <Badge bg="primary">{returnStudy.category}</Badge><br />
                                    스터디장: {returnStudy.name} <br />
                                    학과: {returnStudy.department}<br />
                                    <br />
                                    <Form.Label><b>스터디 설명 & 규칙</b></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={returnStudy.rule}/>
                                    <Form.Label><b>스터디 최종 목표</b></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={returnStudy.goal}/>
                                    <Form.Label><b>스터디 설명 & 규칙</b></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={returnStudy.rule}/>
                                </Form.Group>
                                <Button style={btnStyle} variant="dark"><a href={returnStudy.kaTalkLink} style={navStyle}>카카오톡 오픈 채팅방 입장하기</a></Button>
                                <Button onClick={this.deleteStudy.bind(null, _id)} variant="dark">스터디 삭제</Button>
                            </Card.Body>
                        </Card>
                    </Form>
                );
                this.setState({ study });
            } else {
                alert('스터디 상세 조회에 실패했습니다.');
            }
        })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const divStyle = { margin: 50 };
        return <div style={divStyle}>{this.state.study}</div>;
    }
}

export default StudyDetail;