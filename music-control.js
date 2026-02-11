// Background music control
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

// Function to start the experience
function startExperience() {
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.style.display = 'none';
    }
    
    if (bgMusic) {
        const savedTime = sessionStorage.getItem('musicCurrentTime');
        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
            sessionStorage.removeItem('musicCurrentTime');
        }
        
        bgMusic.volume = 0.4;
        bgMusic.play().then(() => {
            isPlaying = true;
            musicIcon.textContent = '🔊';
        }).catch(error => {
            console.error('Playback failed:', error);
            musicIcon.textContent = '🔇';
        });
    }
}

// Save music progress periodically
window.addEventListener('load', () => {
    if (bgMusic) {
        setInterval(() => {
            if (bgMusic && !bgMusic.paused) {
                sessionStorage.setItem('musicCurrentTime', bgMusic.currentTime.toString());
                sessionStorage.setItem('musicWasPlaying', 'true');
            }
        }, 500);
    }
});

function toggleMusic() {
    if (!bgMusic) return;

    if (isPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🔇';
        isPlaying = false;
    } else {
        bgMusic.volume = 0.4;
        bgMusic.play().then(() => {
            musicIcon.textContent = '🔊';
            isPlaying = true;
        }).catch(() => {
            musicIcon.textContent = '🔇';
        });
    }
}
