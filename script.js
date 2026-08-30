// Sample Images

const sampleCards = document.querySelectorAll(".sample-card");

sampleCards.forEach(card => {

    card.addEventListener("click", function () {

        const imageURL = this.dataset.image;

        const img = new Image();

        img.crossOrigin = "anonymous";

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

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );

            canvas.style.display = "block";
            placeholder.style.display = "none";

            resetColor();

        };

        img.onerror = function () {

            alert(
                "Unable to load sample image. Please check your internet connection."
            );

        };

        img.src = imageURL;

    });

});
