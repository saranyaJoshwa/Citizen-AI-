document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way

    const questionInput = document.getElementById('question');
    const responseContainer = document.getElementById('response-container');
    const responseContent = document.getElementById('response-content');
    const userQuestion = questionInput.value.trim();

    if (userQuestion === "") {
        // You might want to show an error message here
        return;
    }

    // Hide previous response
    responseContainer.style.display = 'none';
    responseContent.innerHTML = '';

    // Show a loading message
    responseContent.innerHTML = '<p>Generating response, please wait...</p>';
    responseContainer.style.display = 'block';

    // Call the Flask API
    fetch('http://127.0.0.1:5000/citizen_query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuestion })
    })
    .then(response => response.json())
    .then(data => {
        if (data.response) {
            responseContent.innerHTML = data.response.replace(/\n/g, '<br>'); // Replace newlines with <br> for HTML
        } else {
            responseContent.innerHTML = '<p>Sorry, an error occurred while fetching the response.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        responseContent.innerHTML = '<p>Failed to connect to the server. Please check if the server is running.</p>';
    });
});