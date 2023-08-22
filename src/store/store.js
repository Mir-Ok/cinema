import { createStore } from "redux";
import { filmsReducer } from "./reducers";

// создаем стор, подаем редьюсер, прокидываем через провайдер
const store = createStore(filmsReducer);

export { store };
