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

    // Add quiz questions data
    const quizQuestionsData = [
        {
            text: "A cityscape burns beneath a collapsing sky. What do you search for?",
            answers: [
                { text: "The throne among the wreckage", value: "A" },
                { text: "A refuge untouched by flames", value: "B" },
                { text: "The signal to spark revolution", value: "C" },
                { text: "The hidden codes within the ruins", value: "D" }
            ]
        },
        {
            text: "A satellite emits a faint, ancient signal. How do you react?",
            answers: [
                { text: "Decode the message and act", value: "A" },
                { text: "Amplify it to rally others", value: "B" },
                { text: "Hijack the broadcast for your own purpose", value: "C" },
                { text: "Archive it for future use", value: "D" }
            ]
        },
        {
            text: "The earth trembles, and the sky fractures. What do you see?",
            answers: [
                { text: "A chance to forge a new empire", value: "A" },
                { text: "The need to guide others to safety", value: "B" },
                { text: "An opportunity to rise in the chaos", value: "C" },
                { text: "A deeper truth hidden in the rubble", value: "D" }
            ]
        },
        {
            text: "A celestial omen appears, glowing green and violet. What do you believe it means?",
            answers: [
                { text: "The rise and fall of leaders", value: "A" },
                { text: "A beacon for unity in dark times", value: "B" },
                { text: "A harbinger of battles to come", value: "C" },
                { text: "A puzzle revealing hidden knowledge", value: "D" }
            ]
        },
        {
            text: "A ticking cybernetic clock counts down. What is your next move?",
            answers: [
                { text: "Build a stronger future from its ashes", value: "A" },
                { text: "Protect those who stand with you", value: "B" },
                { text: "Embrace the chaos and take control", value: "C" },
                { text: "Unravel its secrets before it strikes", value: "D" }
            ]
        }
    ];

    // Add to the existing quiz functionality
    let currentQuestionIndex = 0;
    let userAnswers = [];

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
        const questionsScreen = document.getElementById('quiz-questions');
        questionsScreen.classList.remove('hidden');
        
        // Display first question
        displayQuestion(currentQuestionIndex);
    }

    function displayQuestion(index) {
        const question = quizQuestionsData[index];
        const questionContainer = document.querySelector('.question-container');
        
        // Update question text
        questionContainer.querySelector('.question-text').textContent = question.text;
        
        // Update answer buttons
        const answersContainer = questionContainer.querySelector('.answers-container');
        answersContainer.innerHTML = ''; // Clear previous answers
        
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'answer-button';
            button.textContent = answer.text;
            button.dataset.value = answer.value;
            
            button.addEventListener('click', () => handleAnswer(answer.value));
            
            answersContainer.appendChild(button);
        });
    }

    function handleAnswer(answerValue) {
        // Store the answer
        userAnswers[currentQuestionIndex] = answerValue;
        
        // Add selection effect
        const buttons = document.querySelectorAll('.answer-button');
        buttons.forEach(button => {
            button.style.pointerEvents = 'none';
            if (button.dataset.value === answerValue) {
                button.style.background = 'rgba(57, 255, 20, 0.2)';
                button.style.borderColor = 'var(--neon-green)';
            }
        });
        
        // Wait a moment before moving to next question
        setTimeout(() => {
            currentQuestionIndex++;
            
            if (currentQuestionIndex < quizQuestionsData.length) {
                // Show next question
                displayQuestion(currentQuestionIndex);
            } else {
                // Show results
                showResults();
            }
        }, 1000);
    }

    function showResults() {
        // Hide questions screen
        document.getElementById('quiz-questions').classList.add('hidden');
        
        // Show results screen
        const resultsScreen = document.getElementById('quiz-result');
        resultsScreen.classList.remove('hidden');
        
        // Calculate and display result (to be implemented)
        calculateResult();
    }

    // Add after the quizQuestionsData array
    const archetypes = {
        ARCHITECT: {
            title: "The Architect (The Throne-Breaker)",
            description: "You are a creator, destined to shape the future through ambition and resolve. Empires may fall, but you will rebuild stronger ones."
        },
        SENTINEL: {
            title: "The Sentinel (The Shieldbearer)",
            description: "You are a guardian, standing firm in the face of chaos. Your presence offers hope to the lost, and your strength keeps the future alive."
        },
        CATALYST: {
            title: "The Catalyst (The Firestarter)",
            description: "Change is your dominion. Where others see chaos, you see opportunity. You are the spark that lights the way forward."
        },
        CIPHER: {
            title: "The Cipher (The Keeper of Secrets)",
            description: "Your mind is a vault of knowledge, uncovering truths hidden from others. You are the one who deciphers the codes of the universe."
        }
    };

    function calculateResult() {
        const scores = {
            ARCHITECT: 0,
            SENTINEL: 0,
            CATALYST: 0,
            CIPHER: 0
        };

        // Score each answer
        userAnswers.forEach((answer, index) => {
            switch(answer) {
                case 'A': // Architect-aligned answers
                    scores.ARCHITECT++;
                    break;
                case 'B': // Sentinel-aligned answers
                    scores.SENTINEL++;
                    break;
                case 'C': // Catalyst-aligned answers
                    scores.CATALYST++;
                    break;
                case 'D': // Cipher-aligned answers
                    scores.CIPHER++;
                    break;
            }
        });

        // Use last answer as tiebreaker if needed
        const finalAnswer = userAnswers[userAnswers.length - 1];
        scores[['ARCHITECT', 'SENTINEL', 'CATALYST', 'CIPHER'][finalAnswer.charCodeAt(0) - 65]] += 0.5;

        // Find highest score
        let result = Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];

        displayResult(result);
    }

    function displayResult(archetype) {
        const resultsScreen = document.getElementById('quiz-result');
        resultsScreen.innerHTML = `
            <div class="result-container">
                <h2 class="glitch-text">${archetypes[archetype].title}</h2>
                <div class="result-description">
                    <p class="prophecy-text">${archetypes[archetype].description}</p>
                </div>
                <button class="continue-button" onclick="location.reload()">RESTART THE DISK ></button>
            </div>
        `;
    }
}); 