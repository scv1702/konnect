import React from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";

// SOP 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StudyRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    <NavLink
                        to={{ pathname: "/study/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.createdAt.substring(0, 10)}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/study/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.title}
                    </NavLink>
                </td>
            </tr>
        );
    }
}

class StudyForm extends React.Component {
    state = {
        studyList: []
    };

    getStudyList = () => {
        const sendParam = { headers, _id: $.cookie("login_id") };
        axios.post("http://localhost:8080/board/getStudyList", sendParam).then(returnData => {
            let studyList;
            if (returnData.data.list.length > 0) {
                const studys = returnData.data.list;
                studyList = studys.map(item => (
                    <StudyRow
                        key={Date.now() + Math.random() * 500}
                        _id={item._id}
                        createdAt={item.createdAt}
                        title={item.title}
                    ></StudyRow>
                ));
                this.setState({ studyList: studyList });
            } else {
                studyList = (
                    <tr>
                        <td colSpan="2">작성된 스터디가 존재하지 않습니다.</td>
                    </tr>
                );
                this.setState({ studyList: studyList });
            }
        }).catch(err => {
                console.log(err);
        });
    };

    componentDidMount() {
        console.log('test');
        this.getStudyList();
    };

    render() {
        const divStyle = { margin: 50 };
        return (
            <div>
                <div style={divStyle}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>스터디 제목</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.studyList}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default StudyForm;