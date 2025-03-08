document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

// Cho phép chạm vào màn hình để nhảy
document.getElementById("game").addEventListener("click", function() {
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
setInterval(() => {
    let dino = document.getElementById("dino");
    let cactus = document.getElementById("cactus");

    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusRight = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));

    if (cactusRight > 540 && cactusRight < 590 && dinoBottom <= 40) {
        alert("Game Over!");
        location.reload();
    }
}, 50);
