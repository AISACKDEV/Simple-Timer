var notificationCheckboxCurrent = document.getElementById('notifications-toggle');
var notificationStatusMessage = document.getElementById('notification-status-message');

function notify() {
    new Notification('Timer', {
        body: `Time out!`,
        requireInteraction: true,
        icon: `Images/timer_icon.png`
    })
}

function saveStatusFromNotificationsButton() {
    var notificationCheckboxForLocalStorage = document.getElementById('notifications-toggle');
    localStorage.setItem('NotificationStatus', notificationCheckboxForLocalStorage.checked);
}

function loadStatusFromNotificationsButton() {
    var checked = JSON.parse(localStorage.getItem('NotificationStatus'));
    
    if (checked) {
        Notification.requestPermission().then((res) => {
            if (res === 'granted') {
                notificationCheckboxCurrent.checked = true;
                notificationCheckboxCurrent.disabled = true;
            } else {
                notificationCheckboxCurrent.checked = false;
                saveStatusFromNotificationsButton();
                if (res === 'denied') {
                    notificationStatusMessage.textContent = "Notifications are blocked. Please enable them in your browser settings.";
                } else {
                    notificationStatusMessage.textContent = "Notification permission is set to default. Please provide permission.";
                }
            }
        });
    } else {
        notificationCheckboxCurrent.checked = false;
    }
}

notificationCheckboxCurrent.addEventListener('click', function () {
    if (notificationCheckboxCurrent.checked == true) {
        Notification.requestPermission().then((res) => {
            if (res === 'granted') {
                saveStatusFromNotificationsButton();
                notificationCheckboxCurrent.checked = true;
                notificationCheckboxCurrent.disabled = true;
                notificationStatusMessage.textContent = "";
            } else if (res === 'denied') {
                notificationCheckboxCurrent.checked = false;
                notificationStatusMessage.textContent = "Notifications are blocked. Please enable them in your browser settings.";
            } else if (res === 'default') {
                alert("Notification permission not given");
                notificationCheckboxCurrent.checked = false;
                notificationStatusMessage.textContent = "Notification permission is set to default. Please provide permission.";
            }
        });
    }
});

loadStatusFromNotificationsButton();