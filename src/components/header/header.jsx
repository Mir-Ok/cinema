// ГОТОВО

import "./header.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../../scripts/elements";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm, TokenForm } from "../login/login";
import { logOut } from "../../store/actions";
import { PATHES } from "../../App";

function CreateLoggedMenu({ items }) {
   console.log("Logged");

   const dispatch = useDispatch();

   const itemsLoggedMenu = items.map((item) => (
      <NavLink
         key={item.url}
         to={item.url}
         className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : "normal"
         }
      >
         {item.name}
      </NavLink>
   ));
	
	function handlerUserLogout() {
		dispatch(logOut());
		localStorage.removeItem('userToken')
	}

   return (
      <>
         <ul className="">{itemsLoggedMenu}</ul>
         <button
            className="login__button"
            onClick={handlerUserLogout}
			>
            Log Out
         </button>
      </>
   );
}

function CreateUNLoggedMenu({ setModalActive }) {
   console.log("UN_logged");

   const itemsUNLoggedMenu = (
      <NavLink
         key={PATHES.root}
         to={PATHES.root}
         className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : "normal"
         }
      >
         Главная
      </NavLink>
   );

   return (
      <>
         <ul className="">{itemsUNLoggedMenu}</ul>
         <button className="login__button" onClick={() => setModalActive(true)}>
            Log In
         </button>
      </>
   );
}

function CreateMainMenu({ isAuth, setModalActive }) {

	const page = useSelector((state) => state.page);
	const sortBy = useSelector((state) => state.sortBy);
	const search = useSelector((state) => state.search);

   const items = [
      { 
			name: "Главная", 
			url: "/" },
      {
         name: "Фильмы",
			url: `/films/${page}/${sortBy}/${search}`
      },
   ];

   return (
      <div className="header nav">
         {isAuth ? (
            <CreateLoggedMenu items={items} />
         ) : (
            <CreateUNLoggedMenu items={items} setModalActive={setModalActive} />
         )}
      </div>
   );
}

function CreateHeader({ isAuth }) {
   const [modalActive, setModalActive] = useState(false);
   const [modalActiveToken, setModalActiveToken] = useState(false);

   return (
      <>
         <CreateMainMenu 
				isAuth={isAuth} 
				setModalActive={setModalActive} 
			/>

         <Modal 
				active={modalActive} 
				setActive={setModalActive}
			>
            <LoginForm 
					setModalActiveToken={setModalActiveToken} 
				/>
         </Modal>

         <Modal 
				active={modalActiveToken} 
				setActive={setModalActiveToken}
			>
            <TokenForm 
					isAuth={isAuth} 
				/>
         </Modal>
      </>
   );
}

export { CreateHeader };
