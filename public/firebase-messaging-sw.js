importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);

importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAdAtxJC0UbdEYDFhYvuOqB2DWusveb0hY",
  authDomain: "social-v2-b4278.firebaseapp.com",
  projectId: "social-v2-b4278",
  storageBucket: "social-v2-b4278.appspot.com",
  messagingSenderId: "525126960453",
  appId: "1:525126960453:web:335855b869ae7892886a2c",
  measurementId: "G-FYS9VE398K"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };


  const lastNotiId = await localforage.getItem("lastNotiId")

  if (lastNotiId === payload.data.id) {
    return;
  }


  localforage.setItem("lastNotiId", payload.data.id)
  self.registration.showNotification(notificationTitle, notificationOptions);
});