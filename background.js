chrome.notifications.getPermissionLevel(function(permissionLevel) {
    if (permissionLevel === "granted") {
        console.log("Notification permission granted");
    } else if (permissionLevel === "denied") {
        console.log("Notification permission denied, please enable it in your browser settings");
    } else {
        console.log("Notification permission not yet determined");
    }
});

function notify() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'Images/timer-icon.png', // Provide the path to your icon
        title: 'Timer Expired',
        message: 'Your timer has expired!',
        priority: 2
    });
}