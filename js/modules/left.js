class AlbumPictures extends HTMLElement {
    constructor() {
        super();
        this.index = 0;
        this.artistName = 'The Weeknd'; // Valor predeterminado
    }

    async connectedCallback() {
        this.index = parseInt(this.getAttribute('index')) || 0;
        await this.loadAlbums(this.artistName, this.index);
    }

    async loadAlbums(lookFor, index) {
        const mainCode = lookFor.replace(/\s/g, '%20');
        const url = `https://spotify23.p.rapidapi.com/search/?q=${mainCode}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e63df90653msh97c3e66fd1d1e8fp10a4d3jsna654e517197b',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
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
                        if (myFrame) {
                            myFrame.setAttribute('uri', `spotify:album:${id}`);
                        }
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

    setArtistName(artistName) {
        this.artistName = artistName;
        this.loadAlbums(artistName, this.index);
    }
}

customElements.define('album-pictures', AlbumPictures);


// TITULO ALBUMS


class AlbumTitles extends HTMLElement {
    constructor() {
        super();
        this.index = 0;
        this.artistName = 'The Weeknd'; // Valor predeterminado
    }

    async connectedCallback() {
        this.index = parseInt(this.getAttribute('index')) || 0;
        await this.loadTitles(this.artistName, this.index);
    }

    async loadTitles(lookFor, index) {
        const mainCode = lookFor.replace(/\s/g, '%20');
        const url = `https://spotify23.p.rapidapi.com/search/?q=${mainCode}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
        const options = {
            method: 'GET',
            headers: {
                // 'X-RapidAPI-Key': '8b10b3432fmsh1d870176f64ffffp1e8efbjsnad29e1f1b690',
                // 'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (result.albums.items.length > index) {
                const albumData = result.albums.items[index].data;
                if (albumData) {
                    this.innerHTML = `${albumData.name}`;
                }
            } else {
                this.innerHTML = `<p>No results found</p>`;
            }
        } catch (error) {
            console.error(error);
            this.innerHTML = `<p>Error with the titles</p>`;
        }
    }

    setArtistName(artistName) {
        this.artistName = artistName;
        this.loadTitles(artistName, this.index);
    }
}

customElements.define('album-titles', AlbumTitles);


document.getElementById('artistInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const artistName = e.target.value;
        if (artistName) {
            document.querySelectorAll('album-pictures').forEach((element) => {
                element.setArtistName(artistName);
            });
            document.querySelectorAll('album-titles').forEach((element) => {
                element.setArtistName(artistName);
            });
        }
    }
});

window.addEventListener('load', () => {
    document.querySelectorAll('album-pictures').forEach((element) => {
        element.setArtistName('The Weeknd');
    });
    document.querySelectorAll('album-titles').forEach((element) => {
        element.setArtistName('The Weeknd');
    });
});





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
                    'X-RapidAPI-Key': 'e63df90653msh97c3e66fd1d1e8fp10a4d3jsna654e517197b',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
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
                const primeraUrl = trackData.albumOfTrack.coverArt.sources[0].url;
                const nombre = trackData.name;
                const artista = trackData.artists.items.map(artist => artist.profile.name).join(', ');
                const durationMs = trackData.duration.totalMilliseconds;
                const minutes = Math.floor(durationMs / 60000);
                const seconds = Math.floor((durationMs % 60000) / 1000).toString().padStart(2, '0');
                const trackUri = trackData.uri; // URI de la canción

                templates += `
                <div class="left_youMayLikeListBoxes">
                    <div class="left_youMayLikeListImg" data-uri="${trackUri}">
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

            this.querySelectorAll('.left_youMayLikeListImg').forEach(imgDiv => {
                imgDiv.addEventListener('click', (event) => {
                    const trackUri = event.currentTarget.getAttribute('data-uri');
                    const myFrame = document.querySelector('my-frame');
                    if (myFrame) {
                        myFrame.setAttribute('uri', trackUri);
                    }
                });
            });

        } catch (error) {
            console.error(error);
        }
    }
}

customElements.define('may-like', MayLike);
