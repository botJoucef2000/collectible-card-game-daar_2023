document.addEventListener('DOMContentLoaded', function () {
    const transferForm = document.getElementById('nftForm');

    transferForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const toAddress = document.getElementById('address').value;
        const cardId = document.getElementById('cardID').value;

        const data = {
            addressTo: toAddress,
            cardID: cardId,
        };

        try {
            const response = await fetch('http://localhost:3002/transferCard', {
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
            alert('An error occurred while transferring the card.');
        }
    });
});

