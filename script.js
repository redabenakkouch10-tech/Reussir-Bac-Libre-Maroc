const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    document.querySelectorAll('.resource-card').forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
    });
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();
const ideaForm = document.querySelector('#idea-form');
ideaForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const idea = document.querySelector('#idea').value.trim();
  if (!idea) return;
  const message = `Idée pour Réussir Bac Libre Maroc : ${idea}`;
  try {
    await navigator.clipboard.writeText(message);
    document.querySelector('#form-message').textContent = 'Ton idée a été copiée ! Tu peux la coller dans tes notes ou nous la transmettre.';
  } catch {
    document.querySelector('#form-message').textContent = `Ton idée : « ${idea} ». Copie-la pour la garder : cette version ne l’envoie pas automatiquement.`;
  }
});
