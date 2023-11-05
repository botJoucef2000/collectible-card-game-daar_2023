document.addEventListener('DOMContentLoaded', function() {
    // Get the form element by its ID
    const nftForm = document.getElementById('nftForm');
  
    nftForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      const cardName = document.getElementById('cardName').value;
      const collectionId = document.getElementById('collectionId').value;
      const cardURI = document.getElementById('cardURI').value; // Change "imageCard" to "cardURI"
              // Assign the value of privateKey to the hidden input
              const privateKey = localStorage.getItem('privateKey'); // Get the privateKey from localStorage

              // Assign the value of privateKey to the hidden input
              const privateKeyInput = document.getElementById('privateKey');
              privateKeyInput.value = privateKey; // Set the privateKey to the hidden input
      // Create a data object to send to the server
      const data = {
        collectionId,
        cardName,
        cardURI, privateKey// Updated variable name
      };
  
      // Send the data to the server using Fetch API (as shown in the previous response)
      try {
        const response = await fetch('http://localhost:3001/createCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.cardCreate === 'True') {
            // Handle success, e.g., show a success message to the user
            const createCardSuccess = document.getElementById('Addedsucessfuly');
            createCardSuccess.textContent = "Card Created successfully";
            
          } else {
            const createCardSuccess = document.getElementById('Addedsucessfuly');
            createCardSuccess.textContent = "there is an error";
            
          }
        } else {
          // Handle other HTTP error responses
          alert('Server error: ' + response.status);
        }
      } catch (error) {
        // Handle JavaScript errors
        console.error('Error:', error);
        alert('An error occurred while creating the card.');
      }
    });
  });
  