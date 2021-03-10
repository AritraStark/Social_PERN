import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAfq8dbyNPcnvt07Z69NVkq0Oc-fvJ0WGg",
    authDomain: "social-24fc5.firebaseapp.com",
    projectId: "social-24fc5",
    storageBucket: "social-24fc5.appspot.com",
    messagingSenderId: "951585066141",
    appId: "1:951585066141:web:079466c3164cae24105874"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const realDB = firebase.database()
export const bucket = firebase.storage()