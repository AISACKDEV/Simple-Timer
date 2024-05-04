var notificationCheckboxCurrent = document.getElementById('notifications-toggle');
var notificationStatusMessage = document.getElementById('notification-status-message');

function notify() {
    new Notification('Timer', {
        body: `Time out!`,
        requireInteraction: true,
        icon: `/img/timer_icon.png`
    })
}

function saveStatusFromNotificationsButton() {
    var notificationCheckboxForLocalStorage = document.getElementById('notifications-toggle');
    localStorage.setItem('NotificationStatus', notificationCheckboxForLocalStorage.checked);
}

function loadStatusFromNotificationsButton() {
    var statusChecked = JSON.parse(localStorage.getItem('NotificationStatus'));
    
    if (statusChecked) {
        Notification.requestPermission().then((res) => {
            updateButtonState(res);
        });
    } else {
        notificationCheckboxCurrent.checked = false;
    }
}

function updateButtonState(permission) {
    if (permission === 'granted') {
        notificationCheckboxCurrent.checked = true;
        notificationCheckboxCurrent.disabled = true;
        notificationStatusMessage.textContent = "";
        notificationStatusMessage.style.display = 'none';
    } else if (permission === 'denied') {
        notificationStatusMessage.style.display = 'block';
        notificationCheckboxCurrent.checked = false;
        notificationStatusMessage.textContent = "Notifications are blocked. Please enable them in your browser settings.";
    } else if (permission === 'default') {
        notificationStatusMessage.style.display = 'block';
        notificationCheckboxCurrent.checked = false;
        notificationStatusMessage.textContent = "Notification permission is set to default. Please provide permission.";
    }
}

notificationCheckboxCurrent.addEventListener('click', function () {
    if (notificationCheckboxCurrent.checked == true) {
        Notification.requestPermission().then((res) => {
            updateButtonState(res);
            saveStatusFromNotificationsButton();
        });
    }
});

// Listen for changes in notification permission
Notification.requestPermission().then((permission) => {
    updateButtonState(permission);
});

loadStatusFromNotificationsButton();