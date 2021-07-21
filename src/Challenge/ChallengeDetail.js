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
        if (window.confirm('정말 삭제하시겠습니까?')) {
            axios.post('http://localhost:8080/study/delete', sendParam)
                .then((returnData) => {
                    alert('스터디가 삭제 되었습니다.');
                    window.location.href = '/';
                })
                .catch((err) => {
                    console.log(err);
                    alert('스터디 삭제에 실패했습니다');
                });
        }
    };

    getDetail = () => {
        const sendParam = { headers, _id: this.props.location.query._id };
        const marginBottom = { marginBottom: 5 };
        axios.post("http://localhost:8080/study/detail", sendParam).then((returnData) => {
            if (returnData.data.study[0]) {
                const study = (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>{returnData.data.study[0].title}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td dangerouslySetInnerHTML={{ __html: returnData.data.study[0].content }}></td>
                                </tr>
                            </tbody>
                        </Table>
                        <div>
                            <NavLink to={{
                                pathname: '/studyWrite',
                                query: {
                                    title: returnData.data.study[0].title,
                                    content: returnData.data.study[0].content,
                                    _id: this.props.location.query._id
                                }
                            }}>
                                <Button block style={marginBottom}>스터디 수정</Button>
                            </NavLink>
                            <Button block onClick={this.deleteStudy.bind(null, this.props.location.query._id)}>스터디 삭제</Button>
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