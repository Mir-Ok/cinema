// ГОТОВО

import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";    

function saveData(event) {
   
	const userData = {
		name: event.target.elements.username.value,
		email: event.target.elements.email.value
	};

   localStorage.setItem("user", JSON.stringify(userData));
	localStorage.setItem("user_store", JSON.stringify(userData));

}

function LoginForm({ setModalActiveToken }) {

	function handleLogin(event) {
		event.preventDefault();
		saveData(event);
		setModalActiveToken(true);
	}

   return (
      <form
         className="login__form"
         onSubmit={handleLogin}
      >
         <h2 className="login__name">
				Registration
			</h2>
         <input 
				type="text" 
				name={"username"} 
				placeholder={"username"} 
				className="login__input" 
				required 
			/>
         <input 
				type="text" 
				name={"email"} 
				placeholder={"email"} 
				className="login__input" 
				required 
			/>
         <button 
				type="submit" 
				className="login__submit"
			>
            Get Token
         </button>
      </form>
   );
}

function TokenForm() {

   const navigate = useNavigate();

	const page = useSelector((state) => state.page);
	const sortBy = useSelector((state) => state.sortBy);
	const search = useSelector((state) => state.search);

   const [userToken, setUserToken] = useState('');

	function handlerSubmitForm() {
		localStorage.setItem('userToken', userToken)
		localStorage.setItem('token_store', userToken)
		navigate(`/films/${page}/${sortBy}/${search}`);
	}

   return (
      <form
         className="login__form"
         onSubmit={handlerSubmitForm}
      >
         <h2 className="login__name">Authorization</h2>
         <input 
				type="text" 
				name={"token"} 
				value={userToken}  
				onChange={ e => setUserToken(e.target.value) } 
				placeholder={"token"} 
				className="login__input" 
				required />
         <button 
				type="submit" 
				className="login__submit">
            Apply
         </button>
      </form>
   );
}

export { LoginForm, TokenForm };
