import React from 'react';
import SockJsClient from 'react-stomp';
 
class WsComponent extends React.Component {
  constructor(props) {
    super(props);
  }
 
  sendMessage = (msg) => {
    this.clientRef.sendMessage('/topics/all', msg);
  }
 
  render() {
    return (
      <div>
        <SockJsClient url='http://localhost:8080/ws' topics={['/topics/all']}
            onMessage={(msg) => { console.log(msg); }}
            ref={ (client) => { this.clientRef = client }} />
      </div>
    );
  }
}