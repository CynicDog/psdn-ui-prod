const TableRow = ({
                      children,
                      onClick,
                      selected = false,
                      cursor = "pointer",
                      verticalAlign = "",
                      className = "",
                      style = {},
                  }) => {
    const classes = [
        selected ? "table-active" : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <tr
            className={classes}
            onClick={onClick}
            style={{
                cursor: cursor,
                verticalAlign: verticalAlign
            }}>
            {children}
        </tr>
    );
};

export default TableRow;
