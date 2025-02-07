const TableHeader = ({ children, className = "" }) => {
    return (
        <thead
            className={className}>
            {children}
        </thead>
    )
};

export default TableHeader;
