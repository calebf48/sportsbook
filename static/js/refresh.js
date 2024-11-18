document.getElementById('refreshButton').addEventListener('click', async () => {
    try {
        let route;

        if (window.location.pathname.includes('nfl')) {
            route = 'refresh-nfl';
        }
        else if (window.location.pathname.includes('ncaaf')) {
            route = 'refresh-ncaaf';
        }
        const response = await fetch(`http://localhost:5000/${route}`);
        const data = await response.json();

        if (data.success) {
            document.getElementById('output').textContent = data.output;

            //Re-fetch data and refresh table and refresh date
            await fetchLastRefreshDate();
            console.log('Fetched Refresh Date')
            await fetchJsonData();
            console.log('Fetched JSON Data')
        } else {
            document.getElementById('output').textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        document.getElementById('output').textContent = `Request failed: ${error.message}`;
    }
});

async function fetchLastRefreshDate() {
    console.log('Fetching refresh date...');
    try {
        let route;

        if (window.location.pathname.includes('nfl')) {
            route = 'get-refresh-date-nfl';
        }
        else if (window.location.pathname.includes('ncaaf')) {
            route = 'get-refresh-date-ncaaf';
        }
        const response = await fetch(`/${route}`);
        console.log('Response received:', response);

        if (!response.ok) {
            throw new Error('Failed to fetch refresh date');
        }

        const data = await response.json();
        console.log('Data fetched:', data);

        // Check if data contains the expected "Date" field (note the capital "D")
        if (data.Date) {
            console.log('Date found:', data.Date);

            //Convert date string to CST format
            const formattedDate = converToCST(data.Date);
            
            const currentPath = window.location.pathname;
            console.log(currentPath);
            if (currentPath == '/nflh2h') {
                const refreshElement = document.getElementById('lastRefresh');
                refreshElement.textContent = `Last Refreshed: ${formattedDate}`;
            }
            else if (currentPath == '/nflspread') {
                const refreshElement = document.getElementById('lastRefresh');
                refreshElement.textContent = `Last Refreshed: ${formattedDate}`;
            }
            else if (currentPath == '/nfltotal') {
                const refreshElement = document.getElementById('lastRefresh');
                refreshElement.textContent = `Last Refreshed: ${formattedDate}`;
            }
            else if (currentPath == '/ncaafh2h') {
                const refreshElement = document.getElementById('lastRefresh');
                refreshElement.textContent = `Last Refreshed: ${formattedDate}`;
            }
            else if (currentPath == '/ncaafspread') {
                const refreshElement = document.getElementById('lastRefresh');
                refreshElement.textContent = `Last Refreshed: ${formattedDate}`;
            }
            else if (currentPath == '/ncaaftotal') {
                const refreshElement = document.getElementById('lastRefresh');
                refreshElement.textContent = `Last Refreshed: ${formattedDate}`;
            }
            else {
                console.error('Element with id "lastRefresh" not found in the DOM');
            }
        } 
        else {
            console.error('No Date field found in the response:', data);
        }
    } 
    catch (error) {
        console.error('Error fetching refresh date:', error);
    }
}

//Helper function to convert LastRefreshDate() to CST and format date
function converToCST(dateString) {
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Chicago'
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
}



