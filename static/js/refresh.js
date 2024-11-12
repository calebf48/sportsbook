document.getElementById('refreshButton').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/refresh');
        const data = await response.json();

        if (data.success) {
            document.getElementById('output').textContent = data.output;
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
        const response = await fetch('/get-refresh-date');
        console.log('Response received:', response);

        if (!response.ok) {
            throw new Error('Failed to fetch refresh date');
        }

        const data = await response.json();
        console.log('Data fetched:', data);

        // Check if data contains the expected "Date" field (note the capital "D")
        if (data.Date) {
            console.log('Date found:', data.Date);

            // Attempt to find the HTML element
            const refreshElement = document.getElementById('lastRefresh');
            if (refreshElement) {
                refreshElement.textContent = `Last Refreshed: ${data.Date}`;
                console.log('Date displayed:', data.Date);
            } else {
                console.error('Element with id "lastRefresh" not found in the DOM');
            }
        } else {
            console.error('No Date field found in the response:', data);
        }
    } catch (error) {
        console.error('Error fetching refresh date:', error);
    }
}



