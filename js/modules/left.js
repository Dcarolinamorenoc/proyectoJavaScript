

class AlbumPictures extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const index = parseInt(this.getAttribute('index')) || 0;
        this.loadAlbums('The weeknd', index);
    }

    async loadAlbums(lookFor, index) {
        const mainCode = lookFor.replace(/\s/g, '%20');
        const url = `https://spotify23.p.rapidapi.com/search/?q=${mainCode}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
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

            if (result.albums.items.length > index) {
                const albumData = result.albums.items[index].data;
                if (albumData && albumData.coverArt && albumData.coverArt.sources.length > 0) {
                    const primeraUrl = albumData.coverArt.sources[0].url;
                    const uri = albumData.uri;
                    const id = uri.split(':')[2];
                    this.innerHTML = `
                        <img id="album__${index + 1}" src="${primeraUrl}" alt="" data-id="${id}">
                    `;

                    this.querySelector('img').addEventListener('click', () => {
                        const myFrame = document.querySelector('my-frame');
                        myFrame.setAttribute('uri', `spotify:album:${id}`);
                        const AlbumTracksComponent = document.querySelector('.trackList');
                        AlbumTracksComponent.setAttribute('uri', `spotify:album:${id}`);
                    });
                }
            } else {
                this.innerHTML = `<p>No results found</p>`;
            }
        } catch (error) {
            console.error(error);
            this.innerHTML = `<p>Error with the albums</p>`;
        }
    }
}

customElements.define('album-pictures', AlbumPictures);




// TITLES

class AlbumTitles extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const index = parseInt(this.getAttribute('index')) || 0;
        this.loadSongs('coldplay', index);
    }

    async loadSongs(lookFor, index) {
        const codeBase = lookFor.replace(/\s/g, '%20');
        const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c62248404amsh7c48cf70d45bb8ep1550b3jsn37fe5e39063b',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (result.albums.items.length > index) {
                const albumData = result.albums.items[index].data;
                if (albumData) {
                    const albumTitle = albumData.name;
                    this.innerHTML = `
                        <h2>${albumTitle}</h2>
                    `;
                }
            } else {
                this.innerHTML = `<p>No results found</p>`;
            }
        } catch (error) {
            console.error(error);
            this.innerHTML = `<p>Error loading titles</p>`;
        }
    }
}

customElements.define('album-titles', AlbumTitles);



// Funcion para el search


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('left_input');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const lookFor = document.getElementById('search').value;
        updateAlbumsAndSongs(lookFor);
    });
});

function updateAlbumsAndSongs(lookFor) {
    document.querySelectorAll('album-pictures').forEach((element, index) => {
        element.loadAlbums(lookFor, index);
    });

    document.querySelectorAll('album-titles').forEach((element, index) => {
        element.loadSongs(lookFor, index);
    });

}

// You may like

class MayLike extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const genres = ['pop', 'rock', 'hip-hop', 'jazz', 'classical', 'country', 'electronic', 'reggae', 'blues', 'latin']; // Puedes agregar más géneros aquí
        const fetchSongsByGenre = async (genre) => {
            const url = `https://spotify23.p.rapidapi.com/search/?q=${genre}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
            const options = {
                method: 'GET',
                headers: {
                    // 'X-RapidAPI-Key': '28cbfd1d3emsh1a81aa64dbc6f49p1a28d6jsn68b94c0af120',
                    // 'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const result = await response.json();
            return result.tracks.items;
        };

        try {
            let allSongs = [];
            let selectedGenres = [];

            // Selecciona aleatoriamente 6 géneros
            while (selectedGenres.length < 6) {
                const randomGenre = genres[Math.floor(Math.random() * genres.length)];
                if (!selectedGenres.includes(randomGenre)) {
                    selectedGenres.push(randomGenre);
                }
            }

            for (const genre of selectedGenres) {
                const songs = await fetchSongsByGenre(genre);
                if (songs && songs.length > 0) {
                    allSongs.push(songs[Math.floor(Math.random() * songs.length)]); // Selecciona una canción aleatoria de cada género
                }
            }

            let templates = '';
            allSongs.forEach(track => {
                const trackData = track.data;
                // Primera URL de la portada del álbum
                const primeraUrl = trackData.albumOfTrack.coverArt.sources[0].url;
                // Nombre de la canción
                const nombre = trackData.name;
                // Nombre del artista
                const artista = trackData.artists.items.map(artist => artist.profile.name).join(', ');
                // Duración de la canción en milisegundos
                const durationMs = trackData.duration.totalMilliseconds;
                // Convertir a minutos y segundos
                const minutes = Math.floor(durationMs / 60000);
                const seconds = Math.floor((durationMs % 60000) / 1000).toString().padStart(2, '0');

                templates += `
                <div class="left_youMayLikeListBoxes">
                    <div class="left_youMayLikeListImg">
                        <img src="${primeraUrl}" alt="list">
                    </div>
                    <div class="left_youMayLikeListDescription">
                        <h3>${nombre}</h3>
                        <p>${artista}</p>
                    </div>
                    <div class="left_youMayLikeListTime">
                        <h3>${minutes}:${seconds}</h3>
                    </div>
                </div>
                `;
            });

            if (templates === '') {
                console.log('No se encontraron canciones para los géneros seleccionados');
            }
            this.innerHTML = templates;
        } catch (error) {
            console.error(error);
        }
    }
}

customElements.define('may-like', MayLike);
