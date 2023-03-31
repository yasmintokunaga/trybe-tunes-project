import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Loanding from './components/Loanding';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  state = {
    loanding: false,
    nameUser: '',
    btnEnterLogin: true,
    login: false,
    nameArtist: '',
    nameSearch: '',
    btnSearchArtist: true,
    listSearchArtist: [{
      artistId: 0,
      artistName: '',
      artworkUrl100: '',
      collectionId: 0,
      collectionName: '',
      collectionPrice: 0,
      releaseDate: '',
      trackCount: 0,
    }],
    statusSearch: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.disabledBtnLogin();
      this.disabledBtnSearchArtist();
    });
  };

  disabledBtnLogin = () => {
    const { nameUser } = this.state;
    const minLengthLoginInput = 3;
    this.setState({
      btnEnterLogin: nameUser.length < minLengthLoginInput,
    });
  };

  handleBtnLogin = () => {
    const { nameUser } = this.state;
    this.setState({ loanding: true }, async () => {
      await createUser({ name: nameUser });
      this.setState({ loanding: false, login: true });
    });
  };

  disabledBtnSearchArtist = () => {
    const { nameArtist } = this.state;
    const minLengthSearchInput = 2;
    this.setState({
      btnSearchArtist: nameArtist.length < minLengthSearchInput,
    });
  };

  handleBtnSearch = () => {
    const { nameArtist } = this.state;
    this.setState({
      loanding: true,
      nameSearch: nameArtist,
    }, async () => {
      const arraySearchArtist = await searchAlbumsAPI(nameArtist);
      this.setState({
        nameArtist: '',
        loanding: false,
        listSearchArtist: arraySearchArtist,
        statusSearch: arraySearchArtist.length > 0 ? 'found' : 'notfound',
      });
    });
  };

  render() {
    const {
      nameUser,
      btnEnterLogin,
      login,
      loanding,
      nameArtist,
      nameSearch,
      btnSearchArtist,
      listSearchArtist,
      statusSearch,
    } = this.state;
    return (
      <>
        <Switch>
          <Route
            exact
            path="/trybe-tunes-project"
            render={ (props) => (
              <Login
                { ...props }
                handleChange={ this.handleChange }
                nameUser={ nameUser }
                btnEnterLogin={ btnEnterLogin }
                handleBtnLogin={ this.handleBtnLogin }
              />
            ) }
          />
          <Route
            exact
            path="/search"
            render={ (props) => (
              <Search
                { ...props }
                handleChange={ this.handleChange }
                nameArtist={ nameArtist }
                nameSearch={ nameSearch }
                btnSearchArtist={ btnSearchArtist }
                handleBtnSearch={ this.handleBtnSearch }
                loanding={ loanding }
                listSearchArtist={ listSearchArtist }
                statusSearch={ statusSearch }
              />
            ) }
          />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>

        { loanding && <Loanding />}
        { login && <Redirect to="/search" /> }
      </>
    );
  }
}

export default App;
