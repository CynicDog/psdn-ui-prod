import React from 'react';
import {useTranslation} from "../context/Translation";
import Area from "../component/Area";
import Span from "../component/Span";

const PaginationControl = ({ currentPage, totalPages, rowsPerPage, setRowsPerPage, handlePageChange }) => {

    const { t } = useTranslation();
    const totalRows =  totalPages * rowsPerPage;

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    className={`btn btn-sm ${currentPage === 1 ? 'btn-secondary' : 'btn-light'}`}
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pageNumbers.push(<span key="start-ellipsis" className="fw-lighter">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`btn btn-sm ${i === currentPage ? 'btn-secondary' : 'btn-light'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<span key="end-ellipsis" className="fw-lighter">...</span>);
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    className={`btn btn-sm ${currentPage === totalPages ? 'btn-secondary' : 'btn-light'}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <Area flex justifyContent="start" alignItems="center">
            <Span me="3">
                {t('components.rows_per_page')}:
            </Span>
            <select
                id="rowsPerPage"
                className="form-select form-select-sm"
                style={{width: 'auto'}}
                value={rowsPerPage}
                onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    handlePageChange(1);
                }}
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={300}>300</option>
                <option value={totalRows}>{t('components.select_option_all')}</option>
            </select>
            <button
                className="btn btn-sm btn-light mx-3"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {t('components.pagination_button_previous')}
            </button>
            <div className="d-flex gap-2">{renderPageNumbers()}</div>
            <button
                className="btn btn-sm btn-light ms-3"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {t('components.pagination_button_next')}
            </button>
        </Area>
    );
};

export default PaginationControl;
