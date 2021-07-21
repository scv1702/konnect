import React from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

// POS 정책 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StudyDetail extends React.Component {
    state = {
        study: [],
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
        const studyStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center'}
        axios.post("http://localhost:8080/study/detail", sendParam).then((returnData) => {
            const returnStudy = returnData.data.study[0]; 
            if (returnStudy) {
                const study = (
                    <div style={studyStyle}>
                        <div>
                            <div>
                                <h4>스터디 참가 신청서</h4>
                                <h2>{returnStudy.title}</h2>
                            </div>
                            <div>
                                개설자: {returnStudy.name} 학과: {returnStudy.department}
                            </div>
                            <div>
                                <h3>스터디 설명 & 규칙</h3>
                                {returnStudy.rule}
                            </div>
                            <div>
                                <h3>스터디 최종 목표</h3>
                                {returnStudy.goal}
                            </div>
                            <br></br>
                            <Button style={btnStyle} variant="dark"><a href={returnStudy.kaTalkLink} style={navStyle}>카카오톡 오픈 채팅방 입장하기</a></Button>
                            <Button onClick={this.deleteStudy.bind(null, _id)} variant="dark">스터디 삭제</Button>
                        </div>
                    </div>
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