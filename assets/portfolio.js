const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const narrow = window.matchMedia('(max-width: 700px)');
function syncMenu() {
  menu.hidden = !narrow.matches;
  menu.setAttribute('aria-expanded', 'false');
  navigation.dataset.open = narrow.matches ? 'false' : 'true';
}
syncMenu();
narrow.addEventListener('change', syncMenu);
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.dataset.open = String(open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a') && narrow.matches) syncMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    syncMenu();
    menu.focus();
  }
});
const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.project')];
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  projects.forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && !project.dataset.category.split(' ').includes(button.dataset.filter);
    if (!project.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = `${count} projects shown`;
});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('arriving');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  document.querySelectorAll('.section-intro, .project, .section__head, .work-item, .education-item, .skill-group, .credential, .about-section > *, .contact-section > *').forEach(item => observer.observe(item));
}
