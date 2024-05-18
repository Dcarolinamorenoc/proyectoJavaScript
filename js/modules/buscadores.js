// --------------------- INPUT izquierdo  ---------------------------

class AlbumFilter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
        .input {
            width: 230%;
            background-color: #1a1a1a;
            border: none;
            padding: 10px;
            border-radius: 10px;
            outline: none;
            color: white;
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
        <div class="albumBuscar">
            <input placeholder="Which album do you want to hear?" id="left_input" class="input" name="text" type="text" />
        </div>
      `;
      this.albums = []; // Array para almacenar los álbumes cargados desde el JSON
    }
  
    connectedCallback() {
      this.albumSearch = this.shadowRoot.querySelector('.albumSearch');
      this.albumSearchBTN = this.shadowRoot.querySelector('.albumSearchBTN');
  
      this.albumSearch.addEventListener('input', this.handleInput.bind(this));
      // También necesitas añadir el evento input aquí para detectar cuando se modifique el campo de búsqueda.
  
      // Cargar los álbumes desde el archivo JSON cuando se cargue el componente
      this.loadAlbums();
    }
  
    async loadAlbums() {
      try {
        const response = await fetch('./db/albums.json');
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json();
        this.albums = data.albums;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    handleInput() {
      const query = this.albumSearch.value.trim().toLowerCase();
      if (query.length === 0) {
        this.renderAlbums(this.albums); // Mostrar todos los álbumes si la búsqueda está vacía
        return;
      }
  
      // Filtrar álbumes que coincidan con el término de búsqueda
      const filteredAlbums = this.albums.filter(album => album.name.toLowerCase().includes(query));
      this.renderAlbums(filteredAlbums);
    }
  
    renderAlbums(albums) {
        const albumList = this.shadowRoot.querySelector('#albumList');
        albumList.innerHTML = ''; // Limpiar la lista antes de mostrar los nuevos resultados
        const ol = document.createElement('ol');
        albums.forEach(album => {
          const li = document.createElement('li');
          li.textContent = album.name;
          ol.appendChild(li);
        });
        albumList.appendChild(ol);
      }
  }
  
  customElements.define('album-filter', AlbumFilter);