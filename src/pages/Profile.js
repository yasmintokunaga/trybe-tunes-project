import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loanding from '../components/Loanding';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loanding: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({
      loanding: true,
    }, async () => {
      const response = await getUser();
      const { name, email, image, description } = response;
      this.setState({
        name,
        email,
        image,
        description,
      }, () => {
        this.setState({ loanding: false });
      });
    });
  };

  render() {
    const { name, email, image, description, loanding } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loanding && <Loanding />}
        { !loanding
          && (
            <section className="card is-size-5 box-config">
              <div className="card-image">
                <figure className="image image is-3by2">
                  <img data-testid="profile-image" src={ image } alt="profile" />
                </figure>
              </div>
              <div className="card-content">
                <p className="content">
                  <span className="has-text-weight-bold"> Usuário: </span>
                  <span>{ name }</span>
                </p>
                <p className="content">
                  <span className="has-text-weight-bold">Email: </span>
                  <span>{ email }</span>
                </p>
                <p className="content">
                  <span className="has-text-weight-bold">Descrição: </span>
                  <span>{ description }</span>
                </p>
              </div>
              <footer className="card-footer">
                <Link to="/profile/edit" className="card-footer-item">Editar perfil</Link>
              </footer>
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
