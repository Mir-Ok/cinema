// import { store } from "../../store/store";   // доступ к стору
// import { useSelector } from "react-redux";   // селекторы
// const genres = useSelector((state) => state.genres);

/* типы экшенов */
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
// export const SET_LOG_STATUS = "SET_LOG_STATUS"

/* статусы пользователя */
export const UserStatus = {
   LOGGED: "LOGGED",
   UN_LOGGED: "UN_LOGGED",
};

/* генераторы экшенов */
export function logIn(token) {
   return {
      type: LOG_IN,
      token,
   };
}

export function logOut() {
   return {
      type: LOG_OUT,
   };
}

export const SET_PAGE = 'SET_PAGE'

export function setPage(page) {
	return {
		type: SET_PAGE,
		page
	}
}

export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES'

export function setTotalPages(totalPages) {
	return {
		type: SET_TOTAL_PAGES,
		totalPages
	}
}

export const SET_SEARCH = 'SET_SEARCH'

export function setSearch(query) {
   return {
      type: SET_SEARCH,
		query
   };
}

export const SET_SORT_BY = 'SET_SORT_BY'

export function setSortBy(sortBy) {
	return {
		type: SET_SORT_BY,
		sortBy
	}
}

export const SET_YEARS = 'SET_YEARS'

export function setYears(years) {
	return {
		type: SET_YEARS,
		years
	}
}

export const SAVE_GENRES = 'SAVE_GENRES'

export function saveGenres(genres) {
	return {
		type: SAVE_GENRES,
		genres
	}
}

export const SET_SELECTED_GENRES = 'SET_SELECTED_GENRES'

export function saveSelectedGenres(selectedGenres) {
	return {
		type: SET_SELECTED_GENRES,
		selectedGenres
	}
}

export const SAVE_FAVORITES = 'SAVE_FAVORITES'

export function saveFavorites(favorites) {
	return {
		type: SAVE_FAVORITES,
		favorites
	}
}

export const RESET_SIDEBAR = 'RESET_SIDEBAR'

export function resetSidebar() {
   return {
      type: RESET_SIDEBAR,
   };
}

export const RESET_CONTENT = 'RESET_CONTENT'

export function resetContent() {
   return {
      type: RESET_CONTENT,
   };
}

// В Redux отправка экшена через:          store.dispatch(logIn(token))
// Либо через связанный генератор экшена:  const boundLogin = (token) => store.dispatch(logIn(token)) и вызов boundLogin(token)

