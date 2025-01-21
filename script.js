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

    // Create digital rain
    function createDigitalRain() {
        const container = document.createElement('div');
        container.className = 'digital-rain';
        document.body.appendChild(container);

        const characters = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890';
        const columnCount = Math.floor(window.innerWidth / 20); // Adjust spacing

        function createRainColumn() {
            const column = document.createElement('div');
            column.className = 'rain-column';
            
            // Random position and animation properties
            column.style.left = `${Math.random() * 100}%`;
            column.style.animationDuration = `${Math.random() * 3 + 2}s`;
            
            // Create random string of characters
            let rainText = '';
            const length = Math.floor(Math.random() * 20) + 10;
            for (let i = 0; i < length; i++) {
                rainText += characters[Math.floor(Math.random() * characters.length)];
            }
            column.textContent = rainText;
            
            // Remove column after animation ends
            column.addEventListener('animationend', () => {
                column.remove();
            });
            
            container.appendChild(column);
        }

        // Create initial columns
        for (let i = 0; i < columnCount; i++) {
            setTimeout(() => {
                createRainColumn();
            }, Math.random() * 2000);
        }

        // Continuously create new columns
        setInterval(() => {
            if (container.childElementCount < columnCount) {
                createRainColumn();
            }
        }, 100);

        // Handle window resize
        window.addEventListener('resize', () => {
            const newColumnCount = Math.floor(window.innerWidth / 20);
            columnCount = newColumnCount;
        });
    }

    createDigitalRain();

    // Quiz functionality
    const prophecyButton = document.getElementById('prophecyButton');
    const quizTerminal = document.getElementById('quiz-terminal');
    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResult = document.getElementById('quiz-result');

    prophecyButton.addEventListener('click', () => {
        // Add button click effect
        prophecyButton.style.animation = 'buttonPulse 0.5s ease-out';
        
        setTimeout(() => {
            prophecyButton.style.animation = '';
            startQuiz();
        }, 500);
    });

    function startQuiz() {
        // Hide the prophecy button
        prophecyButton.style.display = 'none';
        
        // Show the quiz terminal
        quizTerminal.classList.remove('hidden');
        
        // Add typing animation to intro text
        const prophecyText = quizIntro.querySelector('.prophecy-text');
        prophecyText.style.animation = 'typing 3s steps(60, end)';
        
        // Add glitch effect to title
        const title = quizIntro.querySelector('.glitch-text');
        title.classList.add('glitch-animate');

        // Add continue button functionality
        const continueButton = document.getElementById('continueButton');
        continueButton.addEventListener('click', () => {
            // Add button click effect
            continueButton.style.animation = 'buttonPulse 0.5s ease-out';
            
            setTimeout(() => {
                continueButton.style.animation = '';
                showQuestions();
            }, 500);
        });
    }

    function showQuestions() {
        // Hide intro screen
        document.getElementById('quiz-intro').classList.add('hidden');
        // Show questions screen
        document.getElementById('quiz-questions').classList.remove('hidden');
    }
}); 