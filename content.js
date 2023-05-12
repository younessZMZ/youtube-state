// Establish a long-lived connection
let port = chrome.runtime.connect({name: "playpause"});

window.onload = function() {
    var video = document.querySelector('video');
    if(video) {
        console.log('Video element found');  // Logs when the video element is found
    } else {
        console.log('Video element not found');  // Logs when the video element is not found
        return;
    }
    var isPaused = video.paused;
    port.postMessage({isPaused: isPaused, command: isPaused ? 'play' : 'pause'});

    video.onplay = function() {
        isPaused = false;
        console.log('Video play/pause status changed');
        port.postMessage({isPaused: isPaused, command: 'pause'});
    };

    video.onpause = function() {
        isPaused = true;
        console.log('Video play/pause status changed');
        port.postMessage({isPaused: isPaused, command: 'play'});
    };
};

// Listen for disconnections
port.onDisconnect.addListener(function() {
    console.log("Disconnected from background script");
    port = null;
});
