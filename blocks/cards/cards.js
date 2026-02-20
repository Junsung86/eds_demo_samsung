import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const isArticleList = block.classList.contains('article-list');

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

  if (isArticleList) {
    ul.querySelectorAll('.cards-card-body').forEach((body) => {
      // decorate badge (em tag used as badge marker)
      body.querySelectorAll('em').forEach((em) => {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = em.textContent;
        em.replaceWith(badge);
      });
      // split content at <br> tags to separate title from date
      body.querySelectorAll('p').forEach((p) => {
        const brs = p.querySelectorAll('br');
        if (brs.length > 0) {
          const fragments = [];
          let current = document.createDocumentFragment();
          [...p.childNodes].forEach((node) => {
            if (node.nodeName === 'BR') {
              fragments.push(current);
              current = document.createDocumentFragment();
            } else {
              current.appendChild(node.cloneNode(true));
            }
          });
          fragments.push(current);
          p.textContent = '';
          fragments.forEach((frag) => {
            const text = frag.textContent.trim();
            if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
              const dateP = document.createElement('p');
              dateP.className = 'date';
              dateP.textContent = text;
              body.appendChild(dateP);
            } else if (text) {
              const newP = document.createElement('p');
              newP.appendChild(frag);
              body.appendChild(newP);
            }
          });
          p.remove();
        }
      });
    });
  }

  block.replaceChildren(ul);
}
