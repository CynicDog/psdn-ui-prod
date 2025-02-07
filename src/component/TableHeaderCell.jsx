const TableHeaderCell = ({ children, className = "", colSpan, width }) => {
    return (
        <th
            className={className}
            colSpan={colSpan}
            style={{width: width}}>
            {children}
        </th>
    );
};

export default TableHeaderCell;
