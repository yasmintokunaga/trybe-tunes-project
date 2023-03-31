import React from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      checkboxFavoriteSongs,
      favoriteMusic,
    } = this.props;
    return (
      <div className="box mb-5 media">
        <label className="card-content">
          <i
            className={
              `${favoriteMusic.includes(trackId)
                ? 'fa-solid' : 'fa-regular'} fa-heart`
            }
          >
            <input
              data-testid={ `checkbox-music-${trackId}` }
              id="checkbox"
              type="checkbox"
              onChange={ () => checkboxFavoriteSongs(trackId) }
              checked={ favoriteMusic.includes(trackId) }
            />
          </i>
        </label>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
          className="mt-2"
        >
          <track
            kind="captions"
          />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
          .
        </audio>

        <div className="card-content">
          <p><em>{ trackName }</em></p>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checkboxFavoriteSongs: PropTypes.func.isRequired,
  favoriteMusic: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
