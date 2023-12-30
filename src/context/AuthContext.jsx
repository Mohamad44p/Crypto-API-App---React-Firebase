import { useState , useContext , useEffect , createContext } from "react";
import { auth , db } from "../firebase";
import { createUserWithEmailAndPassword , onAuthStateChanged , signInWithEmailAndPassword , signOut } from "firebase/auth";
import { setDoc , doc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user , setUser] = useState({});

  const signUp = (email , password) => {
    createUserWithEmailAndPassword(auth , email , password);
    return setDoc(doc(db , "users" , email) , {
      watchList: [],
    })
  }
 const signIn = (email , password) => {
    return signInWithEmailAndPassword(auth , email , password);
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
      setUser(currentUser);
    })
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <UserContext.Provider value={{ signUp , signIn , logout , user }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext);
}
