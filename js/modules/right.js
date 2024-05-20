
class SongsTracklist extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.renderFrame();
        document.querySelector('my-frame').addEventListener('uri-changed', (event) => {
            this.setAttribute('uri', event.detail.uri);
        });
    }

    async renderFrame() {
        const uri = this.getAttribute('uri');
        if (uri) {
            const id = uri.split(':')[2];
            await this.loadTrackList(id);
        }
    }

    async loadTrackList(albumId) {
        const url = `https://spotify23.p.rapidapi.com/albums/?ids=${albumId}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '659a19a7b5msh73d57d408386845p127656jsnc10854319763',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const album = result.albums[0];
            const imageUrl = album.images[2].url;

            let templates = '';
            album.tracks.items.forEach(track => {
                const durationMs = track.duration_ms;
                const minutes = Math.floor(durationMs / 60000);
                const seconds = Math.floor((durationMs % 60000) / 1000).toString().padStart(2, '0');

                templates += `
                    <div class="trackListBoxes">
                        <div class="trackListImg">
                            <img src="${imageUrl}" alt="trackList" data-uri="${track.uri}">
                        </div>
                        <div class="trackListDescription">
                            <h3>${track.name}</h3>
                            <p>${track.artists[0].name}</p>
                        </div>
                        <div class="trackListTime">
                            <h3>${minutes}:${seconds}</h3>
                        </div>
                    </div>
                `;
            });
            this.innerHTML = templates;

            setTimeout(() => {
                this.querySelectorAll('.track__songsName').forEach(track => {
                    track.classList.add('active');
                });
            }, 100);

            this.querySelectorAll('img').forEach(img => {
                img.addEventListener('click', () => {
                    const uri = img.dataset.uri;
                    const myFrame = document.querySelector('my-frame');
                    myFrame.setAttribute('uri', uri); // Establecer la URI de la canción en el my-frame
                });
            });            
        } catch (error) {
            console.error(error);
        }
    }

    static get observedAttributes() {
        return ['uri'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'uri' && oldValue !== newValue) {
            this.renderFrame();
        }
    }
}

customElements.define('track-list', SongsTracklist);


