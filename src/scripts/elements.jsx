import "./elements.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useState } from "react";
import { MOVIE_URL } from "./constants";
import { useSelector } from "react-redux";

// модалка
function Modal({ active, setActive, children }) {
   return (
      // закрытие по клику на темную область и запрет всплытия по клику по контенту
      <div
         className={active ? "modal active" : "modal"}
         onClick={() => setActive(false)}
      >
         <div
            className={active ? "modal__content active" : "modal__content"}
            onClick={(e) => e.stopPropagation()}
         >
            {children}
         </div>
      </div>
   );
}

// избранное
async function toggleFavorite(isFavorite, uid) {
   const body = JSON.stringify({
      media_type: "movie",
      media_id: uid,
      favorite: !isFavorite,
   });
   const options = createOptionsPost(body);

   const favorite = await fetch(  
		`${MOVIE_URL}/account/20044599/favorite`,
      options
   );
   if (favorite.status < 200 && favorite.status > 299) {
      console.log(`Ошибка АПИ favorite, код ${favorite.status} `);
   }
}

function Favorite({ uid }) {

	const favorites = useSelector((state) => state.favorites);
	const isFavorite = favorites.includes(uid) ? true : false;

   const [isActive, setIsActive] = useState(false);
   const handleClick = () => {
      setIsActive((current) => !current);
   };

   return (
      <button
         style={{
            backgroundColor: isActive ? "red" : "",
            color: isActive ? "black" : "",
         }}
         onClick={() => {
            toggleFavorite(isFavorite, uid);
            handleClick();
         }}
      >
         {isFavorite ? <StarRateIcon /> : <StarBorderIcon />}
      </button>
   );
}

// токен только в сторадже!
const bearer_token = `Bearer ${localStorage.getItem('token_store')}`

function createOptionsGet() {
   const options = {
      method: "GET",
      headers: {
         accept: "application/json",
         Authorization: bearer_token,			
      },
   };

   return options;
}

function createOptionsPost(body) {
   const options = {
      method: "POST",
      headers: {
         accept: "application/json",
         "content-type": "application/json",
         Authorization: bearer_token,
      },
      body: body,
   };

   return options;
}

export { Modal, Favorite, createOptionsGet, createOptionsPost };
