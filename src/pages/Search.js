import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const {
      handleChange,
      nameArtist,
      nameSearch,
      btnSearchArtist,
      handleBtnSearch,
      loanding,
      listSearchArtist,
      statusSearch,
    } = this.props;

    return (
      <div data-testid="page-search">
        <Header />
        { !loanding
          && (
            <form className="m-4">
              <div className="panel-block">
                <p className="control has-icons-left">
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    className="input is-normal"
                    placeholder="Pesquise pelo nome do artista ou banda"
                    name="nameArtist"
                    onChange={ handleChange }
                    value={ nameArtist }
                  />
                  <span className="icon is-left">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                </p>
                <button
                  data-testid="search-artist-button"
                  className="button has-background-white-ter"
                  disabled={ btnSearchArtist }
                  onClick={ handleBtnSearch }
                >
                  Pesquisar
                </button>
              </div>
            </form>
          )}

        { statusSearch === 'found'
        && (
          <section className="mt-5 ml-6 mr-6">
            <h3 className="title is-3">
              Álbuns encontrados:
              {' '}
              <em>
                { nameSearch }
              </em>
            </h3>
            <ul>
              { listSearchArtist.map(({
                artistName,
                collectionId,
                collectionName,
                artworkUrl100,
              }) => (
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                  key={ collectionId }
                >
                  <li className="box mb-5">
                    <div className="media">
                      <figure className="image is-128x128">
                        <img src={ artworkUrl100 } alt={ collectionName } />
                      </figure>
                      <div className="media-content ml-6">
                        <p className="title is-5">{ artistName }</p>
                        <p className="subtitle is-7">
                          #
                          { collectionId }
                        </p>
                        <div className="content">{ collectionName }</div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </section>
        )}

        { statusSearch === 'notfound'
        && <span>Nenhum álbum foi encontrado</span>}
      </div>
    );
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  nameArtist: PropTypes.string.isRequired,
  nameSearch: PropTypes.string.isRequired,
  btnSearchArtist: PropTypes.bool.isRequired,
  handleBtnSearch: PropTypes.func.isRequired,
  loanding: PropTypes.bool.isRequired,
  statusSearch: PropTypes.string.isRequired,
  listSearchArtist: PropTypes.arrayOf(PropTypes.shape({ // sou um array de objeto
    artistId: PropTypes.number, // sou um tipo numérico
    artistName: PropTypes.string, // sou um tipo string
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  })).isRequired,
};

export default Search;
