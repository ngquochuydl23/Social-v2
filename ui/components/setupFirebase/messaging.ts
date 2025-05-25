import { getToken, onMessage } from "firebase/messaging";
import { firebaseConfig, messaging } from "./firebase";
import localforage from 'localforage'

export const getFcmToken = async () => {
  const msg = await messaging();
  if (!msg)
    throw new Error("fcm init error ");

  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(process.env.NEXT_PUBLIC_SERVICE_WORKER!!);
    const fcm_token = await getToken(msg, {
      vapidKey: 'BHiZ7UOOIt70ByS6282iCkNRgq3S_CAnqMz_jNRl01rViOb9Lnb_9GxnHCBBPAyaEbUFnM-BP1GZKRpT009w_Sg',
      registration,
    } as any);

    localforage.setItem('fcm_token', fcm_token);
    return fcm_token;
  }
  return null;
};


export const onReceiveMessage = async (func?: (payload: any) => any) => {
  const msg = await messaging();
  if (!msg) throw new Error("fcm init error ");

  onMessage(msg, (message) => {
    if (func)
      func(message)
  });
}