import React from "react";
import { Button, Form, Card, Badge } from "react-bootstrap";
import axios from "axios";
import '../public/css/cardCenter.css';

// POS 정책 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class MentorDetail extends React.Component {
    state = {
        mentor: []
    };

    componentDidMount() {
        this.getDetail();
    }

    deleteMentor = (_id) => {
        const sendParam = { headers, _id };
        if (window.confirm('정말 이 멘토 정보를 삭제하시겠습니까?')) {
            axios.post('http://localhost:8080/mentor/delete', sendParam)
            .then((returnData) => {
                alert('멘토 정보가 삭제되었습니다.');
                window.location.href = '/challenge';
            })
            .catch((err) => {
                console.log(err);
                alert('멘토 정보 삭제에 실패했습니다. 다시 시도해주세요.');
            });
        }
    };

    getDetail = () => {
        const { params } = this.props.match;
        const _id = params.id.substr(1);
        const sendParam = { headers, _id };
        const btnStyle = { margin: 10, marginLeft: 0 };
        const navStyle = { textDecoration: 'none', color: 'white' };
        axios.post("http://localhost:8080/mentor/detail", sendParam).then((returnData) => {
            const returnMentor = returnData.data.mentor[0]; 
            if (returnMentor) {
                const mentor = (
                    <Form className="formStyle">
                    <Card style={{ width: '30rem' }}>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center'}}>{returnMentor.name} 멘토</Card.Title>
                            <Form.Group>
                                <Badge bg="primary">{returnMentor.category}</Badge><br />
                                <hr />
                                <b>학과:</b> {returnMentor.department}<br />
                                <b>학번:</b> {returnMentor.admissionYear}<br />
                                <b>학년:</b> {returnMentor.grade}<br />
                                <b>최대 인원 수: </b> {returnMentor.numberOfPeople}<br />
                                <hr />
                                <Form.Label><h5>자기 소개</h5></Form.Label>
                                <Form.Control plaintext readOnly defaultValue={returnMentor.introduce}/>
                            </Form.Group>
                            <Button style={btnStyle} variant="dark"><a href={returnMentor.kaTalkLink} style={navStyle}>카카오톡 오픈 채팅방 입장하기</a></Button>
                            <Button onClick={this.deleteMentor.bind(null, _id)} variant="dark">멘토 삭제</Button>
                        </Card.Body>
                    </Card>
                </Form>
                );
                this.setState({ mentor });
            } else {
                alert('멘토 상세 조회에 실패했습니다.');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    render() {
        const divStyle = { margin: 50 };
        return <div style={divStyle}>{this.state.mentor}</div>;
    }
}

export default MentorDetail;