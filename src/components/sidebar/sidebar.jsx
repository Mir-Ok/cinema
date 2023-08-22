// ГОТОВОВ

import './sidebar.css';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";   
import { 
	resetSidebar, 
	resetContent, 
	setPage, 
	setSearch,
	setTotalPages,
	setSortBy,
	setYears, 
	saveSelectedGenres,
} from '../../store/actions';
import { createOptionsGet } from '../../scripts/elements';
import { initialState } from '../../store/reducers';
import { SORT_TYPES, MOVIE_URL } from '../../scripts/constants.js';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Slider, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function CreateGenres() {	

	const dispatch = useDispatch();  // инициализация диспетчера в компоненте
	const genres = useSelector((state) => state.genres);
	const selectedGenres = useSelector((state) => state.selectedGenres)
   
	function handlerAutocomplete(newValue) {
		console.log(newValue)
		dispatch(saveSelectedGenres(newValue))		
	}

   return (
		<>
		   <Autocomplete
				options={genres}
				id='checkboxes-tags-demo'
				onChange={ (event, newValue) => handlerAutocomplete(newValue) }
				isOptionEqualToValue={(option, value) => option.id === value.id}         
				multiple // многовариантность
				value={selectedGenres}
				defaultValue={selectedGenres}
				// disableCloseOnSelect  // скрывать опции после клика
				getOptionLabel={(option) => option.name}
				renderInput={(params) => (<TextField {...params} label='Жанры' placeholder='' /> )}
			/>
		</>
   );
}

function CreatePagination() {

	const dispatch = useDispatch();  
	const page = useSelector((state) => state.page);
	const totalPages = useSelector((state) => state.totalPages);
	const maxPages = totalPages < 51 ? totalPages : 50

	function handlePageChange(page) {	
		dispatch(setPage(page)) 
		dispatch(resetContent())  
	}

   return (
      <Stack spacing={1}>
         <Pagination
				page={page}
				shape="rounded"
				count={maxPages}
            color='primary'
            onChange={ (event, newValue) => handlePageChange(newValue) }
         />
      </Stack>
   );
}

function CreateSidebarHeader() {

	const dispatch = useDispatch();  

	function handleClearFilter() {
		dispatch(resetSidebar())  
		dispatch(resetContent())
		dispatch(setSearch(initialState.search)) 
		dispatch(setSortBy(initialState.sortBy)) 
		dispatch(setYears(initialState.years)) 
		dispatch(saveSelectedGenres(initialState.selectedGenres)) 
		dispatch(setPage(initialState.page)) 
	}

   return (
      <div className='filter__header'>
         <header>Фильтры </header>
         <ClearIcon
            onClick={handleClearFilter}
         />
      </div>
   );
}

function CreateSortSelect() {

	const dispatch = useDispatch(); 
	const sortBy = useSelector((state) => state.sortBy);

   return (
      <Box sx={{ minWidth: 370 }}>
         <FormControl fullWidth>
            <InputLabel id='sort-select-label'>Сортировать по</InputLabel>
            <Select
               labelId='sort-select-label'
               id='sort-select'
					value={sortBy}
               label='Сортировать по'
               onChange={ (event) => {
						dispatch(setSortBy(event.target.value))  
						dispatch(resetContent())  						
					} }
            >
               <MenuItem
                  value={SORT_TYPES.popular.option}
                  name={SORT_TYPES.popular.option}
               >
                  {SORT_TYPES.popular.name}
               </MenuItem>
               <MenuItem
                  value={SORT_TYPES.top_rated.option}
                  name={SORT_TYPES.top_rated.option}
               >
                  {SORT_TYPES.top_rated.name}
               </MenuItem>
            </Select>
         </FormControl>
      </Box>
   );
}

function CreateYearSelect() {

	const dispatch = useDispatch();
	const years = useSelector((state) => state.years);

   return (
      <Box>
         <Slider
            getAriaLabel={() => 'Years range'}
            value={years}
            onChange={(event, newValue) => { dispatch(setYears(newValue)) }}
            valueLabelDisplay='auto'
            max={new Date().getFullYear()}
            min={1987}
         />
      </Box>
   );
}

async function searchAPI(text) {

	try {
		const options = createOptionsGet()	
		const search = await fetch(
			`${MOVIE_URL}/search/movie?query=${text}&include_adult=false&language=en-US&page=1`, 
			options
		)
		if (search.status !== 200) { 
			console.log(`Ошибка АПИ films, код ${search.status} `) 
		}
		return await search.json()		
	} catch(err) {
		console.error(err)
	}
}

function CreateSearch() {

	const dispatch = useDispatch();  

	const [value, setValue] = useState('')
	const search = useSelector((state) => state.search);
	const inputValue = search === 'all' ? value : search

	function handlerSearchChange(event) {

		setValue(event.target.value)	
		
		let searchValue = event.target.value  // замена при пустом поиске
		if (searchValue < 1) {
			searchValue = initialState.search		
		}      

		dispatch(setSearch(searchValue)) 		
		searchAPI(event.target.value)
			.then( searchResult => { setTotalPages(searchResult.total_pages) })	
	}

	return (
		<TextField 
			id="outlined-basic" 
			label="Введите название ... " 
			variant="outlined"
			sx={{ marginBottom: '15px'	}} 
			value={inputValue}
			onChange={ (event) => handlerSearchChange(event) }
		/>
	)
}

function CreateSideBar() {
   
	const filter_uid = useSelector((state) => state.reset_filters);

	return (
      <Paper
         elevation={5}
         className='filter__container'
         key={filter_uid}
         sx={{ maxWidth: 370 }}
      >
         <CreateSidebarHeader />
			<CreateSearch />
         <CreateSortSelect />
         <CreateYearSelect />
         <CreateGenres />
      </Paper>
   );
}

export { CreateSideBar, CreatePagination };
