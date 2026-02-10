// Background music control
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

// Try to autoplay immediately when page loads
window.addEventListener('load', () => {
    if (bgMusic) {
        bgMusic.volume = 0.4;
        
        // Check if we're resuming playback from previous page
        const savedTime = sessionStorage.getItem('musicCurrentTime');
        const wasMusicPlaying = sessionStorage.getItem('musicWasPlaying') === 'true';
        
        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
            sessionStorage.removeItem('musicCurrentTime');
        }
        
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                musicIcon.textContent = '🔊';
            }).catch(() => {
                document.addEventListener('click', attemptPlay, { once: true });
                document.addEventListener('keydown', attemptPlay, { once: true });
            });
        }

        setInterval(() => {
            if (bgMusic && !bgMusic.paused) {
                sessionStorage.setItem('musicCurrentTime', bgMusic.currentTime.toString());
                sessionStorage.setItem('musicWasPlaying', 'true');
            }
        }, 500);
    }
});

function attemptPlay() {
    if (!isPlaying && bgMusic) {
        bgMusic.volume = 0.4;
        bgMusic.play().then(() => {
            isPlaying = true;
            musicIcon.textContent = '🔊';
        }).catch(() => {});
    }
}

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
