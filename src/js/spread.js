// Function to fetch JSON data from a file
async function fetchJsonData() {
    try {
        const response = await fetch('src/data/response_spread.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error('Failed to load JSON data');
        }
        const data = await response.json(); // Parse the JSON data
        renderTable(data); // Call renderTable function to display data
    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}

// Function to format the date to mm/dd/yyyy hh:mm am/pm
function formatDate(dateString) {
const options = { 
weekday: 'short', 
year: 'numeric', 
month: '2-digit', 
day: '2-digit', 
hour: '2-digit', 
minute: '2-digit', 
hour12: true 
};

const date = new Date(dateString);
return date.toLocaleString('en-US', options); // Format as 'MM/DD/YYYY hh:mm AM/PM'
}

function renderTable(data) {
const tableBody = document.querySelector('#oddsTable tbody');
const tableHeader = document.querySelector('#oddsTable thead tr');

tableBody.innerHTML = '';  // Clear any existing data

// Create a set to track unique bookmakers
const bookmakersSet = new Set();

// First, we need to gather all unique bookmakers
data.forEach(game => {
game.bookmakers.forEach(bookmaker => {
    bookmakersSet.add(bookmaker.title); // Add each bookmaker's title
});
});

// Convert the set to an array for easier manipulation
const bookmakers = Array.from(bookmakersSet);

// Add columns for each bookmaker
bookmakers.forEach(bookmaker => {
const headerCell = document.createElement('th');
headerCell.textContent = bookmaker; // Set the bookmaker's title as the header
tableHeader.appendChild(headerCell);
});

// Now, for each game, we need to populate the rows
data.forEach(game => {
const { commence_time, home_team, away_team, bookmakers: gameBookmakers } = game;
const row = document.createElement('tr');

// Format the commence_time and add it to the table
const dateCell = document.createElement('td');
dateCell.innerHTML = formatDate(commence_time); // Format the start time
row.appendChild(dateCell);

const teamCell = document.createElement('td');
teamCell.innerHTML = `${away_team} <br> ${home_team}`; // Format the team names
row.appendChild(teamCell);

// For each bookmaker, find the odds for the current game and fill the table
bookmakers.forEach(bookmaker => {
    const bookmakerCell = document.createElement('td');
    const gameBookmaker = gameBookmakers.find(b => b.title === bookmaker);

    if (gameBookmaker) {
        // Find the odds for both teams
        const market = gameBookmaker.markets.find(m => m.key === 'spreads');
        if (market) {
            const awayOutcome = market.outcomes.find(outcome => outcome.name === away_team);
            const homeOutcome = market.outcomes.find(outcome => outcome.name === home_team);

            if (awayOutcome && homeOutcome) {
                bookmakerCell.innerHTML = `${awayOutcome.point} ${awayOutcome.price}<br> ${homeOutcome.point} ${homeOutcome.price}`; // Set the odds
            }
        }
    }

    // If there are no odds for this bookmaker, leave the cell empty
    if (!bookmakerCell.innerHTML) {
        bookmakerCell.innerHTML = '';
    }

    row.appendChild(bookmakerCell);
});

tableBody.appendChild(row);
});
}
// Call fetchJsonData to load and display the data
fetchJsonData();