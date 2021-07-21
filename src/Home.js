import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import HomeLogo from './public/images/home_logo.png';
import "./Home.css";

// POS ?š°?šŒ
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const Home = () => {
    return (
        <div>
            <img
                src={ HomeLogo } alt = "homo_log" class="homeimg"
            />
        </div>
    );
};

export default Home;