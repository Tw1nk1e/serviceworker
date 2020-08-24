self.addEventListener('notificationclose', (event) => {
  console.log('CLOSE', 7777777);
}, false);

importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '903136559212'
});

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Handling background message', payload);

  // Copy data object to get parameters in the click handler
  payload.data.data = JSON.parse(JSON.stringify(payload.data));

  return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclose', (event) => {
  console.log('CLOSE', 34343);
}, false);

self.addEventListener('notificationclick', function(event) {
  console.log(event, 1111111);

  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow(target);
  }));
});
