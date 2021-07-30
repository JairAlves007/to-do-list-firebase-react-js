import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { database } from "../../services/firebase";

export function Dashboard() {

   const history = useHistory();
   const { user, signOutFromGoogleAccount } = useAuth();
   const [ todo, setTodo ] = useState('');
   const [ todoList, setTodoList ] = useState([]);

   useEffect(() => {
      const dbRef = database.ref(`${user?.id}/todo-list`);

      dbRef.on('value', todo => {
         const firebaseTodo = todo.val();
         
         if(firebaseTodo){
            const parsedTodoList = Object.entries(firebaseTodo);
            
            setTodoList(parsedTodoList);
         }
      });

      return () => {
         dbRef.off('value');
      }
   }, [user?.id, todoList]);

   async function handleSendNewTodo(e) {
      e.preventDefault();

      if(todo.trim() === "") {
         return;
      }

      const dbRef = database.ref(`${user.id}/todo-list`);

      await dbRef.push({
         todo: todo,
         concluded: false
      });

      setTodo('');
   }

   async function handleSignOut() {
      await signOutFromGoogleAccount();

      history.push('/');
   }

   return (
      <div>
         <img src = { user?.avatar } alt = "Perfil" />
         <h1>{ user?.name }</h1>
         <h1>{ user?.id }</h1>
         <button onClick = { handleSignOut }>Sair</button>

         <form onSubmit = { handleSendNewTodo }>
            <input 
               type="text"
               onChange = { e => setTodo(e.target.value) }
               value = { todo }
            />

            <button type="submit">Adicionar Na Lista</button>
         </form>

         {
            todoList.map(([key, todo]) => {
               return(
                  <div key = { key }>
                     <h1>{ todo.todo }</h1>
                     <h1>Status: { todo.concluded ? 'Concluído' : 'Em Andamento' }</h1>
                  </div>
               );
            })
         }
      </div>
   );
}