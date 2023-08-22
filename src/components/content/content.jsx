// ГОТОВО

import "./content.css";
import { Suspense, useEffect } from "react";
import { 
	useLoaderData, 
	useNavigate,
	defer, 
	Await,
	Link,
} from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";   
import { setTotalPages } from '../../store/actions';
import {
   IMAGE_BASE_URL,
   MOVIE_URL,
} from "../../scripts/constants";
import { initialState } from '../../store/reducers';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CreatePagination, CreateSideBar } from "../sidebar/sidebar";
import { Favorite, createOptionsGet } from "../../scripts/elements";
import { store } from "../../store/store";

function CreateFilmCard({ details }) {

	const page = useSelector((state) => state.page);
	const sortBy = useSelector((state) => state.sortBy);
	const search = useSelector((state) => state.search);

   return (
      <Card sx={{ width: 250 }}>
         <CardMedia
            sx={{ height: 140 }}
            image={IMAGE_BASE_URL + details.backdrop_path}
            title={details.original_title}
         />
         <CardContent>
            <Typography gutterBottom variant="h6" component="div">
               <Link to={`/films/${page}/${sortBy}/${search}/${details.id}`} >
                  {details.original_title}
               </Link>
            </Typography>

            <Favorite uid={details.id} />

            <Typography variant="body2" gutterBottom>
               Рейтинг: {details.vote_average}
            </Typography>
         </CardContent>
      </Card>
   );
}

function CreateFilmCards({ rootData }) {
   
   return rootData.films.results.map((item) => (
      <CreateFilmCard 
			key={item.id} 
			details={item} 
		/>
   ));
}

function SetTotalPages({ rootData }) {
	const dispatch = useDispatch();  
	dispatch(setTotalPages(rootData.films.total_pages)) 
}

async function getFilms(options, params) {
	
   console.log(params)

   let films = null;
   if (params.search === initialState.search) {
      // console.log("NO search");
      films = await fetch(
         `${MOVIE_URL}/movie/${params.sortby}?language=en-US&page=${params.page}`,
         options
      );
   } else {
      // console.log("search");
      films = await fetch(
         `${MOVIE_URL}/search/movie?query=${params.search}&include_adult=false&language=en-US&page=${params.page}`,
         options
      );
   }
   if (films.status !== 200) {
      console.log(`Ошибка АПИ films, код ${films.status} `);
   }

   return await films.json();
}

async function getSearchedFilms({ params }) {
   const options = createOptionsGet();
   const initialFetch = {};

   try {
      initialFetch["films"] = await getFilms(options, params);
      return initialFetch;
   } catch (err) {
      console.log(err);
   }
}

// проброс из роутера
const createContentLoader = async ({ params }) => {
   return defer({
      // дает возможность ожидать подгрузки данных
      searchedFilms: getSearchedFilms({ params }),
   });
};

function CreateContent() {

	console.log(store.getState());

   const { searchedFilms } = useLoaderData(); 
	
	const reset_content = useSelector((state) => state.reset_content);
	const page = useSelector((state) => state.page);
	const sortBy = useSelector((state) => state.sortBy);
	const search = useSelector((state) => state.search);

   const navigate = useNavigate(); // для навигации по дереву
   useEffect(() => {
      navigate(`/films/${page}/${sortBy}/${search}`)
   }, [page, sortBy, search, navigate]);

   return (
		<div className="content">
			<div className="sidebar">
				<CreateSideBar />
			</div>            
			<Suspense
				fallback={
					<div className="spin-wrapper">
						<div className="spinner"></div>
					</div>
				}
			>
				<Await resolve={searchedFilms}>
					{(resolvedSearchedFilms) => (
						<div className="films">		
							<CreatePagination />							
							<div className="film-cards">							
								<CreateFilmCards 
									key={"uid___" + reset_content} 
									rootData={resolvedSearchedFilms}
								/>
								<SetTotalPages rootData={resolvedSearchedFilms} />														
							</div>
							<CreatePagination />												
						</div>

						
					)}
				</Await>
			</Suspense>
		</div>     
   );
}

export { CreateContent, createContentLoader };
