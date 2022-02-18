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

import MentorForm from './Mentor/MentorForm';
import MentorWriteForm from './Mentor/MentorWriteForm';
import MentorDetail from './Mentor/MentorDetail';

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
    
                    <Route exact path="/study" component={StudyForm}></Route>
                    <Route path="/study/detail/:id" component={StudyDetail}></Route>
                    <Route path="/study/write" component={StudyWriteForm}></Route>
                    
                    <Route exact path="/challenge" component={ChallengeForm}></Route>
                    <Route path="/challenge/detail/:id" component={ChallengeDetail}></Route>
                    <Route path="/challenge/write" component={ChallengeWriteForm}></Route>

                    <Route exact path="/mentor" component={MentorForm}></Route>
                    <Route path="/mentor/detail/:id" component={MentorDetail}></Route>
                    <Route path="/mentor/write" component={MentorWriteForm}></Route>
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
                    <Route path="/study/detail/" component={LoginForm}></Route>

                    <Route path="/challenge" component={LoginForm}></Route>
                    <Route path="/challenge/write" component={LoginForm}></Route>
                    <Route path="/challenge/detail" component={LoginForm}></Route>

                    <Route path="/mentor" component={LoginForm}></Route>
                    <Route path="/mentor/detail/:id" component={LoginForm}></Route>
                    <Route path="/mentor/write" component={LoginForm}></Route>
                </div>
            );
        }
    }
}

export default Body;