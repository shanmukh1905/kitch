document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
         console.log('Form Data:', formData); // Check form data
    console.log('JSON Data:', jsonData); // Check JSON data
  
    // Send form data as JSON via fetch
    fetch('/listing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Optionally handle success response here
    })
    .catch(error => {
        console.error('Error:', error);
        // Optionally handle error here
    });
});
