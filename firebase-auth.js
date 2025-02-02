import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser as firebaseDeleteUser } from 'firebase/auth';
import { app } from './firebase-config'; 

const auth = getAuth(app);

const signup = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

const signin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const signout = async () => {
  return await signOut(auth);
};

const deleteUser = async (user) => {
  return await firebaseDeleteUser(user);
};

export { auth, signup, signin, signout, deleteUser };
