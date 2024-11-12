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