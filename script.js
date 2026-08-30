const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const placeholder = document.getElementById("placeholder");

const colorPreview = document.getElementById("colorPreview");
const colorName = document.getElementById("colorName");
const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const position = document.getElementById("position");

const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

let currentHex = "";


// Upload Image
imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const img = new Image();

        img.onload = function () {

            const maxWidth = 900;
            const maxHeight = 600;

            let width = img.width;
            let height = img.height;

            const scale = Math.min(
                maxWidth / width,
                maxHeight / height,
                1
            );

            width = Math.round(width * scale);
            height = Math.round(height * scale);

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            canvas.style.display = "block";
            placeholder.style.display = "none";

            resetColor();

        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});


// Detect Color on Click
canvas.addEventListener("click", function (event) {

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex = rgbToHex(r, g, b);

    currentHex = hex;

    colorPreview.style.backgroundColor = hex;

    colorName.textContent = getColorName(r, g, b);

    hexValue.textContent = hex;

    rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;

    position.textContent = `X: ${x}, Y: ${y}`;

    copyMessage.textContent = "";
});


// Convert RGB to HEX
function rgbToHex(r, g, b) {

    return "#" +
        [r, g, b]
            .map(value => value.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase();
}


// Find Nearest Basic Color
function getColorName(r, g, b) {

    const colors = {

        Black: [0, 0, 0],
        White: [255, 255, 255],
        Red: [255, 0, 0],
        Green: [0, 128, 0],
        Blue: [0, 0, 255],
        Yellow: [255, 255, 0],
        Cyan: [0, 255, 255],
        Magenta: [255, 0, 255],
        Orange: [255, 165, 0],
        Purple: [128, 0, 128],
        Pink: [255, 192, 203],
        Brown: [165, 42, 42],
        Gray: [128, 128, 128],
        Lime: [0, 255, 0],
        Navy: [0, 0, 128],
        Teal: [0, 128, 128],
        Maroon: [128, 0, 0],
        Olive: [128, 128, 0],
        Silver: [192, 192, 192]

    };

    let closestColor = "Unknown";
    let minimumDistance = Infinity;

    for (const name in colors) {

        const [cr, cg, cb] = colors[name];

        const distance =
            Math.pow(r - cr, 2) +
            Math.pow(g - cg, 2) +
            Math.pow(b - cb, 2);

        if (distance < minimumDistance) {

            minimumDistance = distance;
            closestColor = name;

        }
    }

    return closestColor;
}


// Copy HEX Color
copyBtn.addEventListener("click", function () {

    if (!currentHex) {

        copyMessage.textContent = "Select a color first!";
        copyMessage.style.color = "#dc2626";

        return;
    }

    navigator.clipboard.writeText(currentHex);

    copyMessage.textContent = `${currentHex} copied!`;
    copyMessage.style.color = "#16a34a";

});


// Reset
resetBtn.addEventListener("click", function () {

    imageInput.value = "";

    canvas.style.display = "none";
    placeholder.style.display = "block";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    resetColor();

});


// Reset Color Information
function resetColor() {

    currentHex = "";

    colorPreview.style.backgroundColor = "#e5e7eb";

    colorName.textContent = "---";
    hexValue.textContent = "---";
    rgbValue.textContent = "---";
    position.textContent = "---";

    copyMessage.textContent = "";

}
