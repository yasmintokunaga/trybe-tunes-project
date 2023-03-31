import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loanding from '../components/Loanding';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    listMusics: [],
    artistName: '',
    albumName: '',
    loanding: false,
    favoriteMusic: [],
  };

  componentDidMount() {
    this.repairFavoriteMusics();
  }

  repairFavoriteMusics = async () => {
    const savedFavorites = await getFavoriteSongs();
    const newSaved = [...new Set(savedFavorites)];
    this.setState({
      listMusics: newSaved,
    });
    const trackIds = newSaved.map(({ trackId }) => trackId);
    this.setState({
      favoriteMusic: [...new Set(trackIds)],
    });
  };

  removeFavoriteSong = (trackId) => {
    const { listMusics } = this.state;
    this.setState({
      loanding: true,
    }, async () => {
      const favoriteMusic = listMusics.find((music) => music.trackId === trackId);
      await removeSong(favoriteMusic);
      await this.repairFavoriteMusics();
      this.setState({
        loanding: false,
      });
    });
  };

  checkboxFavoriteSongs = (trackId) => {
    this.removeFavoriteSong(trackId);
  };

  render() {
    const { artistName, albumName, listMusics, loanding, favoriteMusic } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { !loanding
          && (
            <section>
              <h1 data-testid="artist-name">
                { artistName }
              </h1>
              <h2 data-testid="album-name">
                { albumName }
              </h2>
              { listMusics.filter((music) => music.previewUrl)
                .map(({ trackName, previewUrl, trackId }) => (
                  <MusicCard
                    key={ trackName }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    checkboxFavoriteSongs={ this.checkboxFavoriteSongs }
                    favoriteMusic={ favoriteMusic }
                  />
                ))}
            </section>
          )}
        { loanding && <Loanding />}
      </div>
    );
  }
}

export default Favorites;
