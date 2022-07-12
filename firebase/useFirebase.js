import {firebaseInitialize} from './firebaseInit'
import { getMessaging, getToken } from "firebase/messaging";
import { async } from '@firebase/util';
// import messaging from 'firebase/messaging';

firebaseInitialize()
export const useFirebase = ()=>new Promise(async (resolve, reject) => {
    const messaging = getMessaging();
    getToken(messaging,{vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY}).then((currentToken) => {
        if (currentToken) {
            console.log("currentToken",currentToken)
            resolve(currentToken)
        }
      }).catch((err) => {

      });

}
)