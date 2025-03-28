import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://dvcticgzggpmmluentsq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y3RpY2d6Z2dwbW1sdWVudHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjUwNjksImV4cCI6MjA1ODc0MTA2OX0.3klZQAU630HuDpplOG1qfLlRdD7s4uFqHdlMmqCDWyA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
document.getElementById("profile-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = await supabase.auth.getUser();
    if (!user || !user.data || !user.data.user) {
        document.getElementById("profile-feedback").innerText = "User not authenticated!";
        return;
    }

    const userId = user.data.user.id;
    const fullName = document.getElementById("full_name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const goal = document.getElementById("goal").value;

    const userProfile = {
        id: userId,
        full_name: fullName,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        goal: goal,
    };
    const { error } = await supabase
        .from("profiles")
        .upsert([userProfile]);

    if (error) {
        document.getElementById("profile-feedback").innerText = "Error saving profile to Supabase!";
        console.error(error);
        return;
    }

    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    document.getElementById("profile-feedback").innerText = "Profile saved successfully!";
    window.location.href = "home.html";
});
