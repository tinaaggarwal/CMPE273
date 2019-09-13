import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';


class Button extends Component {

    constructor(props) {
        super(props);

        this.btn_style = this.btn_style.bind(this);
    } 

    btn_style () {
        if (this.props.buttonValue === '+' | this.props.buttonValue === '-' | this.props.buttonValue === '*' | 
        this.props.buttonValue === '/' | this.props.buttonValue === '=')
            return "action-btns"
        else
            return "btn-set1"
    }

    render() {
        return (
            <button
                value={this.props.buttonValue}
                onClick={e => this.props.onClick(e.target.value)}
                className={this.btn_style()}
            >
                {this.props.buttonValue}
            </button>
        );
    }
}

Button.propTypes = {
    buttonValue: PropTypes.string
};

export default Button;