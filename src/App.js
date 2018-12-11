import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


let SC  = null;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientConnected: false,
      messages: [],
      value: ""
    };

    this.socket = new SockJS("http://localhost:8080/handler");

    this.stompClient = Stomp.over(this.socket);
    SC = this.stompClient;
    this.stompClient.connect({}, frame => {
      console.log(`connected, ${frame}!`);
      this.setState({clientConnected: true});
      this.stompClient.subscribe('/topic/all', data => {
        console.log("all",JSON.parse(data.body));
        this.setState({messages: JSON.parse(data.body).content });
      });
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    try {
      this.stompClient.send("/app/withdraw", {}, JSON.stringify({'name': this.state.value}));
    } catch(e) {
      console.error(e); 
    }
  }

  render() {
    const {messages, value} = this.state;
    
    return (
      <div className="App">

        <form onSubmit={(e,messageSend) => this.handleSubmit}>
          <input type="text" name="value" value={value} onChange={this.handleChange}/>
          <input type="button" onClick={this.handleClick}/>
        </form>
        <br/>
        <br/>
        MENSAGENS RECEBIDAS:
        <br/>
        <br/>
        {messages}

      </div>
    );
  }
}

export default App;
