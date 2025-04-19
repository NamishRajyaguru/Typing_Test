// Save result to localStorage
function saveToLeaderboard(result) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push(result);
  
    // Optional: sort by WPM (descending)
    leaderboard.sort((a, b) => b.wpm - a.wpm);
  
    // Optional: limit to top 10
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
  }
  
  // Load and display leaderboard
  function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardList = document.getElementById('leaderboard_list');
    leaderboardList.innerHTML = '';
  
    leaderboard.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.wpm} wpm</td>
        <td>${entry.time}</td>
        <td>${entry.characters}</td>
      `;
      leaderboardList.appendChild(row);
    });
  }
  
// Clear leaderboard from localStorage
function clearLeaderboard() {
    localStorage.removeItem('leaderboard');
    loadLeaderboard(); // Reload to clear UI too
  }
  
  // Hook the button
  document.getElementById('clear_leaderboard').addEventListener('click', clearLeaderboard);
  