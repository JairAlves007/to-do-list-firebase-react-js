import { useEffect, useState, createContext } from "react";
import { firebase, auth } from '../services/firebase';

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
   
   const [ user, setUser ] = useState();

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         if(user) {
            const { uid, displayName, photoURL } = user;

            if(!displayName || !photoURL) {
               throw new Error('Missing Informatiosn From Google Account.');
            }

            setUser({
               id: uid,
               name: displayName,
               avatar: photoURL
            });
         }
      });

      return () => {
         unsubscribe();
      }
   }, []);
   
   async function signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider();

      const result = await auth.signInWithPopup(provider);
      
      if(result.user){
         const { uid, displayName, photoURL } = result.user;

         if(!displayName || !photoURL) {
            throw new Error("Missing Informations From Google Account.");
         }

         setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
         });
      }
   }

   function signOutFromGoogleAccount () {
      setUser();
   }

   return (
      <AuthContext.Provider value = {{ user, signInWithGoogle, signOutFromGoogleAccount }}>
         { props.children }
      </AuthContext.Provider>
   );
}