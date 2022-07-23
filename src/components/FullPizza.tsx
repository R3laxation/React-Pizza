import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {ItemsType} from '../bll/slises/pizza/types';


export const FullPizza = () => {
    const [pizza, setPizza] = useState<ItemsType>({} as ItemsType)
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://62ce8097486b6ce826465b70.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (err) {
                const error = err as AxiosError
                alert('Произошла ошибка!')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <div>Загрузка...</div>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="pizza"/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
            <Link to={'/'}>
                <button className="button button--outline button--add">
                    <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                    />
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};

