// fp-nav.js — Final Project left navigation
(function() {
    const navHTML = `
        <h2 class="fp-nav-title">Final Project</h2>

        <nav class="fp-nav-section" aria-label="Final Project assignments">
            <p class="fp-nav-section-title">Assignments</p>
            <a href="/final-project/" class="fp-nav-link" data-page="index">Final Project Overview</a>
            <a href="#" class="fp-nav-link placeholder" data-page="brainstorming">Brainstorming Assignment</a>
            <a href="#" class="fp-nav-link placeholder" data-page="proposal">Topic Proposal</a>
            <a href="#" class="fp-nav-link placeholder" data-page="planning">Planning Assignment</a>
        </nav>

        <nav class="fp-nav-section" aria-label="Final Project resources">
            <p class="fp-nav-section-title">Resources</p>
            <a href="#" class="fp-nav-link placeholder" data-page="mla">MLA Citations</a>
            <a href="#" class="fp-nav-link placeholder" data-page="google-sites">Using Google Sites</a>
            <a href="#" class="fp-nav-link placeholder" data-page="sources">Finding Sources</a>
        </nav>
    `;

    // Inject into sidebar
    const sidebar = document.querySelector('.fp-nav');
    if (sidebar) {
        sidebar.innerHTML = navHTML;
    }

    // Mark active link based on current page
    const path = window.location.pathname;
    const links = document.querySelectorAll('.fp-nav-link');
    links.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === '#') return;
        // Match if pathname ends with the href or is an exact match
        if (path === href || path.endsWith(href.replace(/^\//, ''))) {
            link.classList.add('active');
        }
        // Also match index pages
        if (link.dataset.page === 'index' && (path.endsWith('/final-project/') || path.endsWith('/final-project/index.html'))) {
            link.classList.add('active');
        }
    });

    // Mobile toggle
    const toggle = document.querySelector('.fp-mobile-toggle');
    const nav = document.querySelector('.fp-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            const isOpen = nav.classList.contains('open');
            toggle.setAttribute('aria-expanded', isOpen);
            toggle.textContent = isOpen ? 'Close Navigation' : 'Final Project Navigation';
        });
    }
})();
