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
                // 'X-RapidAPI-Key': '28cbfd1d3emsh1a81aa64dbc6f49p1a28d6jsn68b94c0af120',
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
