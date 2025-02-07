const Table = ({ children, className = "" }) => {
    return <table className={`table ${className}`.trim()}>{children}</table>;
};

export default Table;
