const TableRow = ({ children, className = "", onClick, style = {} }) => {
    return (
        <tr className={className} onClick={onClick} style={style}>
            {children}
        </tr>
    );
};

export default TableRow;
