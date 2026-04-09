/* global importScripts, firebase */

importScripts(
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyBSBa4RCxQobRMzQ67boTTqHTCIgKRJ8fY',
  authDomain: 'house-needs-a7f74.firebaseapp.com',
  projectId: 'house-needs-a7f74',
  messagingSenderId: '628622540148',
  appId: '1:628622540148:web:66a94faaff30d7f6a40021',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
