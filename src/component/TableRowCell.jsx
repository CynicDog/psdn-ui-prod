const TableRowCell = ({ children, className = "", colSpan }) => {
    return (
        <td
            className={className}
            colSpan={colSpan}>
            {children}
        </td>
    );
};

export default TableRowCell;
