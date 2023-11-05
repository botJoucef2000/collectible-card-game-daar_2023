document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const address = document.getElementById('username').value;
        const privateKey = document.getElementById('password').value;
        localStorage.setItem('privateKey', privateKey);
        // Export the element as a module

        


        const data = {
            address,
            privateKey,
        };

        try {
            const response = await fetch('http://localhost:3002/connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.loginSuccessful) {
                    // Handle successful login, e.g., redirect to another page
                    window.location.href = 'adminloginpage.html';
                } else {
                    // Handle login failure, e.g., show an error message
                    alert(responseData.message);
                }
            } else {
                // Handle other HTTP error responses
                alert('Server error: ' + response.status);
            }
        } catch (error) {
            // Handle JavaScript errors
            console.error('Error:', error);
            alert('An error occurred while logging in.');
        }
    });
});



