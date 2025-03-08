document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

// Hỗ trợ cảm ứng trên điện thoại
document.getElementById("game").addEventListener("touchstart", function() {
    jump();
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

// Kiểm tra va chạm chính xác hơn
let checkCollision = setInterval(() => {
    let dino = document.getElementById("dino");
    let cactus = document.getElementById("cactus");

    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top
    ) {
        alert("Game Over!");
        location.reload();
    }
}, 50);
