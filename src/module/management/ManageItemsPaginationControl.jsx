import Area from "../../component/Area";
import Span from "../../component/Span";
import Button from "../../component/Button";
import Dropdown from "../../component/Dropdown";
import { useLanguage } from "../../context/Language";
import React from "react";

const ManageItemsPaginationControl = ({ totalItems, rowsPerPage, setRowsPerPage, currentPage, setCurrentPage }) => {
    const { t } = useLanguage();
    const totalPages = Math.ceil(totalItems / rowsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        if (startPage > 1) {
            pageNumbers.push(
                <Button key={1} variant={currentPage === 1 ? "secondary" : "light"} size="sm" onClick={() => setCurrentPage(1)}>
                    1
                </Button>
            );
            if (startPage > 2) {
                pageNumbers.push(<Span key="start-ellipsis" className="fw-lighter">...</Span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button key={i} variant={i === currentPage ? "secondary" : "light"} size="sm" onClick={() => setCurrentPage(i)}>
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<Span key="end-ellipsis" className="fw-lighter">...</Span>);
            }
            pageNumbers.push(
                <Button key={totalPages} variant={currentPage === totalPages ? "secondary" : "light"} size="sm" onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                </Button>
            );
        }

        return pageNumbers;
    };

    return (
        <Area flex justifyContent="start" alignItems="center" mx="3" px="1" py="2">
            <Span me="3">{t('components.rows_per_page')}:</Span>
            <Dropdown
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                }}
                options={[
                    { value: 10, label: "10" },
                    { value: 20, label: "20" },
                    { value: 30, label: "30" },
                    { value: 50, label: "50" },
                    { value: 100, label: "100" },
                    { value: 300, label: "300" },
                    { value: totalItems, label: t('components.select_option_all') }
                ]}
                border="1"
                width="8%"
            />
            <Button variant="light" size="sm" className="mx-3" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                {t('components.pagination_button_previous')}
            </Button>
            <Area flex gap="2">
                {renderPageNumbers()}
            </Area>
            <Button variant="light" size="sm" className="ms-3" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                {t('components.pagination_button_next')}
            </Button>
        </Area>
    );
};

export default ManageItemsPaginationControl;
