document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userPreferencesForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get user preferences from the form
        const genre = document.getElementById('genreSelect').value;
        const rowNum = document.getElementById('topSongs').value;
        const selectedMetrics = Array.from(document.querySelectorAll('input[name="selection"]:checked'))
            .map(checkbox => checkbox.value);

        // Construct the userPreferences object
        const userPreferences = {
            genre,
            rowNum,
            selectedMetrics,
        };

        // Make a POST request to the server
        fetch('http://localhost:8080/getComparisonReport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPreferences),
        })
        .then(response => response.json())  // Use response.json() for JSON responses
        .then(data => {
            console.log(data); // Handle the response from the server
        })
        .catch(error => console.error('Error:', error));
    });

    // Function to display data on the page
    function displayData(data) {
        const resultContainer = document.getElementById('resultContainer');

        // Clear previous results
        resultContainer.innerHTML = '';

        // Create elements to display data
        const resultList = document.createElement('ul');

        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `Artist: ${item.Artist}, Average Listens: ${item.Average_Listens}, Total Listens: ${item.Total_Listens}, Average Ratings: ${item.Average_Ratings}`;
            resultList.appendChild(listItem);
        });

        // Append the result list to the container
        resultContainer.appendChild(resultList);
    }
});

