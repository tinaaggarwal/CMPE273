import React, { Component } from 'react';
import './FirstPage.css';
import Navbar from '../Navbar/Navbar';
import Background from '../Background';
import BackgroundImage from "react-background-image";
import BurgerImg from '../../Burger.jpg';

class FirstPage extends Component {

    constructor(props) {
        super(props);
    }

render() {

    return (
        <div className="bgimg">
            {/* <img src = "https://media-cdn.grubhub.com/image/upload/c_scale,w_1650/q_50,dpr_auto,f_auto,fl_lossy,c_crop,e_vibrance:20,g_center,h_900,w_800/v1534256595/Onboarding/Burger.jpg">  */}
            <button class="btn">Button</button>
            {/* </img> */}
        </div>
            
    
    );
}
}

export default FirstPage;