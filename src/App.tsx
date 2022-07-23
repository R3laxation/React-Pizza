import React, {Suspense} from 'react';

import './scss/app.scss';
import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
import {Route, Routes} from 'react-router-dom';
// import Cart from "./pages/Cart";
// import {FullPizza} from "./components/FullPizza";
import {MainLayout} from './layouts/MainLayout';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart' */'./pages/Cart'));
const FullPizza = React.lazy(() => import('./components/FullPizza').then((m) => ({default: m.FullPizza})));
const NotFound = React.lazy(() => import('./components/notFoundPage/NotFoundPage').then((m) => ({default: m.NotFoundBlock})));

function App() {

    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path='cart' element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Cart/>
                    </Suspense>}/>
                <Route path='pizza/:id' element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <FullPizza/>
                    </Suspense>}/>
                <Route path='*' element={<Suspense fallback={<div>Загрузка...</div>}>
                    <NotFound/>
                </Suspense>}/>
            </Route>
        </Routes>
    );
}

export default App;
