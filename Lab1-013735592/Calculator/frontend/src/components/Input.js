import React, { Component } from 'react';
import './io_text.css';

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            question: e.target.value
        })
    }

    render() {
        let { input } = this.props;
        return (
            <input
                className="text-field"
                type="text"
                name="input_ques"
                id="input_ques"
                onChange={this.handleChange}
                autoFocus
                value={input}
            />
        );
    }
}

export default Input;