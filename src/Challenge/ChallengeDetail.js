import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

// POS 정책 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class ChallengeDetail extends React.Component {
    state = {
        challenge: [],
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
        const challengeStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center'}
        axios.post("http://localhost:8080/challenge/detail", sendParam).then((returnData) => {
            const returnChallenge = returnData.data.challenge[0]; 
            if (returnChallenge) {
                const challenge = (
                    <div style={challengeStyle}>
                        <div>
                            <div>
                                <h2>{returnChallenge.title}</h2>    
                            </div>
                            <div>
                                하루 인증 횟수 {returnChallenge.authPerDay}
                            </div>
                            <div>
                                인증 가능 시간 {returnChallenge.authAvailStart} ~ {returnChallenge.authAvailEnd}
                            </div>
                            <div>
                                인증 수단
                            </div>
                            <div>
                                참가비 {returnChallenge.pee}
                            </div>
                            <br></br>
                            <Button style={btnStyle} variant="dark"><a href={returnChallenge.kaTalkLink} style={navStyle}>카카오톡 오픈 채팅방 입장하기</a></Button>
                            <Button onClick={this.deleteChallenge.bind(null, _id)} variant="dark">챌린지 삭제</Button>
                        </div>
                    </div>
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