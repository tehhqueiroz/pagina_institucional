document.getElementById('ano').textContent = new Date().getFullYear();

const alternarMenu = document.getElementById('alternarMenu');
const navSite = document.getElementById('nav-site');
alternarMenu.addEventListener('click', () => {
  const aberto = navSite.classList.toggle('aberto');
  alternarMenu.setAttribute('aria-expanded', String(aberto));
});

const voltarTopo = document.getElementById('voltarTopo');
voltarTopo.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const depoimentos = [
  { texto: '“Experiência impecável! Saí renovada. A Victoria explica tudo e monta um protocolo perfeito pra você.”', autor: '— Juliana M.' },
  { texto: '“A drenagem foi maravilhosa. Atendimento humano e ambiente super calmo.”', autor: '— Andrea M.' },
  { texto: '“Minha pele mudou real. Higiene, técnica e carinho.”', autor: '— Carla M.' }
];

let indice = 0;
const citacao = document.getElementById('citacao');

function renderizarCitacao() {
  citacao.innerHTML = `${depoimentos[indice].texto}<footer>${depoimentos[indice].autor}</footer>`;
}

document.getElementById('depoimentoAnterior').addEventListener('click', () => {
  indice = (indice - 1 + depoimentos.length) % depoimentos.length;
  renderizarCitacao();
});

document.getElementById('proximoDepoimento').addEventListener('click', () => {
  indice = (indice + 1) % depoimentos.length;
  renderizarCitacao();
});

const formulario = document.getElementById('formularioContato');
const aviso = document.getElementById('aviso');

function mostrarErro(nome, msg) {
  const small = formulario.querySelector(`.erro[data-for="${nome}"]`);
  if (small) small.textContent = msg || '';
}

function limparErros() {
  ['nome', 'email', 'mensagem'].forEach(n => mostrarErro(n, ''));
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  limparErros();

  const dados = new FormData(formulario);
  const nome = (dados.get('nome') || '').toString().trim();
  const email = (dados.get('email') || '').toString().trim();
  const mensagem = (dados.get('mensagem') || '').toString().trim();

  let ok = true;

  if (!nome) { mostrarErro('nome', 'Informe seu nome.'); ok = false; }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) { mostrarErro('email', 'E-mail inválido.'); ok = false; }
  if (!mensagem || mensagem.length < 10) { mostrarErro('mensagem', 'Escreva ao menos 10 caracteres.'); ok = false; }

  if (!ok) return;

  formulario.reset();
  aviso.hidden = false;
  setTimeout(() => { aviso.hidden = true; }, 3000);
});

renderizarCitacao();
