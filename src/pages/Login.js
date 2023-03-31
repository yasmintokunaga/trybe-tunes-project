import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends React.Component {
  render() {
    const { handleChange, btnEnterLogin, nameUser, handleBtnLogin } = this.props;

    return (
      <section className="centralized-content">
        <div data-testid="page-login" className="box column is-one-quarter container">
          <p>
            <i className="fa-solid fa-volume-high" />
            <span className="title">Trybe</span>
            <span className="subtitle is-3">Tunes</span>
          </p>
          <div className="field">
            <div className="control">
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="Coloque o seu login"
                name="nameUser"
                onChange={ handleChange }
                value={ nameUser }
                className="input is-normal"
              />
            </div>
          </div>
          <button
            data-testid="login-submit-button"
            disabled={ btnEnterLogin }
            onClick={ handleBtnLogin }
            className="button is-primary"
          >
            Entrar
          </button>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  btnEnterLogin: PropTypes.bool.isRequired,
  nameUser: PropTypes.string.isRequired,
  handleBtnLogin: PropTypes.func.isRequired,
};

export default Login;
