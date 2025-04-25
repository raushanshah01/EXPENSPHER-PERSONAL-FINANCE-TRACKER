document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");
    const rightSection = document.querySelector(".right-section");

    function toggleRegister() {
        container.classList.toggle("register-mode");

        // Apply fade-out effect
        rightSection.style.opacity = "0";
        setTimeout(() => {
            // Keep the image background
            let bgImage = `<div class="right-bg"></div>`;

            // Toggle content inside right section
            if (container.classList.contains("register-mode")) {
                rightSection.innerHTML = `
                    ${bgImage}
                    <div class="right-content">
                        <h2>Create an Account</h2>
                        <p>Register with Email</p>
                        <form>
                            <input type="text" placeholder="Enter your name" required>
                            <input type="email" placeholder="Enter your email" required>
                            <input type="password" placeholder="Create a password" required>
                            <button type="submit">Register</button>
                        </form>
                        <p>Already have an account? <a href="#" onclick="toggleRegister()">Login Here</a></p>
                    </div>
                    
                `;
            } else {
                rightSection.innerHTML = `
                    ${bgImage}
                    <div class="right-content">
                        <h2>Welcome</h2>
                        <p>Login with Email</p>
                        <form>
                            <input type="email" placeholder="Enter your email" required>
                            <input type="password" placeholder="Enter your password" required>
                            <button type="submit">Login</button>
                        </form>
                        <p>Forgot your password?</p>
                        <p>Don't have an account? <a href="#" onclick="toggleRegister()">Register Now</a></p>
                        <div class="social-login">
                            <button><i class="fa-brands fa-google"></i></button> <!-- Fixed button element -->
                        </div>
                    </div>
                `;
            }

            // Apply fade-in effect after content change
            rightSection.style.opacity = "1";
            
        }, 300); // Matches transition duration
    }

    // Expose function to global scope
    window.toggleRegister = toggleRegister;
});
