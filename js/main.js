import "./modules/left.js"

class myframe extends HTMLElement{
    id
    constructor(id){
        super();
        this.attachShadow({mode: "open"});
    }
    connectedCallback(){
        this.shadowRoot.innerHTML = /*html*/`
            <iframe class="spotify-iframe" width="350" height="370" src="https://open.spotify.com/embed/track/${this.id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
           
        `
        
    }
    static get observedAttributes(){
        return ["uri"];
    }
    attributeChangedCallback(name,old,now){
        let[nameUri, album, id] = now.split(":")
        this.id = id;
    }
}
customElements.define("my-frame",myframe)
