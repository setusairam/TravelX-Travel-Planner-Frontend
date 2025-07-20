document.addEventListener("DOMContentLoaded", () => {
    const tripType = document.getElementById("tripType");
    const groupSizeContainer = document.getElementById("groupSizeContainer");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");

    // Show/Hide Group Size Input
    tripType.addEventListener("change", function () {
        if (this.value === "friends") {
            groupSizeContainer.classList.remove("hidden");
        } else {
            groupSizeContainer.classList.add("hidden");
        }
    });

    // Calculate Number of Days
    endDate.addEventListener("change", function () {
        if (startDate.value && endDate.value) {
            const start = new Date(startDate.value);
            const end = new Date(endDate.value);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

            if (days < 0) {
                alert("End date cannot be before the start date.");
                endDate.value = "";
            } else {
                console.log(`Trip duration: ${days} days`);
            }
        }
    });

    // Fetch Destination Details from destinations.html
    window.fetchDestinationDetails = function () {
        const place = document.getElementById("search-input").value;
        if (place.length > 2) { 
            document.getElementById(".trip-card-link").innerHTML = 
                `<a href="destinations.html#${place}" target="_blank">See details for ${place}</a>`;
        } else {
            document.getElementById("destinationDetails").innerHTML = "";
        }
    };

    // Form Submission
    document.getElementById("tripForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Trip planned successfully!");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tripType = document.getElementById("tripType");
    const groupSizeContainer = document.getElementById("groupSizeContainer");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");

    // Hide the group size input by default
    groupSizeContainer.style.display = "none";

    // Show the group size input only if 'Friends Group' is selected
    tripType.addEventListener("change", function () {
        if (tripType.value === "friends") {
            groupSizeContainer.style.display = "block";
        } else {
            groupSizeContainer.style.display = "none";
        }
    });

    // Calculate number of days based on selected dates
    function calculateDays() {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);

        if (start && end && start <= end) {
            const timeDiff = end - start;
            const dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            alert(`Your trip duration is ${dayCount} days.`);
        }
    }

    startDate.addEventListener("change", calculateDays);
    endDate.addEventListener("change", calculateDays);
});
