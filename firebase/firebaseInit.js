import {initializeApp} from "firebase/app"
import { firebaseConfig } from "./firebaseConfig";
import { getMessaging } from "firebase/messaging";
export const firebaseInitialize=()=>{
    const app = initializeApp(firebaseConfig);
    // const messaging = getMessaging(app);
    // messaging.getToken({vapidKey: "BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu"});
}