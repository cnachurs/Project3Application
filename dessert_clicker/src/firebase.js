import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordReset,
    signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  getDocs,
  addDoc,
  where,
 } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4CSisZquYNNloipgoNtsXf4DzH6ZzdE4",
    authDomain: "project3dessertclicker.firebaseapp.com",
    databaseURL: "https://project3dessertclicker-default-rtdb.firebaseio.com",
    projectId: "project3dessertclicker",
    storageBucket: "project3dessertclicker.appspot.com",
    messagingSenderId: "1052112445906",
    appId: "1:1052112445906:web:0930d8b335c5414136280b",
    measurementId: "G-QQWT5STB4B"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const user = auth.currentUser;
// const uid = user.uid;
// const userDocRef = doc(db, 'users', uid);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
// const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in successfully');
    // ... rest of your code
  } catch (err) {
    console.error('Error logging in:', err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log('User registered successfully');
    // ... rest of your code
  } catch (err) {
    console.error('Error registering:', err);
    alert(err.message);
  }
};

// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
const sendPasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
   console.error(err);
  }
};
  
const user = auth.currentUser;
const uid = user ? user.uid : null;
const userDocRef = uid ? doc(db, 'users', uid) : null;

const saveGameData = async (userId, gameData) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid) {
      await setDoc(userDocRef, gameData); // Set the game data in Firestore
    } else {
      console.log("No valid user logged in. Game data not saved.");
    }
  } catch (error) {
    console.error("Error saving game data:", error);
  }
};
const loadGameData = async (userId) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid) {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return docSnap.data(); // Return the game data if it exists
      }
      return null; // Return null if no game data found
    } else {
      console.log("No valid user logged in. Unable to load game data.");
      return null;
    }
  } catch (err) {
    console.error("Error loading game data:", err);
    return null;
  }
};



// const saveGameData = async (userId, gameData) => {
//   try {
//     const currentUser = auth.currentUser;
//     if (currentUser && currentUser.uid) {
//       // Your code to save game data here
//       // ...
//     } else {
//       console.log("No valid user logged in. Game data not saved.");
//       // Handle the scenario when no valid user is logged in
//     }
//   } catch (error) {
//     console.error("Error saving game data:", error);
//   }
// };

// const loadGameData = async (userId) => {
//   try {
//     const currentUser = auth.currentUser;
//     if (currentUser && currentUser.uid) {
//       // Your code to load game data here
//       // ...
//     } else {
//       console.log("No valid user logged in. Unable to load game data.");
//       // Handle the scenario when no valid user is logged in
//       return null; // Or handle this situation accordingly
//     }
//   } catch (err) {
//     console.error("Error loading game data:", err);
//     return null;
//   }
// };

export {
  auth,
  db,
  userDocRef,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  logout,
  saveGameData,
  loadGameData,
};