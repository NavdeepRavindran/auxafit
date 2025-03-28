import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://dvcticgzggpmmluentsq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y3RpY2d6Z2dwbW1sdWVudHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjUwNjksImV4cCI6MjA1ODc0MTA2OX0.3klZQAU630HuDpplOG1qfLlRdD7s4uFqHdlMmqCDWyA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Expose functions to the global scope
window.addWorkout = addWorkout;
window.deleteWorkout = deleteWorkout;
window.markAsCompleted = markAsCompleted;

async function addWorkout() {
    const workoutName = document.getElementById('workout-name').value;
    const times = document.getElementById('workout-times').value;
  
    // Check if workout name or times are empty
    if (workoutName.trim() === '' || times.trim() === '') {
      return alert('Please enter both workout name and number of times.');
    }
  
    const { data, error } = await supabase
      .from('workouts')
      .insert([{ workout_name: workoutName, times: times }]);
  
    if (error) {
      console.error('Error adding workout:', error);
      return;
    }
  
    // Ensure data is not null or empty
    if (!data || data.length === 0) {
      console.error('No data returned from the insert query');
      return;
    }
  
    const workoutId = data[0].id;
    const newWorkoutItem = createWorkoutItem(workoutName, workoutId, times);
    document.getElementById('workout-list').appendChild(newWorkoutItem);
    document.getElementById('workout-name').value = '';
    document.getElementById('workout-times').value = ''; // Clear the times input field
  }
  

function createWorkoutItem(workoutName, workoutId, times) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${workoutName} - ${times} times</span>
    <div>
      <button class="complete" onclick="markAsCompleted(${workoutId})">Mark as Completed</button>
      <button class="delete" onclick="deleteWorkout(${workoutId})">Delete</button>
    </div>
  `;
  li.setAttribute('data-id', workoutId);
  return li;
}

async function markAsCompleted(workoutId) {
    const { data, error } = await supabase
      .from('workouts')
      .update({ status: 'completed' })
      .match({ id: workoutId });
  
    if (error) {
      console.error('Error marking as completed:', error);
      return;
    }
  
    const workoutItem = document.querySelector(`li[data-id="${workoutId}"]`);
    workoutItem.querySelector('.complete').disabled = true;
    workoutItem.querySelector('.complete').textContent = 'Completed';
  }
  

async function deleteWorkout(workoutId) {
  const { data, error } = await supabase
    .from('workouts')
    .delete()
    .match({ id: workoutId });

  if (error) {
    console.error('Error deleting workout:', error);
    return;
  }

  const workoutItem = document.querySelector(`li[data-id="${workoutId}"]`);
  workoutItem.remove();
}

async function loadWorkouts() {
  const { data, error } = await supabase.from('workouts').select('*');

  if (error) {
    console.error('Error fetching workouts:', error);
    return;
  }

  data.forEach(workout => {
    const workoutItem = createWorkoutItem(workout.workout_name, workout.id, workout.times);
    document.getElementById('workout-list').appendChild(workoutItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-workout-button');
  if (addButton) {
    addButton.addEventListener('click', addWorkout);
  }
  loadWorkouts();
});

function logout() {
  alert("Logging out...");
  window.location.href = '/frontend/index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('.navbar button');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
});
