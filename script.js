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

    class ProphecyGame {
        constructor() {
            this.currentLevel = 0;
            this.levels = [
                {
                    id: 1,
                    title: "The Great Fire",
                    prophecy: "The blood of the just will be demanded of London burnt by fire in the year 66",
                    words: ["blood", "just", "London", "fire", "66", "demanded", "burnt"],
                    solution: ["The", "blood", "of", "the", "just", "will", "be", "demanded", "of", "London", "burnt", "by", "fire", "in", "the", "year", "66"]
                },
                {
                    id: 2,
                    title: "Sky King",
                    prophecy: "From the sky shall come a great King of Terror",
                    words: ["sky", "great", "King", "Terror", "come", "shall"],
                    solution: ["From", "the", "sky", "shall", "come", "a", "great", "King", "of", "Terror"]
                },
                {
                    id: 3,
                    title: "The Shaking Earth",
                    prophecy: "The earth shaking in the month of October",
                    words: ["earth", "shaking", "month", "October"],
                    solution: ["The", "earth", "shaking", "in", "the", "month", "of", "October"]
                },
                {
                    id: 4,
                    title: "The Last Vision",
                    prophecy: "Choose the symbols that complete the prophecy",
                    symbols: ["👑", "⚔️", "⭐", "🌍", "🔥", "🌙"],
                    solution: ["👑", "⭐", "🌍"] // Example solution
                }
            ];
            
            this.init();
        }

        init() {
            this.terminal = document.getElementById('prophecy-terminal');
            
            // Add prophecy button listener
            const prophecyButton = document.getElementById('prophecyButton');
            prophecyButton.addEventListener('click', () => {
                // Add button click effect
                prophecyButton.style.animation = 'buttonPulse 0.5s ease-out';
                
                setTimeout(() => {
                    prophecyButton.style.animation = '';
                    this.startGame();
                }, 500);
            });
        }

        startGame() {
            // Hide the prophecy button
            document.getElementById('prophecyButton').style.display = 'none';
            
            // Show the terminal
            this.terminal.classList.remove('hidden');
            this.currentLevel = 1;
            
            // Show first level after brief delay
            setTimeout(() => {
                document.getElementById('start-screen').classList.add('hidden');
                document.getElementById('level-1').classList.remove('hidden');
                this.initializeLevel(1); // Initialize first level after showing it
            }, 2000);
        }

        initializeLevel(levelId) {
            const level = this.levels.find(l => l.id === levelId);
            if (!level) return;

            // Clear existing words
            const wordContainer = document.querySelector('.word-container');
            wordContainer.innerHTML = '';

            // Clear target area
            const targetContainer = document.querySelector('.prophecy-target');
            targetContainer.innerHTML = '';

            // Add new words
            const words = this.shuffleArray([...level.words]);
            words.forEach(word => {
                const wordElement = document.createElement('div');
                wordElement.className = 'prophecy-word';
                wordElement.textContent = word;
                wordElement.addEventListener('click', () => this.handleWordClick(wordElement));
                wordContainer.appendChild(wordElement);
            });
        }

        handleWordClick(wordElement) {
            const isSelected = wordElement.classList.contains('selected');
            if (isSelected) {
                wordElement.classList.remove('selected');
                // Move back to word container
                document.querySelector('.word-container').appendChild(wordElement);
            } else {
                wordElement.classList.add('selected');
                // Move to target area
                document.querySelector('.prophecy-target').appendChild(wordElement);
            }

            this.checkSolution();
        }

        checkSolution() {
            const currentWords = Array.from(document.querySelector('.prophecy-target').children)
                .map(el => el.textContent);
            
            const level = this.levels[this.currentLevel - 1];
            const isCorrect = this.compareArrays(currentWords, level.solution);

            if (isCorrect) {
                this.completeLevel();
            }
        }

        compareArrays(arr1, arr2) {
            return arr1.length === arr2.length && 
                   arr1.every((value, index) => value === arr2[index]);
        }

        completeLevel() {
            // Add completion animation and effects
            const disk = document.querySelector('.disk');
            disk.style.animation = 'pulse 0.5s ease-in-out 3';
            
            setTimeout(() => {
                // Proceed to next level or end game
                this.currentLevel++;
                if (this.currentLevel <= this.levels.length) {
                    this.loadLevel(this.currentLevel);
                } else {
                    this.endGame();
                }
            }, 2000);
        }

        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        loadLevel(levelId) {
            const level = this.levels.find(l => l.id === levelId);
            if (!level) return;

            // Hide all screens
            document.querySelectorAll('.game-screen').forEach(screen => {
                screen.classList.add('hidden');
            });

            // Show new level
            document.getElementById(`level-${levelId}`).classList.remove('hidden');

            switch(levelId) {
                case 2:
                    this.initializeStarMap();
                    break;
                case 3:
                    this.initializeGlobe();
                    break;
                case 4:
                    this.initializeSymbols();
                    break;
            }

            this.initializeLevel(levelId);
        }

        initializeStarMap() {
            const canvas = document.getElementById('starMap');
            const ctx = canvas.getContext('2d');
            
            // Draw constellation pattern
            // Add star map drawing logic here
        }

        initializeGlobe() {
            const globe = document.querySelector('.globe');
            let isDragging = false;
            let startX, startY;

            globe.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                // Update globe rotation based on mouse movement
                globe.style.transform = `rotateY(${deltaX}deg) rotateX(${deltaY}deg)`;
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }

        initializeSymbols() {
            const level = this.levels[3]; // Last Vision level
            const container = document.querySelector('.symbol-container');
            const slots = document.querySelector('.symbol-slots');

            // Create symbol slots
            for (let i = 0; i < 3; i++) {
                const slot = document.createElement('div');
                slot.className = 'symbol-slot';
                slots.appendChild(slot);
            }

            // Create clickable symbols
            level.symbols.forEach(symbol => {
                const symbolEl = document.createElement('div');
                symbolEl.className = 'prophecy-symbol';
                symbolEl.textContent = symbol;
                symbolEl.addEventListener('click', () => this.handleSymbolClick(symbolEl));
                container.appendChild(symbolEl);
            });
        }

        handleSymbolClick(symbolEl) {
            const emptySlot = Array.from(document.querySelectorAll('.symbol-slot'))
                .find(slot => !slot.textContent);
            
            if (emptySlot) {
                emptySlot.textContent = symbolEl.textContent;
                this.checkSymbolSolution();
            }
        }

        checkSymbolSolution() {
            const currentSymbols = Array.from(document.querySelectorAll('.symbol-slot'))
                .map(slot => slot.textContent)
                .filter(symbol => symbol); // Remove empty slots

            const level = this.levels[3];
            if (currentSymbols.length === level.solution.length &&
                this.compareArrays(currentSymbols, level.solution)) {
                this.completeLevel();
            }
        }
    }

    // Initialize game when document is loaded
    window.game = new ProphecyGame(); // Make it globally accessible for debugging
});

// Add button pulse animation to CSS
@keyframes buttonPulse {
    0% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.2); }
    100% { transform: translateX(-50%) scale(1); }
} 