import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loanding from '../components/Loanding';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loanding: false,
    disabledBtnSave: true,
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
        this.validateDisableBtnSave();
      });
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.validateDisableBtnSave();
    });
  };

  validateDisableBtnSave = () => {
    const { name, email, image, description } = this.state;
    if (
      name.length > 0
      && email.length > 0
      && image.length > 0
      && description.length > 0
      && email.split('').includes('@')
      && email.split('').includes('.')
    ) this.setState({ disabledBtnSave: false });
  };

  handleButtonSave = (event) => {
    event.preventDefault();
    this.setState({
      loanding: true,
    }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      const { history } = this.props;
      history.push('/profile');
    });
  };

  render() {
    const {
      name,
      email,
      image,
      description,
      loanding,
      disabledBtnSave,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loanding && <Loanding /> }
        { !loanding
          && (
            <form className="field box-config">
              <label className="label">
                Nome
                <div className="control">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      data-testid="edit-input-name"
                      className="input"
                      type="text"
                      value={ name }
                      name="name"
                      onChange={ this.handleChange }
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                </div>
              </label>

              <label className="label">
                Email
                <div className="control">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      data-testid="edit-input-email"
                      type="email"
                      name="email"
                      value={ email }
                      onChange={ this.handleChange }
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                </div>
              </label>

              <label className="label">
                Descrição:
                <div className="control">
                  <textarea
                    className="textarea"
                    data-testid="edit-input-description"
                    value={ description }
                    name="description"
                    onChange={ this.handleChange }
                  />
                </div>
              </label>

              <label className="label">
                Imagem
                <div className="control">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      data-testid="edit-input-image"
                      type="text"
                      value={ image }
                      name="image"
                      onChange={ this.handleChange }
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-link" />
                    </span>
                  </div>
                </div>
              </label>

              <button
                className="button is-primary"
                data-testid="edit-button-save"
                disabled={ disabledBtnSave }
                onClick={ this.handleButtonSave }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
