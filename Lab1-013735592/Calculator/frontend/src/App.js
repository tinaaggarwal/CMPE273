import React from 'react';
import { Component } from 'react';
import Keypad from './components/Keypad';
import Input from './components/Input';
import Output from './components/Output';
import './App.css';
import axios from 'axios';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      input: '',
      output: ''
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick = (btn) => {
    switch (btn) {
      case '=': {
        const data = {
          input: this.state.input
        }
        axios.defaults.withCredentials = true;
        axios.post('http://52.26.41.109:3001/', data)
          .then(response => {
            console.log("Status code: ", response.status);
            if (response.status === 200) {
              this.setState({
                output: response.data
              });
            }
            else {
              this.setState({
                authFlag: false
              })
            }
          });
        break;
      }
      case 'C': {
        this.setState({
          input: '',
          output: ''
        });
        break;
      }
      default: {
        this.setState({
          input: this.state.input + btn
        })
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Input input={this.state.input} />
        <Keypad onClick={this.onClick} />
        <Output output={this.state.output} />
      </div>
    );
  }
}