let musicas = [
  {
    titulo: "Love Me Tender",
    artista: "Elvis Presley",
    src: "music/01 Love Me Tender.mp3",
    img: "img/cover (1).jpg",
  },
  {
    titulo: "Fast Car",
    artista: "Tracy Chapman",
    src: "music/1-10 Fast Car.mp3",
    img: "img/cover (2).jpg",
  },
  {
    titulo: "I Dont Wanna Lose You",
    artista: "Tina Turner",
    src: "music/1-13 I Don't Wanna Lose You.mp3",
    img: "img/cover (3).jpg",
  },
];

let musica = document.querySelector("audio");
let indexMusica = 0;
let duracaoMusica = document.querySelector(".fim");
let imagem = document.querySelector("#cover-img");
let nomeMusica = document.querySelector(".description h2");
let nomeArtista = document.querySelector(".description i");

renderizarMusica(indexMusica);

document.querySelector(".play-btn").addEventListener("click", tocarMusica);
document.querySelector(".pause-btn").addEventListener("click", pausarMusica);

musica.addEventListener("timeupdate", atualizarBarra);

document.querySelector(".prev-btn").addEventListener("click", () => {
  indexMusica--;
  if (indexMusica < 0) {
    indexMusica = 2;
  }
  renderizarMusica(indexMusica);
});

document.querySelector(".next-btn").addEventListener("click", () => {
  indexMusica++;
  if (indexMusica > 2) {
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
});

function renderizarMusica(index) {
  musica.setAttribute("src", musicas[index].src);
  musica.addEventListener("loadeddata", () => {
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    duracaoMusica.textContent = segundosParaMinutos(
      Math.floor(musica.duration)
    );
  });
}

function tocarMusica() {
  musica.play();
  document.querySelector(".pause-btn").style.display = "block";
  document.querySelector(".play-btn").style.display = "none";
}

function pausarMusica() {
  musica.pause();
  document.querySelector(".play-btn").style.display = "block";
  document.querySelector(".pause-btn").style.display = "none";
}

function atualizarBarra() {
  let statusBar = document.querySelector("progress");

  statusBar.style.width =
    Math.floor((musica.currentTime / musica.duration) * 100) + "%";

  let tempoDecorrido = document.querySelector(".inicio");
  tempoDecorrido.textContent = segundosParaMinutos(
    Math.floor(musica.currentTime)
  );
}

function segundosParaMinutos(segundos) {
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;

  if (campoSegundos < 10) {
    campoSegundos = "0" + campoSegundos;
  }
  return campoMinutos + ":" + campoSegundos;
}
