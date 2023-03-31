import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loanding from './Loanding';

class Header extends React.Component {
  state = {
    loandingHeader: true,
    nameUser: '',
  };

  componentDidMount() {
    this.getNameUser();
  }

  getNameUser = async () => {
    const userNameAPI = await getUser();
    this.setState({
      nameUser: userNameAPI.name,
    }, () => {
      this.setState({ loandingHeader: false });
    });
  };

  render() {
    const { loandingHeader, nameUser } = this.state;

    return (
      <header
        data-testid="header-component"
      >
        <nav className="navbar is-primary pl-6 pr-6" role="navigation" aria-label="main navigation">

          <div className="navbar-brand navbar-item center-items">
            <i className="fa-solid fa-volume-high has-text-dark" />
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                {loandingHeader
                  ? <Loanding />
                  : (
                    <span
                      data-testid="header-user-name"
                      className="tag is-primary is-light is-size-6"
                    >
                      {nameUser}
                    </span>)}
              </div>
              <Link
                className="navbar-item"
                data-testid="link-to-search"
                to="/search"
              >
                Pesquisar
              </Link>
              <Link
                className="navbar-item"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favoritas
              </Link>
              <Link
                className="navbar-item"
                data-testid="link-to-profile"
                to="/profile"
              >
                Perfil
              </Link>
            </div>
            <div className="navbar-end navbar-item">
              <span className="title">Trybe</span>
              <span className="subtitle is-3">Tunes</span>
            </div>
          </div>
        </nav>

      </header>
    );
  }
}

export default Header;
