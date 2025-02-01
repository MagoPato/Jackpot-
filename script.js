const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spin-button');

const symbols = ['🍒', '🍋', '🍊', '🍇', '🎰'];

function spinReel(reel, duration) {
    return new Promise((resolve) => {
        let startTime = Date.now();
        const interval = setInterval(() => {
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            if (Date.now() - startTime > duration) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

async function spin() {
    spinButton.disabled = true;
    
    const spinDuration = 2000; // Duración total del giro en milisegundos

    const spinPromises = [];

    for (const reel of reels) {
        const promise = spinReel(reel, spinDuration);
        spinPromises.push(promise);
    }

    for (const promise of spinPromises) {
        await promise;
    }

    spinButton.disabled = false;
}

spinButton.addEventListener('click', spin);
