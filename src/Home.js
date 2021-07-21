import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

// POS 우회
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const Home = () => {
    return (
        <div>
            Main Home
        </div>
    );
};

export default Home;