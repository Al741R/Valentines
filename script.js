const messages = [
    "Are you sure? 🥺",
    "Really sure?? 😢",
    "Think again! 💭",
    "Pookie please... 🙏",
    "Give it a chance! 💕",
    "You're breaking my heart... 💔",
    "I'll be so sad... 😭",
    "Super duper sad... 😿",
    "Fine, I'll stop... 😔",
    "Just kidding! Please? 🥰",
    "Pretty please? 🎀",
    "With a cherry on top? 🍒",
    "Come on now... 😊",
    "You know you want to! ❤️"
];

let messageIndex = 0;
let clickCount = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    const noButtonSpan = noButton.querySelector('span');
    
    // Add shake animation to no button
    noButton.style.animation = 'none';
    setTimeout(() => {
        noButton.style.animation = 'shake 0.5s';
    }, 10);
    
    // Update message
    noButtonSpan.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;


    clickCount++;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    const newSize = currentSize * 1.15;
    yesButton.style.fontSize = `${newSize}px`;
    yesButton.style.transition = 'all 0.3s ease';


    if (clickCount > 5 && clickCount % 3 === 0) {
        createFloatingHeart();
    }
}

function handleYesClick() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && !bgMusic.paused) {
        sessionStorage.setItem('musicCurrentTime', bgMusic.currentTime.toString());
        sessionStorage.setItem('musicWasPlaying', 'true');
    }


    const yesButton = document.querySelector('.yes-button');
    yesButton.style.transform = 'scale(1.3)';
    yesButton.style.transition = 'all 0.3s ease';


    for (let i = 0; i < 10; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }


    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 800);
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.zIndex = '9999';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 3s ease-out forwards';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-1000px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);