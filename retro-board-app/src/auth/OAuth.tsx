import React, { Component } from 'react';
import { AccountCircle, Close } from '@material-ui/icons';

const API_URL = '/api';

interface OAuthProps {
  provider: string;
  socket: any;
}

interface OAuthState {
  user: any;
  disabled: string;
}

export default class OAuth extends Component<OAuthProps, OAuthState> {
  state: OAuthState = {
    user: {},
    disabled: '',
  };

  popup: any = null;

  componentDidMount() {
    const { socket, provider } = this.props;

    socket.on(provider, (user: any) => {
      console.log('On provider: ', user);
      this.popup.close();
      this.setState({ user });
    });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: '' });
      }
    }, 1000);
  }

  openPopup() {
    const { provider, socket } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: 'disabled' });
    }
  };

  closeCard = () => {
    this.setState({ user: {} });
  };

  render() {
    const { name, photo } = this.state.user;
    const { provider } = this.props;
    const { disabled } = this.state;
    const atSymbol = provider === 'twitter' ? '@' : '';

    return (
      <div>
        {name ? (
          <div className="card">
            <img src={photo} alt={name} />
            <Close onClick={this.closeCard} />
            <h4>{`${atSymbol}${name}`}</h4>
          </div>
        ) : (
          <div className="button-wrapper fadein-fast">
            <button
              onClick={this.startAuth}
              className={`${provider} ${disabled} button`}
            >
              <AccountCircle name={provider} />
            </button>
          </div>
        )}
      </div>
    );
  }
}
