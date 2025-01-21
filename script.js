document.addEventListener('DOMContentLoaded', () => {
    // Mouse trail effect
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.style.left = mouseX + 'px';
        trail.style.top = mouseY + 'px';
    });

    // Disk navigation interaction
    const diskSectors = document.querySelectorAll('.nav-sector');
    const terminal = document.querySelector('.terminal-content');

    diskSectors.forEach(sector => {
        sector.addEventListener('click', (e) => {
            e.preventDefault();
            const section = sector.getAttribute('data-section');
            
            // Add glitch effect
            sector.classList.add('glitch');
            setTimeout(() => sector.classList.remove('glitch'), 500);

            // Update terminal content
            terminal.innerHTML = `
                <p class="boot-sequence">ACCESSING ${section}...</p>
                <p class="boot-sequence">LOADING DATA STREAMS...</p>
                <p class="boot-sequence">DECRYPTING CONTENT...</p>
            `;
        });
    });

    // Easter egg - Konami code implementation
    let konamiCode = [];
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === secretCode.join(',')) {
            document.body.classList.add('matrix-mode');
            setTimeout(() => document.body.classList.remove('matrix-mode'), 5000);
        }
    });
}); 