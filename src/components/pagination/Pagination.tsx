import React from 'react';
import ReactPaginate from "react-paginate";
import s from './Pagination.module.scss'

type PaginationPropsType = {
    onChangePage: (number: number) => void
    currentPage: number
}

export const Pagination = ({onChangePage, currentPage} : PaginationPropsType) => {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={() => (null)}
        />
    );
};

