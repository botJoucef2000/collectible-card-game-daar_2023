document.addEventListener('DOMContentLoaded', function () {
    const createCollectionForm = document.getElementById('createCollectionForm');

    createCollectionForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const privateKey1 = 1; // Replace with your actual privateKey value
        localStorage.setItem('privateKey', privateKey1);
        const collectionName = document.getElementById('collectionName').value;
        const collectionSize = document.getElementById('collectionSize').value;
        const privateKey = localStorage.getItem('privateKey'); // Get the privateKey from localStorage

        // Assign the value of privateKey to the hidden input
        const privateKeyInput = document.getElementById('privateKey');
        privateKeyInput.value = privateKey; // Set the privateKey to the hidden input

        const data = {
            collectionName,
            collectionSize,
            privateKey,
        };

        try {
            const response = await fetch('http://localhost:3002/createCollection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                // Handle the response as needed
            } else {
                // Handle other HTTP error responses
                alert('Server error: ' + response.status);
            }
        } catch (error) {
            // Handle JavaScript errors
            console.error('Error:', error);
            alert('An error occurred while creating the collection.');
        }
    });
});


