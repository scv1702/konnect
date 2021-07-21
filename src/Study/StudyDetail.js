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
        axios.post("http://localhost:8080/study/detail", sendParam).then((returnData) => {
            const returnStudy = returnData.data.study[0]; 
            if (returnStudy) {
                const study = (
                    <div>
                        <h2>{returnStudy.title}</h2>
                        <div>
                            {returnStudy.name} {returnStudy.department}
                        </div>
                        <h3>스터디 설명 & 규칙</h3>
                        {returnStudy.rule}
                        <h3>스터디 최종 목표</h3>
                        {returnStudy.goal}
                        <h3>카카오톡 오픈 채팅방 링크</h3>
                        {returnStudy.kaTalkLink}
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