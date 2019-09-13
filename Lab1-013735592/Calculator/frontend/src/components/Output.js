import React, { Component } from 'react';
import './io_text.css';

class Output extends Component {

    render() {
        let { output } = this.props;
        return (
            <input
                className="text-field"
                type="text"
                name="output_ans"
                id="output_ans"
                readOnly
                value={output}/>
        );
    }
}

export default Output;