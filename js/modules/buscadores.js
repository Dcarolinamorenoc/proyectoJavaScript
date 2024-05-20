// INPUT PRINCIPAL


class SearchSongs extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <style>
          .albumBusquedaPrincipal{
            display: flex;
            width: 90%;
            height: 200%;
            margin-top: 0%;
            margin-left: 5%;
          }

          .input {
            width: 100%;
            height: 100%;
            background-color: #1a1a1a;
            border: none;
            border-radius: 10px;
            outline: none;
            color: white;
            padding-left: 2%;
          }
          
          .input:focus {
            animation: rotateShadow 2s infinite linear;
          }
          
          @keyframes rotateShadow {
            0% {
              box-shadow: -2px -2px 8px 1px #66d88c, 2px 2px 8px 1px #2b682e;
            }
            25% {
              box-shadow: -2px 2px 8px 1px #66d88c, 2px -2px 8px 1px #2b682e;
            }
            50% {
              box-shadow: 2px 2px 8px 1px #66d88c, -2px -2px 8px 1px #2b682e;
            }
            75% {
              box-shadow: 2px -2px 8px 1px #66d88c, -2px 2px 8px 1px #2b682e;
            }
            100% {
              box-shadow: -2px -2px 8px 1px #66d88c, 2px 2px 8px 1px #2b682e;
            }
          }
          </style>
        <div class="albumBusquedaPrincipal">
          <input placeholder="Which song do you want to hear?" class="input" name="text" type="text" />
        </div>
        <div id="songList"></div>
      `;
  }

  connectedCallback() {
      this.songSearch = this.shadowRoot.querySelector('.input');
      this.songSearch.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          const query = this.songSearch.value.trim();
          if (query) {
              this.searchAndDisplaySongs(query);
          }
      }
  }

  async searchAndDisplaySongs(query) {
      const codeBase = query.replace(/\s/g, '%20');
      const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=tracks&offset=0&limit=1&numberOfTopResults=1`;
      const options = {
          method: 'GET',
          headers: {
            // 'X-RapidAPI-Key': '36328a7ef5msh51379a468a6c67bp1619bbjsnb801fa508c30',
            // 'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
      };

      try {
          const response = await fetch(url, options);
          const result = await response.json();
          const track = result.tracks.items[0].data;
          if (track) {
              this.playSong(track);
          } else {
              this.clearResults();
          }
      } catch (error) {
          console.error(error);
          alert('Error in the track');
      }
  }

  playSong(song) {
      const trackUri = song.uri;
      const myFrame = document.querySelector('my-frame');
      myFrame.setAttribute('uri', trackUri);
  }

  clearResults() {
      const songList = this.shadowRoot.querySelector('#songList');
      songList.innerHTML = '';
  }
}

customElements.define('search-songs', SearchSongs);



// INPUT TRACKLIST

class TrackSearch extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
        .cancionBuscar {
          display: flex;
          width: 90%;
          height: 2rem;
          margin-left: 5%;
          margin-top: -2%;
          margin-bottom: 0.4rem;
        }

        .input {
          width: 90%;
          height: 100%;
          background-color: #1a1a1a;
          border: none;
          border-radius: 10px;
          outline: none;
          color: white;
          padding-left: 2%;
          margin-left: 5%;
        }
        
        .input:focus {
          animation: rotateShadow 2s infinite linear;
        }
        
        @keyframes rotateShadow {
          0% {
            box-shadow: -2px -2px 8px 1px #66d88c, 2px 2px 8px 1px #2b682e;
          }
          25% {
            box-shadow: -2px 2px 8px 1px #66d88c, 2px -2px 8px 1px #2b682e;
          }
          50% {
            box-shadow: 2px 2px 8px 1px #66d88c, -2px -2px 8px 1px #2b682e;
          }
          75% {
            box-shadow: 2px -2px 8px 1px #66d88c, -2px 2px 8px 1px #2b682e;
          }
          100% {
            box-shadow: -2px -2px 8px 1px #66d88c, 2px 2px 8px 1px #2b682e;
          }
        }
      </style>
      <div class="cancionBuscar">
        <input placeholder="Which song do you want to hear?" class="input" name="text" type="text" />
      </div>
      <div id="songList"></div>
      `;
  }

  connectedCallback() {
    this.songSearch = this.shadowRoot.querySelector('.input');
    this.songSearch.addEventListener('input', this.handleInput.bind(this));
    this.songSearch.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  async handleInput() {
    const query = this.songSearch.value.trim();
    if (query.length > 0) {
        const trackList = document.querySelector('track-list');
        trackList.updateTracks([], '', query);
        try {
            await this.searchAndDisplaySongs(query);
        } catch (error) {
            console.error(error);
            alert('Error searching for tracks');
        }
    }
}

  handleKeyup(event) {
    if (event.key === 'Enter') {
      const query = this.songSearch.value.trim();
      if (query.length > 0) {
        const trackList = document.querySelector('track-list');
        trackList.updateTracks([], '', query);
        this.searchAndDisplaySongs(query);
      }
    }
  }

  async searchAndDisplaySongs(query) {
    const codeBase = query.replace(/\s/g, '%20');
    const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=tracks&offset=0&limit=1&numberOfTopResults=1`;
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '659a19a7b5msh73d57d408386845p127656jsnc10854319763',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const result = await response.json();
        console.log('API Result:', result); // Verifica los resultados de la API
        const tracks = result.tracks.items;
        if (tracks.length > 0) {
            const track = tracks[0].data;
            this.playSong(track);
            const trackList = document.querySelector('track-list');
            trackList.updateTrackListBySearch(track.name);
        } else {
            const trackList = document.querySelector('track-list');
            trackList.updateTracks([], '', ''); // Limpiar el track list si no se encuentran resultados
            alert('No se encontraron resultados para la búsqueda');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener los resultados de la búsqueda');
    }
  }


      updateTrackList(tracks) {
        const trackList = document.querySelector('track-list');
        trackList.updateTracks(tracks);

        const images = trackList.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('click', () => {
                const uri = img.dataset.uri;
                const myFrame = document.querySelector('my-frame');
                myFrame.setAttribute('uri', uri); // Establecer el URI de la canción en el my-frame al hacer clic en la imagen
            });
        });
    }


}

customElements.define('track-search', TrackSearch);