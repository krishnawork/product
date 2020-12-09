import firebase from 'firebase';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBIXuB5aME9CvYeI2ZaW1WfGesMRDY7ShI",
    authDomain: "product-work.firebaseapp.com",
    projectId: "product-work",
    storageBucket: "product-work.appspot.com",
    messagingSenderId: "268095297717",
    appId: "1:268095297717:web:9114208d655cbe9a6086fc",
    measurementId: "G-0RXVTKJSE7"
  };
  // Initialize Firebase
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);
  // }

  firebase.initializeApp(firebaseConfig);
  let auth=firebase.auth();
  export {auth}
  export default firebase;
