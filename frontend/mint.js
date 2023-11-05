document.addEventListener('DOMContentLoaded', function () {
  const mintForm = document.getElementById('mintForm');

  mintForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const addressTo = document.getElementById('addressTo').value;
      const cardId = document.getElementById('cardId').value;
      const privateKey = localStorage.getItem('privateKey'); // Get the privateKey from localStorage

      // Assign the value of privateKey to the hidden input
      const privateKeyInput = document.getElementById('privateKey');
      privateKeyInput.value = privateKey; // Set the privateKey to the hidden input

      const data = {
          addressTo,
          cardId,privateKey
      };

      try {
          const response = await fetch('http://localhost:3000/mintCard', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });

          if (response.ok) {
              const responseData = await response.json();
              if (responseData.cardMinted === 'True') {
                  const mintSuccess = document.getElementById('MintSuccessful');
                  mintSuccess.textContent = "Card Minted successfully";
              } else {
                  const mintSuccess = document.getElementById('MintSuccessful');
                  mintSuccess.textContent = "There was an issue with card minting.";
              }
          } else {
              alert('Server error: ' + response.status);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while minting the card.');
      }
  });
});


