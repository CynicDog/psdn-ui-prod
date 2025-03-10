const TableRowCell = ({ children, className = "", colSpan, maxWidth }) => {
    return (
        <td
            className={className}
            colSpan={colSpan}
            style={maxWidth ? { maxWidth } : {}}
        >
            {children}
        </td>
    );
};

export default TableRowCell;
