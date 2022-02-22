import firebase from "firebase/compat/app";
import "firebase/compat/database";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import 'firebase/storage';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwbetB5JlCGLiDeaY3bCa-1k_oS2w5Chk",
  authDomain: "denpurna-react.firebaseapp.com",
  databaseURL: "https://denpurna-react-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "denpurna-react",
  storageBucket: "denpurna-react.appspot.com",
  messagingSenderId: "908721827698",
  appId: "1:908721827698:web:2874009e0d2c33fa2f37eb",
  measurementId: "G-ZPEZ1ZSBGS"
};

const initF=firebase.initializeApp(firebaseConfig);
const db=initF.database();
const auth = getAuth(initF);
const dbFS = getFirestore(initF);
const dbFS_lawas = initF.firestore();
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(dbFS, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(dbFS, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        role: "user",
      });
    
      
    sessionStorage.setItem('___user_id', user.uid);
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    .then(function(response){
        sessionStorage.setItem('___user_id', 
          response.user.uid
        );
      }
    );
    
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(dbFS, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      role: "user",
    });
    sessionStorage.setItem('___user_id', user.uid);
    
    window.location.replace("/");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  sessionStorage.removeItem('___user_id');
  sessionStorage.clear();

   window.location.replace("/login");
};

const storage = firebase.storage()

export {
  auth,
  db,
  dbFS,
  dbFS_lawas,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};