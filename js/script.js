console.log("Bilyalov Jiu-Jitsu Team");
const REVIEW_URL = "https://script.google.com/macros/s/AKfycbxjEesfC9VRODcbDkbBwozb1aByN8uvgppLlkvpwzbrKqLDWACTzuA9zeJykIErj-01vQ/exec";
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

if (reviewForm) {

    loadReviews();

    reviewForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", document.getElementById("reviewName").value);
        formData.append("rating", document.getElementById("reviewRating").value);
        formData.append("review", document.getElementById("reviewText").value);

        try {

            const response = await fetch(REVIEW_URL, {
                method: "POST",
                body: formData
            });

           const success = document.getElementById("reviewSuccess");

success.style.display = "block";

setTimeout(() => {
    success.style.display = "none";
}, 3000);

reviewForm.reset();

        } catch (err) {

            console.error(err);

            alert("Ошибка соединения.");

        }

    });

}

async function loadReviews() {

    try {

        const response = await fetch(REVIEW_URL);

        const reviews = await response.json();

        if (!reviewsList) return;

        reviewsList.innerHTML = "";

        reviews.forEach(r => {

            reviewsList.innerHTML += `
                <div class="review-card">
                    <div class="stars">${"⭐".repeat(Number(r.rating))}</div>
                    <p>${r.review}</p>
                    <h4>${r.name}</h4>
                </div>
            `;

        });

    } catch (err) {

        console.error(err);

    }

}
// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ =====

const reveals = document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(top < windowHeight - 100){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();
// ===== АНИМАЦИЯ СЧЁТЧИКОВ =====

const counters = document.querySelectorAll(".counter");

const animateCounters = () => {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const step = Math.ceil(target / 60);

        const timer = setInterval(() => {

            current += step;

            if (current >= target) {

                counter.textContent = target + "+";

                clearInterval(timer);

            } else {

                counter.textContent = current;

            }

        }, 25);

    });

};

let countersStarted = false;

window.addEventListener("scroll", () => {

    const stats = document.querySelector(".hero-stats");

    if (!stats || countersStarted) return;

    const top = stats.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        countersStarted = true;

        animateCounters();

    }

});