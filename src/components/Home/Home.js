import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

export function Home() {

   const history = useHistory();
   const { user, signInWithGoogle } = useAuth();

   async function handleSignIn() {
      if(!user) {
         await signInWithGoogle();
      }

      history.push(`/dashboard/${user?.id}`);
   } 

   return <button onClick = { handleSignIn }>Conecte-se com o Google</button>
}