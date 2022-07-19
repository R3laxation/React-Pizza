import React, {useEffect, useRef, useState} from 'react';
import {Categories} from "../components/Categories";
import {Sort, sortList} from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import {PizzaBlock} from "../components/pizzaBlock/PizzaBlock";
import {Pagination} from "../components/pagination/Pagination";
import {SearchContext} from "../App";
import {useSelector} from "react-redux";
import {FilterStateType, setCategoryId, setCurrentPage, setFilters, SortType} from "../bll/slises/filterSlice";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../bll/store";
import qs from 'qs';
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from '../bll/slises/pizzaSlice';


export type ParamsType = {
    currentPage: string, categoryId: string, sortProperty: string, sort: SortType
}

export type HomePropsType = {}

const Home = ({}: HomePropsType) => {

    const {
        categoryId,
        sort,
        currentPage
    } = useSelector<AppRootStateType, FilterStateType>(state => state.filter)
    const items = useAppSelector(state => state.pizza.items)
    const status = useAppSelector<'entity' | 'loading' | 'success' | 'error'>(state => state.pizza.status)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {searchValue} = React.useContext(SearchContext)

    const onClickCategory = (categoryId: number) => {
        dispatch(setCategoryId({categoryId}))
    }
    const onChangePage = (currentPage: number) => {
        dispatch(setCurrentPage({currentPage}))
    }

    const getPizzas = async () => {

        const category = categoryId > 0 && `category=${categoryId}`
        const search = searchValue && `search=${searchValue}`
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';


        dispatch(fetchPizzas({
            category, search, sortBy, order, currentPage
        }))
    }

    // Если был первый рендер, проверяем URL-параметры и сохраняем в Redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            if (sort) {
                dispatch(setFilters({...params, sort} as ParamsType))
            }
            isSearch.current = true

        }
    }, [])
    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    // Если изменили параметры и был первый рендер
    useEffect(() => {

        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId, currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index}/>)
    const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item}/>);

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={(id: number) => onClickCategory(id)}/>
                    <Sort/>
                </div>

                <h2 className="content__title">Все пиццы</h2>
                {
                    status === 'error'
                        ? <div className={'content__error-info'}><h2>Произошла ошибка! <span>😕</span></h2><p>
                            К сожалению, нам не удалось получить пиццы. <br/>
                            Попробуйте повторить попытку позже, либо закажите у наших конкурентов.
                        </p></div>
                        : <div className="content__items">{status !== 'success' ? skeletons : pizzas}</div>
                }
                <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
            </div>
        </div>
    );
};

export default Home;