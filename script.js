let gamePaused = false;
let checkCollision;
let cactus = document.getElementById("cactus");

// Sự kiện bàn phím
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

// Hỗ trợ cảm ứng
document.getElementById("game").addEventListener("touchstart", function() {
    jump();
});

// Nút tạm dừng
document.getElementById("pauseBtn").addEventListener("click", function() {
    if (!gamePaused) {
        cactus.style.animationPlayState = "paused";
        clearInterval(checkCollision);
        gamePaused = true;
        this.textContent = "Tiếp tục";
    } else {
        cactus.style.animationPlayState = "running";
        startCollisionCheck();
        gamePaused = false;
        this.textContent = "Tạm dừng";
    }
});

function jump() {
    let dino = document.getElementById("dino");
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 500);
    }
}

// Bắt đầu kiểm tra va chạm
function startCollisionCheck() {
    checkCollision = setInterval(() => {
        let dino = document.getElementById("dino");
        let cactus = document.getElementById("cactus");

        let dinoRect = dino.getBoundingClientRect();
        let cactusRect = cactus.getBoundingClientRect();

        if (
            dinoRect.right > cactusRect.left &&
            dinoRect.left < cactusRect.right &&
            dinoRect.bottom > cactusRect.top
        ) {
            showJumpscare();
        }
    }, 50);
}
// Tải trước âm thanh để tránh lỗi lần chết đầu tiên không có tiếng
let scarySound = document.getElementById("scarySound");
scarySound.volume = 1.0;
scarySound.play().then(() => {
    scarySound.pause();
    scarySound.currentTime = 0;
}).catch(error => {
    console.log("Âm thanh chưa thể phát do trình duyệt chặn, sẽ phát khi jumpscare.");
});

// Hiển thị jumpscare giống The Boiled One
function showJumpscare() {
    clearInterval(checkCollision);
    document.getElementById("jumpscare").style.display = "flex";
    document.getElementById("scarySound").play();
    document.body.classList.add("shake");

    setTimeout(() => {
        document.body.classList.remove("shake");
        location.reload();
    }, 2000);
}

// Bắt đầu kiểm tra va chạm
startCollisionCheck();
