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
// Lấy thẻ âm thanh
let scarySound = document.getElementById("scarySound");

// Bắt buộc tải trước âm thanh
function preloadAudio() {
    scarySound.volume = 1.0;
    scarySound.load(); // Bắt trình duyệt tải file
    scarySound.play().then(() => {
        scarySound.pause();
        scarySound.currentTime = 0;
    }).catch(() => {
        console.log("Trình duyệt chặn phát âm thanh, sẽ phát sau.");
    });
}

// Gọi preload khi trang load
window.addEventListener("load", preloadAudio);

// Hiển thị jumpscare với âm thanh ngay lập tức
function showJumpscare() {
    clearInterval(checkCollision);

    let jumpscare = document.getElementById("jumpscare");
    jumpscare.style.display = "flex";

    // Dừng âm thanh nếu đang phát dở, rồi phát ngay lập tức
    scarySound.pause();
    scarySound.currentTime = 0;
    scarySound.play();

    document.body.classList.add("shake");

    setTimeout(() => {
        document.body.classList.remove("shake");
        location.reload();
    }, 2000);
}
// Hiển thị jumpscare toàn màn hình
function showJumpscare() {
    clearInterval(checkCollision);
    let jumpscare = document.getElementById("jumpscare");
    jumpscare.style.display = "flex";
    
    scarySound.play();
    document.body.classList.add("shake");

    setTimeout(() => {
        document.body.classList.remove("shake");
        location.reload();
    }, 2000);
}

// Bắt đầu kiểm tra va chạm
startCollisionCheck();
