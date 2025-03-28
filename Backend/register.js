import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://dvcticgzggpmmluentsq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y3RpY2d6Z2dwbW1sdWVudHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjUwNjksImV4cCI6MjA1ODc0MTA2OX0.3klZQAU630HuDpplOG1qfLlRdD7s4uFqHdlMmqCDWyA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function registerUser(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
    });

    if (error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Registration Error: " + error.message;
    document.body.appendChild(errorMessage);

    } else {
    const successMessage = document.createElement("p");
    successMessage.textContent = "User registered successfully!";
    document.body.appendChild(successMessage);
    setTimeout(() => {
        window.location.href = "profile.html";
    }, 2000);

    }
}

document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    registerUser(email, password, name);
});
