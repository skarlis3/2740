// footer.js — ENGL 2740 Site Footer

(function() {
    // Inject footer styles
    const style = document.createElement('style');
    style.textContent = `
        .site-footer {
            margin-top: 3rem;
            padding: 1.5rem 1rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            font-size: 0.8rem;
            line-height: 1.5;
            color: var(--text-muted, #888);
            text-align: center;
        }
        .site-footer a {
            color: var(--c-read, #c9a0dc);
            text-decoration: none;
        }
        .site-footer a:hover,
        .site-footer a:focus {
            text-decoration: underline;
        }
        .footer-home {
            display: block;
            margin-bottom: 1rem;
        }
        .footer-license {
            max-width: 600px;
            margin: 0 auto;
        }
        .footer-license p {
            margin: 0.4rem 0;
        }
    `;
    document.head.appendChild(style);

    // Determine if this is a final project page
    const isFinalProject = !!document.querySelector('.fp-layout') || window.location.pathname.includes('/final-project');

    // AI statement varies by section
    const aiStatement = isFinalProject
        ? '<p>AI tools were used in the design and coding of this site and may have been used for proofreading, brainstorming, or refining assignment pages.</p>'
        : '<p>AI tools were used in the design and coding of this site.</p>';

    // Create footer element
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
        <a href="https://2740.skarlis.org" class="footer-home">Home</a>
        <div class="footer-license">
            <p>All readings and primary texts on this site are in the public domain unless otherwise noted.</p>
            <p>Website design and original page content created by Sarah Karlis and licensed under a <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">Creative Commons Attribution 4.0 International License</a>.</p>
            ${aiStatement}
        </div>
    `;

    // Insert before closing </body> or after page-wrapper
    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper) {
        pageWrapper.after(footer);
    } else {
        document.body.appendChild(footer);
    }
})();
