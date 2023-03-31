import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loanding from '../components/Loanding';

class Album extends React.Component {
  state = {
    listMusics: [],
    artistName: '',
    albumName: '',
    loanding: false,
    favoriteMusic: [],
  };

  componentDidMount() {
    this.fetchMusics();
    this.repairFavoriteMusics();
  }

  repairFavoriteMusics = async () => {
    const savedFavorites = await getFavoriteSongs();
    const newSaved = [...new Set(savedFavorites)];
    const trackIds = newSaved.map(({ trackId }) => trackId);
    this.setState({
      favoriteMusic: [...new Set(trackIds)],
    });
  };

  fetchMusics = async () => {
    const { pathname } = window.location;
    const id = pathname.split('/')[2];
    const listMusics = await getMusics(id);
    this.setState({
      listMusics,
      artistName: listMusics[0].artistName,
      albumName: listMusics[0].collectionName,
    });
  };

  saveSong = (trackId) => {
    const { listMusics } = this.state;
    this.setState({
      loanding: true,
    }, async () => {
      const favoriteMusic = listMusics.find((music) => music.trackId === trackId);
      await addSong(favoriteMusic);
      this.setState({
        loanding: false,
      });
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

  // removeFavoriteSong = (trackId) => {
  //   const { listMusics } = this.state;
  //   listMusics.forEach( async (music) => {
  //     await removeSong(music);
  //   })
  //     this.setState({
  //       loanding: false,
  //       favoriteMusic: [],
  //     });
  // };

  checkboxFavoriteSongs = (trackId) => {
    const { favoriteMusic } = this.state;
    if (favoriteMusic.includes(trackId)) {
      this.removeFavoriteSong(trackId);
    } else {
      this.saveSong(trackId);
      this.setState((prevState) => ({
        favoriteMusic: [...prevState.favoriteMusic, trackId],
      }));
    }
  };

  render() {
    const { artistName, albumName, listMusics, loanding, favoriteMusic } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { !loanding
          && (
            <section className="mt-5 ml-6 mr-6">
              <h3 data-testid="artist-name" className="title is-3">
                { artistName }
              </h3>
              <h4 data-testid="album-name" className="title is-4">
                { albumName }
              </h4>
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

export default Album;
