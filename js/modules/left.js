

class AlbumPictures extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const index = parseInt(this.getAttribute('index')) || 0;
        this.loadAlbums('The weeknd', index);
    }

    async loadAlbums(searchTerm, index) {
        const mainCode = searchTerm.replace(/\s/g, '%20');
        const url = `https://spotify23.p.rapidapi.com/search/?q=${mainCode}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
        const options = {
            method: 'GET',
            headers: {
                // 'X-RapidAPI-Key': 'c62248404amsh7c48cf70d45bb8ep1550b3jsn37fe5e39063b',
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
            this.innerHTML = `<p>Error loading albums</p>`;
        }
    }
}

customElements.define('album-pictures', AlbumPictures);