import './public/css/style.css';
import { } from "jquery.cookie";
import { Button } from 'react-bootstrap';
import React from "react";
import axios from "axios";

const $ = require('jquery');

// POS 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StickyNavigation {
    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 260;
        let self = this;

        $(window).scroll(() => {
            this.onScroll();
            this.appearLogo();
            this.moveImage();
        });
        $(window).resize(() => {
            this.onResize();
        });
    }

    onScroll = () => {
        this.checkTabContainerPosition();
        this.findCurrentTabSelector();
    }

    onResize = () => {
        if (this.currentId) {
            this.setSliderCss();
        }
    }

    checkTabContainerPosition = () => {
        if ($('.et-hero-tabs').offset()) {
            let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
            if ($(window).scrollTop() > offset) {
                $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
            } else {
                $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
            }
        }
    }

    findCurrentTabSelector = (element) => {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $('.et-hero-tab').each(function () {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if (this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }

    setSliderCss = () => {
        let width = 0;
        let left = 0;
        if (this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.et-hero-tab-slider').css('width', width);
        $('.et-hero-tab-slider').css('left', left);
    }

    appearLogo = () => {
        var posScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if ($('et-hero-tabs').offset()) {
            let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
            if (posScroll + 50 > offset) {
                $(".logo_img").animate({ 'opacity': '1' }, 500);
            }
        }
    }

    moveImage = () => {
        var position = $(window).scrollTop();
        if (position > 0 && (position < 190)) {
            $(".black_area").stop().animate({
                bottom: position / 2 + "px"
            }, 1);
            $(".et-hero-tabs-container").stop().animate({
                bottom: 160 - position / 4 + "px"
            }, 1);
        }
    }
}

class Home extends React.Component {
    state = {
        numOfMentor: 0,
        numOfMentee: 0
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    componentDidMount() {
        let numOfMentor;
        let numOfMentee;

        axios.post("http://localhost:8080/mentor/getMentorList").then(returnData => {
            numOfMentor = returnData.data.list.length;
            this.setState({ numOfMentor });
            
            $({ val: 0 }).animate({ val: numOfMentor }, {
                duration: 2000,
                step: () => {
                    const num = this.numberWithCommas(Math.floor(this.state.numOfMentor));
                    $(".mentiCount").text(num);
                },
                complete: () => {
                    const num = this.numberWithCommas(Math.floor(this.state.numOfMentor));
                    $(".mentiCount").text(num);
                }
            });
        }).catch(err => {
            console.log(err);
        });

        axios.post("http://localhost:8080/member/getAllMember").then(returnData => {
            numOfMentee = returnData.data.message.length;
            this.setState({ numOfMentee });

            $({ val: 0 }).animate({ val: numOfMentee }, {
                duration: 2000,
                step: () => {
                    const num = this.numberWithCommas(Math.floor(this.state.numOfMentee));
                    $(".mentoCount").text(num);
                },
                complete: () => {
                    const num = this.numberWithCommas(Math.floor(this.state.numOfMentee));
                    $(".mentoCount").text(num);
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const btnStyle = { textDecoration: 'none', color: 'white' };
        const stickyNavigation = new StickyNavigation();
        
        return (
            <div>
                <section class="et-hero-tabs">
                    <div class="logo"> </div>
                    <div class="black_area"></div>
                    <div class="et-hero-tabs-container">
                        <span class="small_logo">
                            <div class="logo_img"></div>
                        </span>
                        <a class="et-hero-tab" href="#study">Study</a>
                        <a class="et-hero-tab" href="#challenge">Challenge</a>
                        <a class="et-hero-tab" href="#mento-menti">Mentor-Mentee</a>
                        <span class="et-hero-tab-slider"></span>
                    </div>
                </section>
                <main class="et-main">
                    <section class="et-slide" id="study">
                        <div class="study-content">
                            <h1 class="menuName stripe1"> &#123; Study Group &#125; </h1>
                            <p class="des1">혼자 공부하기 버거울 때, 함께 공부할 사람을 찾게 도와주는 스터디 페이지입니다.</p><p class="des3">스터디를 개설하여 스터디원을 모집할 수 있고, 개설된 스터디에 참여도 가능합니다.</p>
                            <Button variant="dark"><a href="/study" style={btnStyle}>스터디 바로가기</a></Button>
                        </div>
                    </section>
                    <section class="et-slide" id="challenge">
                        <div class="challenge-content">
                            <h1 class="menuName stripe2"> &#123; Challenge &#125; </h1>
                            <p class="des1">생활 습관을 만드는데 도음을 주는 챌린지 페이지입니다.</p>
                            <p class="des1">자기계발, 운동 등 다양한 챌린지를 통해 삶의 질을 향상할 수 있습니다.</p>
                            <p class="des3">원하는 챌린지가 없을 경우, 새로이 개설하여 참여할 수 있습니다.</p>
                            <div class="challenge-btn">
                                <Button variant="dark"><a href="/challenge" style={btnStyle}>챌린지 바로가기</a></Button>
                            </div>
                        </div>
                    </section>
                    <section class="et-slide" id="mento-menti">
                        <div class="mento-menti-content">
                            <h1 class="menuName stripe3">&#123; Mentor-Mentee &#125;</h1>
                            <div class="mento-container">
                                <div class="mento-section card">
                                    <h1 class="notice-title"> for MENTOR </h1>
                                    <div class="notice-content des1">
                                        현재 &nbsp;
                                        <span class="mentoCount count"></span>
                                        &nbsp;명의 멘티가 멘토님을 기다리고 있어요!
                                        <p class="des2"> 학교 생활, 운동, 친목 등 다양한 분야에서</p>
                                        <p class="des3"> 당신의 재능을 펼쳐 보세요.</p>
                                    </div>
                                    <div class="mento-apply-btn">
                                        <Button variant="dark"><a href="/mentor/write" style={btnStyle}>멘토 신청</a></Button>
                                    </div>
                                </div>
                                <div class="menti-section card">
                                    <h1 class="notice-title"> for MENTEE</h1>
                                    <div class="notice-content des1">
                                        현재 &nbsp;
                                        <span class="mentiCount count"></span>
                                        &nbsp;명의 멘토가 멘티님을 기다리고 있어요!
                                        <p class="des2"> 코로나로 인한 소통이 단절된 이 시기,</p>
                                        <p class="des2"> 당신의 멘토를 찾아 보세요.</p>
                                    </div>
                                    <div class="mento-apply-btn">
                                        <Button variant="dark"><a href="/mentor" style={btnStyle}>멘티 신청</a></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
};

export default Home;