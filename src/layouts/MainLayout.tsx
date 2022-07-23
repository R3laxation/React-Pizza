import React from 'react';
import { Outlet } from 'react-router-dom';
import {Header} from "../components/Header";

// type MainLayoutPropsType = {
//     children: React.ReactNode
// }


export const MainLayout = () => {
    return (
        <div className='wrapper'>
            <Header/>
            <div className={'content'}>
                <Outlet/>
            </div>
        </div>
    );
};

