import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './scss/app.scss';
import {Header} from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from 'react-router-dom';
import Cart from "./pages/Cart";

export type ContextValue = {
    searchValue: string
    setSearchValue: (value: string) => void
}

export const SearchContext = React.createContext<ContextValue>({} as ContextValue)

function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <div className="wrapper">
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path='*' element={<NotFound/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                </Routes>
            </div>
        </SearchContext.Provider>

    );
}

export default App;
