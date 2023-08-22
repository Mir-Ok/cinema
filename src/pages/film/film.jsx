// ГОТОВО

import "./film.css";
import { Suspense } from "react";
import { useLoaderData, useNavigate, defer, Await } from "react-router-dom"; // указывает место отображения потомков
import { IMAGE_BASE_URL } from "../../scripts/constants";
import ArrowCircleLeft from '@mui/icons-material/ArrowCircleLeft';
import Typography from "@mui/material/Typography";
import { Favorite, createOptionsGet } from "../../scripts/elements";
import { MOVIE_URL } from "../../scripts/constants";

async function getOneFilm( {params} ) {

	try {

		const filmDetails = {}
		const options = createOptionsGet()		

		const details = await fetch(`${MOVIE_URL}/movie/${params.film_uid}?language=en-US`, options)
		if (details.status !== 200) { console.log(`Ошибка АПИ details, код ${details.status} `) }
		filmDetails['details'] = await details.json();

		const credits = await fetch(`${MOVIE_URL}/movie/${params.film_uid}/credits?language=en-US`, options)
		if (credits.status !== 200) { console.log(`Ошибка АПИ credits, код ${credits.status} `) }
		filmDetails['credits'] = await credits.json()	
		
		filmDetails['uid'] = params.uid

		// все возвращенное доступно через хук useLoaderData() в элементе, к которму привязан доадер
		return filmDetails

	}
	catch(err) {
		console.error(err)
	}
}

// так как проброс из роутера, лоадеру доступно два параметра
const filmLoader = async ( {params} ) => {

	return defer({ // дает возможность ожидать подгрузки данных
		film: getOneFilm( {params} )
	})
}

function Film() {	
   
	console.log('OneFilm')
	
	const { film } = useLoaderData() 
	
	const navigate = useNavigate();

	return ( 
		
		<Suspense fallback={
			<div className="spin-wrapper">
				<div className="spinner"></div>
			</div>
		}>
			<Await resolve={film}>
				{
					(resolvedFilm) => (
						<div id="contact" className="oneFilm">
							<div>
								<img
									key={IMAGE_BASE_URL + resolvedFilm.details.backdrop_path}
									alt={resolvedFilm.details.original_title}
									src={IMAGE_BASE_URL + resolvedFilm.details.backdrop_path || null}
								/>            
							</div>
							
							<button type="button" className='simbols' onClick={() => { navigate(-1); }}>
								<ArrowCircleLeft />
							</button>
					
							<Typography variant="h4" gutterBottom >
								<div>{resolvedFilm.details.original_title}</div>
								<Favorite uid={resolvedFilm.details.id} />
							</Typography>
							
							<Typography variant="body2" gutterBottom>
								{resolvedFilm.details.overview}
							</Typography>
						</div>
					)
				}	
			</Await>
		</Suspense>
	)
}

export { Film, filmLoader }