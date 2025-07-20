document.addEventListener("DOMContentLoaded", function () {
    // Function to show selected page and hide others
    function showPage(page) {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("registerPage").classList.add("hidden");
        document.getElementById("forgotPasswordPage").classList.add("hidden");

        document.getElementById(page + "Page").classList.remove("hidden");
    }

    // Expose function globally
    window.showPage = showPage;

    // Default to showing the login page
    showPage("login");

    // Handle Login Form Submission
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Login Successful!");
    });

    // Handle Register Form Submission
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Registration Successful!");
    });

    // Handle Forgot Password Form Submission
    document.getElementById("forgotPasswordForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Password reset link sent!");
    });
});
