// Listen for connections from the content script
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "playpause");

    // Listen for messages from the content script
    port.onMessage.addListener(function(message) {
        // Send a HTTP request to the Flask server
        fetch('http://localhost:5000/playpause', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
    });
});
