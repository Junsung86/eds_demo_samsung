export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  // Row 1: Tags (links styled as pills)
  if (rows[0]) {
    const tagsDiv = document.createElement('div');
    tagsDiv.classList.add('article-tags-list');
    const links = rows[0].querySelectorAll('a');
    links.forEach((a) => {
      const pill = document.createElement('a');
      pill.href = a.href;
      pill.textContent = a.textContent.trim();
      pill.classList.add('article-tag');
      tagsDiv.append(pill);
    });
    block.append(tagsDiv);
  }

  // Row 2: Category breadcrumb
  if (rows[1]) {
    const catDiv = document.createElement('div');
    catDiv.classList.add('article-tags-category');
    catDiv.innerHTML = rows[1].querySelector('div')?.innerHTML || '';
    block.append(catDiv);
  }
}
