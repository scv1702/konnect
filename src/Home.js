import './public/css/style.css';

import { Button } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import {} from "jquery.cookie";;

const $ = require('jquery');

// POS 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class StickyNavigation {
    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 100;
        let self = this;
        $('.et-hero-tab').click((event) => {
            self.onTabClick(event, $(this));
        });
        $(window).scroll(() => {
            this.onScroll();
            this.appearLogo();
            this.moveImage();
        });
        $(window).resize(() => {
            this.onResize();
        });
    }

    onTabClick = (event, element) => {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({
            scrollTop: scrollTop
        }, 600);
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
        let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
        if ($(window).scrollTop() > offset) {
            $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
        } else {
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
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
        var posScroll=document.documentElement.scrollTop || document.body.scrollTop;
        let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
        if (posScroll+50 > offset) {
            $(".logo_img").animate({'opacity':'1'},500);
        }
    }

    moveImage = () => {
        var position = $(window).scrollTop();
        if (position > 0 && (position < 190)) {
            $(".black_area").stop().animate({
                bottom: position/2 + "px"
            }, 1);
            $(".et-hero-tabs-container").stop().animate({
                bottom: 160- position/4 + "px"
            }, 1);
        }
    }
}

const Home = () => {
    // const stickyNavigation = new StickyNavigation();
    const btnStyle = { textDecoration: 'none', color: 'white' };
    return (
        <div>
            <section class="et-hero-tabs">
                <div class= "logo"> </div>
                <div class="black_area"></div>
                <div class="et-hero-tabs-container">
                    <span class="small_logo">
                        <div class="logo_img"></div>
                    </span>
                    <a class="et-hero-tab" href="#study">Study</a>
                    <a class="et-hero-tab" href="#challenge">Challenge</a>
                    <span class="et-hero-tab-slider"></span>
                </div>
            </section>
            <main class="et-main">
                <section class="et-slide" id="study">
                    <h1>스터디</h1>
                    <Button variant="dark"><a href="/study" style={btnStyle}>스터디 바로가기</a></Button>
                    
                </section>
                <section class="et-slide" id="challenge">
                    <h1>챌린지</h1>
                    <Button variant="dark"><a href="/challenge" style={btnStyle}>챌린지 바로가기</a></Button>
                </section>
            </main>
        </div>
        
    );
};

export default Home;