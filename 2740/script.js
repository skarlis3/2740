document.addEventListener("DOMContentLoaded", function() {

    // 1. ANIMATIONS (Bento Boxes & Cards)
    const elementsToAnimate = document.querySelectorAll('.box, .card');
    if (elementsToAnimate.length > 0) {
        elementsToAnimate.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 50); 
        });
    }

    // 2. READER TOOLS (Reading Pages Only)
    const header = document.querySelector('.glass-header');
    if (header) {
        // Inject HTML
        // Note: Changed theme-toggle to use Material Symbols for consistency
        // Added aria-labels for accessibility
        const toolbarHTML = `
            <div class="reader-toolbar header-tools">
                <div class="btn-group">
                    <button id="btn-serif" class="tool-btn active" title="Serif Font" aria-label="Switch to Serif Font"><span style="font-family: 'Lora', serif; font-weight:700;">Aa</span></button>
                    <button id="btn-sans" class="tool-btn" title="Sans-Serif Font" aria-label="Switch to Sans-Serif Font"><span style="font-family: 'Lato', sans-serif; font-weight:700;">Aa</span></button>
                </div>
                <div class="btn-group">
                    <button id="btn-smaller" class="tool-btn" title="Decrease Size" aria-label="Decrease Text Size">-</button>
                    <button id="btn-larger" class="tool-btn" title="Increase Size" aria-label="Increase Text Size">+</button>
                </div>
            </div>
            <div id="theme-toggle" title="Toggle Light/Dark Mode" aria-label="Toggle Theme" role="button" tabindex="0">
                <span class="material-symbols-outlined">light_mode</span>
            </div>
        `;
        header.insertAdjacentHTML('beforeend', toolbarHTML);

        // Logic (Theme + Font)
        const toggleBtn = document.getElementById('theme-toggle');
        const toggleIcon = toggleBtn.querySelector('.material-symbols-outlined'); // Select the icon span
        const body = document.body;
        const root = document.documentElement;
        
        // Load Preferences
        if (localStorage.getItem('theme') === 'light') {
            body.classList.add('light-mode');
            toggleIcon.textContent = 'dark_mode'; // Set initial icon to moon
        } else {
            toggleIcon.textContent = 'light_mode'; // Set initial icon to sun
        }
        
        // Theme Toggle Event
        toggleBtn.addEventListener('click', function() {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                toggleIcon.textContent = 'dark_mode'; // Change to Moon icon
            } else {
                localStorage.setItem('theme', 'dark');
                toggleIcon.textContent = 'light_mode'; // Change to Sun icon
            }
        });

        // Font Logic
        const btnSerif = document.getElementById('btn-serif');
        const btnSans = document.getElementById('btn-sans');
        const btnSmaller = document.getElementById('btn-smaller');
        const btnLarger = document.getElementById('btn-larger');

        btnSerif.addEventListener('click', () => {
            root.style.setProperty('--reading-font', "'Lora', serif");
            root.style.removeProperty('--line-height'); 
            btnSerif.classList.add('active');
            btnSans.classList.remove('active');
            localStorage.setItem('fontStyle', 'serif');
        });

        btnSans.addEventListener('click', () => {
            root.style.setProperty('--reading-font', "'Lato', sans-serif");
            root.style.setProperty('--line-height', "1.8"); 
            btnSans.classList.add('active');
            btnSerif.classList.remove('active');
            localStorage.setItem('fontStyle', 'sans');
        });

        let currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--reading-size')) || 1.1;
        btnLarger.addEventListener('click', () => { if(currentSize < 2.0) { currentSize += 0.1; root.style.setProperty('--reading-size', currentSize + "rem"); }});
        btnSmaller.addEventListener('click', () => { if(currentSize > 0.8) { currentSize -= 0.1; root.style.setProperty('--reading-size', currentSize + "rem"); }});

        if (localStorage.getItem('fontStyle') === 'sans') { btnSans.click(); }
    }
});