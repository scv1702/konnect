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
        if (this.props.location.query !== undefined) {
            this.getDetail();
        } else {
            window.location.href = '/';
        }
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
        const sendParam = { headers, _id: this.props.location.query._id };
        axios.post("http://localhost:8080/study/detail", sendParam).then((returnData) => {
            const returnStudy = returnData.data.study[0];
            if (returnStudy) {
                const study = (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>{returnStudy.title}</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr>
                                    <td dangerouslySetInnerHTML={{ __html: returnStudy.rule }}></td>
                                    <td dangerouslySetInnerHTML={{ __html: returnStudy.goal }}></td>
                                    <td dangerouslySetInnerHTML={{ __html: returnStudy.kaTalkLink }}></td>
                                    <td dangerouslySetInnerHTML={{ __html: returnStudy.name }}></td>
                                    <td dangerouslySetInnerHTML={{ __html: returnStudy.department }}></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button block onClick={this.deleteStudy.bind(null, this.props.location.query._id)}>스터디 삭제</Button>
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