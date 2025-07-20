function redirectHome() {
    window.location.href = "index.html";
}

// FAQ Dropdown Effect
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tripContainer = document.querySelector(".trips-container");

    function autoSlide() {
        if (tripContainer.scrollLeft + tripContainer.clientWidth >= tripContainer.scrollWidth) {
            tripContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            tripContainer.scrollBy({ left: 270, behavior: "smooth" });
        }
    }

    setInterval(autoSlide, 3000); // Slide every 3 seconds
});

function redirectTo(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("/").then(response => response.text()).then(html => {
        if (html.includes('Profile')) {
            document.querySelector(".signin-btn").innerHTML = "Profile";
            document.querySelector(".signin-btn").setAttribute("onclick", "redirectTo('profile.html')");
        }
    });
});

function redirectTo(page) {
    window.location.href = page;
}
