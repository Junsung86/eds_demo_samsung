function createIcon(name) {
  const span = document.createElement('span');
  span.classList.add('icon', `icon-${name}`);
  return span;
}

async function loadIcons(block) {
  const icons = block.querySelectorAll('span.icon');
  icons.forEach(async (icon) => {
    const name = Array.from(icon.classList)
      .find((cls) => cls.startsWith('icon-'))
      ?.substring(5);
    if (!name) return;
    try {
      const resp = await fetch(`/icons/${name}.svg`);
      if (resp.ok) {
        const svg = await resp.text();
        const span = icon;
        span.innerHTML = svg;
      }
    } catch {
      // icon load failed silently
    }
  });
}

export default async function decorate(block) {
  const dateText = block.querySelector('div')?.textContent?.trim() || '';
  block.textContent = '';

  const date = document.createElement('div');
  date.classList.add('article-info-date');
  date.textContent = dateText;

  const actions = document.createElement('div');
  actions.classList.add('article-info-actions');

  const shareLabel = document.createElement('span');
  shareLabel.classList.add('article-info-label');
  shareLabel.textContent = 'Share';

  const shareBtn = document.createElement('button');
  shareBtn.classList.add('article-info-btn');
  shareBtn.setAttribute('aria-label', 'Share');
  shareBtn.append(createIcon('share'));
  shareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  });

  const printBtn = document.createElement('button');
  printBtn.classList.add('article-info-btn');
  printBtn.setAttribute('aria-label', 'Print');
  printBtn.append(createIcon('print'));
  printBtn.addEventListener('click', () => {
    window.print();
  });

  actions.append(shareLabel, shareBtn, printBtn);
  block.append(date, actions);

  await loadIcons(block);
}
