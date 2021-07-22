import React from "react";
import { Button, Form, Card, Badge } from "react-bootstrap";
import axios from "axios";
import '../public/css/cardCenter.css';

// POS 정책 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class ChallengeDetail extends React.Component {
    state = {
        challenge: []
    };

    componentDidMount() {
        this.getDetail();
    }

    deleteChallenge = (_id) => {
        const sendParam = { headers, _id };
        if (window.confirm('정말 이 챌린지를 삭제하시겠습니까?')) {
            axios.post('http://localhost:8080/challenge/delete', sendParam)
            .then((returnData) => {
                alert('챌린지가 삭제되었습니다.');
                window.location.href = '/challenge';
            })
            .catch((err) => {
                console.log(err);
                alert('챌린지 삭제에 실패했습니다. 다시 시도해주세요.');
            });
        }
    };

    getDetail = () => {
        const { params } = this.props.match;
        const _id = params.id.substr(1);
        const sendParam = { headers, _id };
        const btnStyle = { margin: 10, marginLeft: 0 };
        const navStyle = { textDecoration: 'none', color: 'white' };
        axios.post("http://localhost:8080/challenge/detail", sendParam).then((returnData) => {
            const returnChallenge = returnData.data.challenge[0]; 
            if (returnChallenge) {
                const challenge = (
                    <Form className="formStyle">
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center'}}>{returnChallenge.title}</Card.Title>
                                <Form.Group>
                                    <Badge bg="primary">{returnChallenge.category}</Badge><br />
                                    <hr />
                                    <b>챌린지장:</b> {returnChallenge.name} <br />
                                    <b>학과:</b> {returnChallenge.department}<br />
                                    <b>챌린지 기간:</b> {returnChallenge.startDate.substr(0, 10) } ~ {returnChallenge.endDate.substr(0, 10)}<br />
                                    <hr />
                                    <Form.Label><h5>챌린지 설명 & 규칙</h5></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={returnChallenge.rule}/><hr />
                                    <Form.Label><h5>하루 인증 횟수</h5></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={returnChallenge.authPerDay}/><hr />
                                    <Form.Label><h5>벌금</h5></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={returnChallenge.pee}/>
                                    <Form.Text className="text-muted">
                                        챌린지에 한 번 미참여시, 벌금 만큼 포인트가 차감됩니다.
                                    </Form.Text>
                                </Form.Group>
                                <Button style={btnStyle} variant="dark"><a href={returnChallenge.kaTalkLink} style={navStyle}>카카오톡 오픈 채팅방 입장하기</a></Button>
                                <Button onClick={this.deleteChallenge.bind(null, _id)} variant="dark">챌린지 삭제</Button>
                            </Card.Body>
                        </Card>
                    </Form>
                );
                this.setState({ challenge });
            } else {
                alert('챌린지 상세 조회에 실패했습니다.');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    render() {
        const divStyle = { margin: 50 };
        return <div style={divStyle}>{this.state.challenge}</div>;
    }
}

export default ChallengeDetail;