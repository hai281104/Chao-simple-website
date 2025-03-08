document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

// Hỗ trợ chạm màn hình trên điện thoại
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

// Kiểm tra va chạm
let checkCollision = setInterval(() => {
    let dino = document.getElementById("dino");
    let cactus = document.getElementById("cactus");

    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));

    if (cactusLeft > 540 && cactusLeft < 590 && dinoBottom <= 40) {
        alert("Game Over!");
        location.reload();
    }
}, 50);
