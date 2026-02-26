// ── GitHub Projects · Live API Integration ───────────────────────────────────
// Edit GITHUB_USERNAME in hugo.toml → params.github
// This script fetches your public repos and renders them automatically.

(function () {
  const container = document.getElementById('github-projects-grid');
  if (!container) return;

  const username = container.dataset.username;
  if (!username || username === 'yourusername') {
    container.innerHTML = renderPlaceholder();
    return;
  }

  const LANG_CLASSES = {
    'C': 'c', 'C++': 'c', 'Python': 'py', 'Rust': 'rs',
    'Go': 'go', 'JavaScript': 'js', 'TypeScript': 'js',
    'Shell': 'c', 'Assembly': 'c'
  };

  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=public`)
    .then(r => {
      if (!r.ok) throw new Error('GitHub API error');
      return r.json();
    })
    .then(repos => {
      // Filter out forks, sort by stars then updated
      const filtered = repos
        .filter(r => !r.fork && r.description)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 8);

      if (!filtered.length) {
        container.innerHTML = '<div class="projects-loading">No public repos found</div>';
        return;
      }

      container.innerHTML = filtered.map(repo => renderCard(repo)).join('');
    })
    .catch(() => {
      container.innerHTML = renderPlaceholder();
    });

  function renderCard(repo) {
    const lang = repo.language || 'Code';
    const langClass = LANG_CLASSES[lang] || 'js';
    const updated = timeAgo(new Date(repo.updated_at));

    return `
      <div class="project-card">
        <div class="pc-header">
          <span class="pc-lang ${langClass}">${lang}</span>
          <span class="pc-stars">★ ${repo.stargazers_count}</span>
        </div>
        <div class="pc-name">${escHtml(repo.name)}</div>
        <div class="pc-desc">${escHtml(repo.description || '')}</div>
        <div class="pc-footer">
          <span class="pc-updated">Updated ${updated}</span>
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="pc-link">→ github</a>
        </div>
      </div>
    `;
  }

  function renderPlaceholder() {
    const placeholders = [
      { lang: 'c',  name: 'phantomfuzz',  stars: '—', desc: 'Coverage-guided fuzzer for binary-only targets. Update your GitHub username in hugo.toml to load live repos.', updated: '—' },
      { lang: 'rs', name: 'binscan-rs',   stars: '—', desc: 'Fast binary analysis library in Rust. Parses ELF/PE/Mach-O and outputs structured JSON.', updated: '—' },
      { lang: 'py', name: 'revml',         stars: '—', desc: 'ML pipeline for decompiler output cleaning and function semantic recovery.', updated: '—' },
      { lang: 'go', name: 'firmwatch',     stars: '—', desc: 'Automated firmware crawler and change detector for popular IoT vendors.', updated: '—' },
    ];
    return placeholders.map(p => `
      <div class="project-card">
        <div class="pc-header">
          <span class="pc-lang ${p.lang}">${p.lang.toUpperCase()}</span>
          <span class="pc-stars">★ ${p.stars}</span>
        </div>
        <div class="pc-name">${p.name}</div>
        <div class="pc-desc">${p.desc}</div>
        <div class="pc-footer">
          <span class="pc-updated">Set github username →</span>
          <span class="pc-link" style="color:var(--text3)">hugo.toml</span>
        </div>
      </div>
    `).join('');
  }

  function timeAgo(date) {
    const s = Math.floor((Date.now() - date) / 1000);
    if (s < 3600)   return Math.floor(s / 60) + 'm ago';
    if (s < 86400)  return Math.floor(s / 3600) + 'h ago';
    if (s < 604800) return Math.floor(s / 86400) + 'd ago';
    if (s < 2592000) return Math.floor(s / 604800) + 'w ago';
    return Math.floor(s / 2592000) + 'mo ago';
  }

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();
