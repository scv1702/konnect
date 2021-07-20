import LoginForm from "./LoginForm";
import StudyForm from "./StudyForm";
import StudyWriteForm from "./StudyWriteForm";
import StudyDetail from "./StudyDetail";
import MypageForm from "./MypageForm";

import React from "react";
import { Route } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";

class Body extends React.Component {
    getResultForm = () => {
        let resultForm;
        if ($.cookie("login_id")) {
            resultForm = <Route exact path="/" component={StudyForm}></Route>;
        } else {
            resultForm = <Route exact path="/" component={LoginForm}></Route>;
        }
        return resultForm;
    }
    render() {
        let resultForm = this.getResultForm();
        return (
            <div>
                <Route path="/mypage" component={MypageForm}></Route>
                <Route path="/studyWrite" component={StudyWriteForm}></Route>
                <Route path="/study/detail" component={StudyDetail}></Route>
                {resultForm}
            </div>
        );
    }
}

export default Body;