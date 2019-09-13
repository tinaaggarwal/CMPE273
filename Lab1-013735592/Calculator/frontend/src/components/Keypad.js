import React, { Component } from 'react';
import './Keypad.css';
import Button from './Button';

class Keypad extends Component {
    
    render() {
        return(
            <div>
                <div>
                    <Button buttonValue='7' onClick={this.props.onClick} />
                    <Button buttonValue='8' onClick={this.props.onClick} />
                    <Button buttonValue='9' onClick={this.props.onClick} />
                    <Button buttonValue='/' onClick={this.props.onClick} />
                </div>
                <div>
                    <Button buttonValue='4' onClick={this.props.onClick} />
                    <Button buttonValue='5' onClick={this.props.onClick} />
                    <Button buttonValue='6' onClick={this.props.onClick} />
                    <Button buttonValue='*' onClick={this.props.onClick} />
                </div>
                <div>
                    <Button buttonValue='1' onClick={this.props.onClick} />
                    <Button buttonValue='2' onClick={this.props.onClick} />
                    <Button buttonValue='3' onClick={this.props.onClick} />
                    <Button buttonValue='-' onClick={this.props.onClick} />
                </div>
                <div>
                    <Button buttonValue='C' onClick={this.props.onClick} />
                    <Button buttonValue='0' onClick={this.props.onClick} />
                    <Button buttonValue='=' onClick={this.props.onClick} />
                    <Button buttonValue='+' onClick={this.props.onClick} />
                </div>
            </div>
        );
    }
}

export default Keypad;