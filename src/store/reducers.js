// import { useDispatch } from "react-redux";  // подключение диспетчера стора
// const dispatch = useDispatch();  // инициализация диспетчера в компоненте
// dispatch(logOut())  // вызов диспетчера

import { SORT_TYPES } from "../scripts/constants";
import { 
	UserStatus, 
	LOG_IN, 
	LOG_OUT, 
	SET_PAGE,
	SET_TOTAL_PAGES,
	SET_SEARCH,
	SET_SORT_BY,
	SET_YEARS,
	SAVE_GENRES,
	SET_SELECTED_GENRES,
	SAVE_FAVORITES,
	RESET_SIDEBAR,
	RESET_CONTENT,
} from "./actions";

// import { IMDB_token } from "../constants";

const initialGenres = [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
]

const initialState = {
	// авторизация	
	auth_status: localStorage.getItem('userToken') ? UserStatus.LOGGED : UserStatus.UN_LOGGED,
	page: 1,
	totalPages: 1,
	search: "all",
	sortBy: SORT_TYPES.popular.option, 
	years: [1995, 2010],
	genres: JSON.parse(localStorage.getItem('genres_store')) ?? initialGenres,
	selectedGenres: [],
	favorites: JSON.parse(localStorage.getItem('favorites_store')) ?? [],	
	reset_filters: 0,
	reset_content: 0, 
}

function filmsReducer(state = initialState, action) {
   
   switch (action.type) {

      case LOG_IN:
			localStorage.setItem('token_store', action.token)
         return Object.assign(
            {},
            state,
            { auth_status: UserStatus.LOGGED },
         );

      case LOG_OUT:
			localStorage.removeItem('token_store')
			localStorage.removeItem('user_store')
			return Object.assign(
            {},
            state,
            { auth_status: UserStatus.UN_LOGGED }
         );
		
		case SET_PAGE:
			return Object.assign(
				{},
				state,
				{ page: action.page }
			);

		case SET_TOTAL_PAGES:
			return Object.assign(
				{},
				state,
				{ totalPages: action.totalPages }
			);
		
		case SET_SEARCH:
			return Object.assign(
				{},
				state,
				{ search: action.query }
			);

		case SET_SORT_BY:
			return Object.assign(
				{},
				state,
				{ sortBy: action.sortBy }
			);

		case SET_YEARS:
			return Object.assign(
				{},
				state,
				{ years: action.years }
			);

		case SAVE_GENRES:
			localStorage.setItem('genres_store', JSON.stringify(action.genres))
			return Object.assign(
            {},
            state,
            { genres: action.genres }
         );

		case SET_SELECTED_GENRES:
			return Object.assign(
				{},
				state,
				{ selectedGenres: action.selectedGenres }
			);

		case SAVE_FAVORITES:
			localStorage.setItem('favorites_store', JSON.stringify(action.favorites))
			return Object.assign(
				{},
				state,
				{ favorites: action.favorites }
			);
		
		case RESET_SIDEBAR: 
			return Object.assign(
				{},
				state,
				{ reset_filters: state.reset_filters +=1 }
			);
		
		case RESET_CONTENT: 
			return Object.assign(
				{},
				state,
				{ reset_content: state.reset_content +=1 }
		);
		
      default:
         return state;
   }
}

export { filmsReducer, initialState };
