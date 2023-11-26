document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userPreferencesForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (validateForm()) {
            try {
                const formData = new FormData(this);
                const response = await fetch('http://localhost:8080/getComparisonReport', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                renderGrid(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            console.log('Form is not valid');
        }
    });

    function renderGrid(data) {
        const gridContainer = document.getElementById('gridContainer');

        // Create a table element
        const table = document.createElement('table');
        table.classList.add('grid-table');

        // Create table header row
        const headerRow = document.createElement('tr');
        for (const key in data[0]) {
            if (Object.prototype.hasOwnProperty.call(data[0], key)) {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            }
        }
        table.appendChild(headerRow);

        // Create table rows with data
        data.forEach(item => {
            const row = document.createElement('tr');
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    const td = document.createElement('td');
                    td.textContent = item[key];
                    row.appendChild(td);
                }
            }
            table.appendChild(row);
        });

        // Append the table to the container
        gridContainer.innerHTML = ''; // Clear previous content
        gridContainer.appendChild(table);
    }

    function validateForm() {
        // Validate genre selection
        const genreSelect = document.getElementById('genreSelect');
        if (genreSelect.value === '') {
            alert('Please select a genre');
            return false;
        }
        // Validate Result type selection
        const resultType = document.querySelectorAll('input[name="selection"]:checked');
        if (!resultType || resultType.length === 0) {
            alert('Please select at least one result type.');
            return false;
        }


        // Validate top number of listened songs
        const topSongs = document.getElementById('topSongs');
        if (topSongs.value === '' || topSongs.value < 1 || topSongs.value > 100) {
            alert('Please enter a valid top number of listened songs (1-100).');
            return false;
        }

        // If all validation is passed.
        return true;
    }

});