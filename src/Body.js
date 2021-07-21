import Home from './Home';

import LoginForm from "./Member/LoginForm";
import RegistForm from "./Member/RegistForm";
import MypageForm from "./Member/MypageForm";

import StudyForm from "./Study/StudyForm";
import StudyWriteForm from "./Study/StudyWriteForm";
import StudyDetail from "./Study/StudyDetail";

import ChallengeForm from "./Challenge/ChallengeForm";
import ChallengeWriteForm from "./Challenge/ChallengeWriteForm";
import ChallengeDetail from "./Challenge/ChallengeDetail";

import React from "react";
import { Route } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";

class Body extends React.Component {
    render() {
        // 로그인 했을 시 해당 경로로
        if ($.cookie("login_id")) {
            return (
                <div>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/regist" component={RegistForm}></Route>
                    <Route path="/mypage" component={MypageForm}></Route>
    
                    <Route path="/study" component={StudyForm}></Route>
                    <Route path="/study/write" component={StudyWriteForm}></Route>
                    <Route path="/study/detail/:id" component={StudyDetail}></Route>

                    <Route path="/challenge" component={ChallengeForm}></Route>
                    <Route path="/challenge/write" component={ChallengeWriteForm}></Route>
                    <Route path="/challenge/detail" component={ChallengeDetail}></Route>
                </div>
            );
        // 로그인 하지 않은 경우 로그인 또는 회원가입 화면으로 
        } else {
            return (
                <div>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/login" component={LoginForm}></Route>
                    <Route path="/regist" component={RegistForm}></Route>
                    <Route path="/mypage" component={LoginForm}></Route>

                    <Route path="/study" component={LoginForm}></Route>
                    <Route path="/study/write" component={LoginForm}></Route>
                    <Route path="/study/detail/:id" component={LoginForm}></Route>

                    <Route path="/challenge" component={LoginForm}></Route>
                    <Route path="/challenge/write" component={LoginForm}></Route>
                    <Route path="/challenge/detail" component={LoginForm}></Route>
                </div>
            );
        }
    }
}

export default Body;