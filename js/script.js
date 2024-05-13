const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const albumDescubrir = document.querySelectorAll('.albumDescubrir');
const albumTalVezTeGuste = document.querySelectorAll('.albumTalVezTeGuste');
const main = document.querySelectorAll('.main');
const cancion = document.querySelectorAll('.cancion');
const albumGaleria = document.querySelectorAll('.albumGaleria');
const centro = document.querySelectorAll('.centro');

// Verificar el estado inicial del modo oscuro
if (body.style.background === 'black') {
    toggle.classList.add('bi-moon');
    toggle.classList.remove('bi-brightness-high-fill');
} else {
    toggle.classList.add('bi-brightness-high-fill');
    toggle.classList.remove('bi-moon');
}

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    this.classList.toggle('bi-brightness-high-fill');
    if(body.style.background === 'white'){
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '2s';
        albumDescubrir.forEach(album => {
            album.style.background = '#121212';
            album.style.color = 'white';
            album.style.transition = '2s';
        });
        albumTalVezTeGuste.forEach(album => {
            album.style.background = '#121212';
            album.style.color = 'white';
            album.style.transition = '2s';
        });
        main.forEach(mainElement => {
            mainElement.style.background = '#121212';
            mainElement.style.color = 'white';
            mainElement.style.transition = '2s';
        });
        cancion.forEach(cancionElement => {
            cancionElement.style.background = '#121212';
            cancionElement.style.color = 'white';
            cancionElement.style.transition = '2s';
        });
        albumGaleria.forEach(albumGaleria => {
            albumGaleria.style.background = '#121212'; // Color diferente en modo oscuro
            albumGaleria.style.color = 'white';
            albumGaleria.style.transition = '2s';
        });
        centro.forEach(centroElement => {
            centroElement.style.background = '#121212'; // Color diferente en modo oscuro
            centroElement.style.color = 'white';
            centroElement.style.transition = '2s';
        });
    } else {
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s';
        albumDescubrir.forEach(album => {
            album.style.background = '#64B25E';
            album.style.color = 'black';
            album.style.transition = '2s';
        });
        albumTalVezTeGuste.forEach(album => {
            album.style.background = '#64B25E';
            album.style.color = 'black';
            album.style.transition = '2s';
        });
        main.forEach(mainElement => {
            mainElement.style.background = '#64B25E'; 
            mainElement.style.color = 'black';
            mainElement.style.transition = '2s';
        });
        cancion.forEach(cancionElement => {
            cancionElement.style.background = '#64B25E';
            cancionElement.style.color = 'black';
            cancionElement.style.transition = '2s';
        });
        albumGaleria.forEach(albumGaleria => {
            albumGaleria.style.background = '#64B25E';
            albumGaleria.style.color = 'black';
            albumGaleria.style.transition = '2s';
        });
        centro.forEach(centroElement => {
            centroElement.style.background = '#64B25E';
            centroElement.style.color = 'black';
            centroElement.style.transition = '2s';
        });
    }
});



