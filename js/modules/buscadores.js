// INPUT PRINCIPAL


class SearchSongs extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <style>
          .albumBusquedaPrincipal{
            display: flex;
            width: 550px;
            height: 40px;
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


          @media screen and (max-width: 768px) {
            .albumBusquedaPrincipal{
              display: flex;
              width: 350px;
              height: 40px;
              margin-top: 3%;
              margin-left: 4%;
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
              console.log(query);
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
            'x-rapidapi-key': 'e34bdfae52msh91357a54d1e17fcp1622f5jsn4f41d4badf22',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        
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
      this.songSearch = null
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

      @media screen and (max-width: 768px) {
        .cancionBuscar{
          display: flex;
          width: 350px;
          height: 40px;
          margin-top: 4%;
          margin-left: 0%;
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
      this.songSearch = this.shadowRoot.querySelector('input');
      this.songSearch.addEventListener('input', this.handleInput.bind(this));
      console.warn(this.shadowRoot.querySelector('input'));

  }

  async handleInput() {

      let query = this.songSearch.value.trim().toLowerCase();
      console.log(query);

      if (query.length > 0) {
          this.searchAndDisplaySongs(query);
      }
  }

  async searchAndDisplaySongs(query) {
      const codeBase = query.replace(/\s/g, '%20');
      const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=tracks&offset=0&limit=50&numberOfTopResults=50`;
      const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'e34bdfae52msh91357a54d1e17fcp1622f5jsn4f41d4badf22',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        
          }
      };
      console.log(query);
      try {
          const response = await fetch(url, options);
          const result = await response.json();
          const tracks = result.tracks.items.map(item => item.data);
          console.log(tracks);
          if (tracks.length > 0) {
              this.updateTrackList(tracks);
          }
      } catch (error) {
          console.error(error);
          alert('Error searching for tracks');
      }
  }

    updateTrackList(tracks) {
      const trackList = document.querySelector('track-list');
       const images = trackList.querySelectorAll('img');
        console.log("ante de envir", tracks);
       trackList.updateTracks(tracks);

       console.log(trackList);
      images?.forEach(img => {
          img.addEventListener('click', () => {
              const uri = img.dataset.uri;
              const myFrame = document.querySelector('my-frame');
              myFrame.setAttribute('uri', uri); 
          });
      }
    );
  }



}

customElements.define('track-search', TrackSearch);
