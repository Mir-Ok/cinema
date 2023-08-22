// ГОТОВО

import "./root.css";
import { CreateHeader } from "../../components/header/header";
import { CreateFooter } from "../../components/footer/footer";
import { Outlet } from "react-router-dom"; // указывает место отображения потомков
import { useSelector } from "react-redux";
import { UserStatus, saveGenres, saveFavorites } from "../../store/actions"; 
import { Suspense, useEffect } from "react";
import { useLoaderData, defer, Await } from "react-router-dom"; // указывает место отображения потомков
import { createOptionsGet } from "../../scripts/elements";
import { MOVIE_URL } from "../../scripts/constants";
import { store } from "../../store/store";

async function getGenres(options) {
   const genres = await fetch(
      `${MOVIE_URL}/genre/movie/list?language=en`,
      options
   );
   if (genres.status !== 200) {
      console.error(`Ошибка АПИ genres, код ${genres.status} `);
   }

   return await genres.json();
}

async function getFavorites(options) {
   const favoritesLists = [];
   let maxPagesDef = 3; // вытащить из стейта

   for (let page = 1; page <= maxPagesDef; page++) {
      const favorite = await fetch(
         `${MOVIE_URL}/account/20044599/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
         options
      );
      const favoriteJSON = await favorite.json();
      if (favorite.status !== 200) {
         console.error(`Ошибка АПИ favorite, код ${favorite.status} `);
      }
      favoritesLists.push(favoriteJSON.results.map((item) => item.id));
      maxPagesDef = favoriteJSON.total_pages;
   }
   const favoriteUID = [].concat(...favoritesLists);

   return { favotite_uids: favoriteUID, favorite_pages: maxPagesDef };
}

async function getStartData() {
   const options = createOptionsGet();
   const initialFetch = {};

   try {
      initialFetch["allGenres"] = await getGenres(options);
      initialFetch["favorites"] = await getFavorites(options);
      return initialFetch;
   } catch (err) {
      console.error(err);
   }
}

const rootLoader = async () => {
   return defer({
      // дает возможность ожидать подгрузки данных
      startData: getStartData(),
   });
};

function SaveStartData( {data} ) {
	
	useEffect(() => {
		console.log('Изменился список жанров / избранного')
		store.dispatch(saveGenres(data.allGenres.genres))
		store.dispatch(saveFavorites(data.favorites.favotite_uids))
   }, [data]);
}

function Root() {

	const { startData } = useLoaderData(); // получаем загруженное через лоадер
   
   const auth_status = useSelector((state) => state.auth_status);
   const isAuth = (auth_status === UserStatus.LOGGED) ? true : false;

   return (
		
		<div>
			<Suspense
				fallback={
					<div className="spin-wrapper">
						<div className="spinner"></div>
					</div>
				}
			>
				<Await resolve={startData}>
					{(resolvedStartData) => (
						<div>
							<CreateHeader isAuth={isAuth} />
							{isAuth && <Outlet />}
							<CreateFooter />							
							<SaveStartData data={resolvedStartData}/>
						</div>
					)}
				</Await>
			</Suspense>
		</div>
   );
}

export { Root, rootLoader };
