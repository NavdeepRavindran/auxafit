async function getUserProfile() {
    // Fetch user data from localStorage
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    
    if (!userProfile) {
        document.getElementById("profile-info").innerText = "User not authenticated!";
        return;
    }

    // Display profile info
    document.getElementById("profile-info").innerHTML = `
        <p><strong>Full Name:</strong> ${userProfile.full_name}</p>
        <p><strong>Age:</strong> ${userProfile.age}</p>
        <p><strong>Gender:</strong> ${userProfile.gender}</p>
        <p><strong>Height:</strong> ${userProfile.height} cm</p>
        <p><strong>Weight:</strong> ${userProfile.weight} kg</p>
        <p><strong>Goal:</strong> ${userProfile.goal}</p>
    `;

    // When the button is clicked, generate personalized plan
    document.getElementById("generateRecommendationBtn").addEventListener("click", () => {
        getPersonalizedPlan(userProfile);
    });
}

async function getPersonalizedPlan(userData) {
    // Construct the prompt for AI based on user profile data
    const prompt = `Generate a personalized workout and diet plan for the following user:
        Age: ${userData.age}
        Gender: ${userData.gender}
        Height: ${userData.height} cm
        Weight: ${userData.weight} kg
        Goal: ${userData.goal}

    Create a plan that includes:
    - A daily workout routine with exercises
    - A diet plan with meals and nutritional information
    `;

    // Call your AI service to generate the plan (e.g., Together AI or GPT)
    const plan = await getAIResponse(prompt);

    // Display the generated plan in the chatbox
    document.getElementById("chatbox").innerHTML = `
        <h4>Workout Plan:</h4>
        <p>${plan.workout}</p>
        <h4>Diet Plan:</h4>
        <p>${plan.diet}</p>
    `;
}

// Example function to fetch AI response (e.g., OpenAI GPT or Together AI)
async function getAIResponse(prompt) {
    // Replace this with the actual API call to your AI service
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer d96ac6d659b2d1251e4166308730ed5812eca54760e37e3917ee55b58beed285`, // Replace with your API key
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 500, // Adjust as necessary
        }),
    });

    const data = await response.json();
    return data.choices[0].text; // Adjust based on API response structure
}

// Call the function when the page loads
getUserProfile();
