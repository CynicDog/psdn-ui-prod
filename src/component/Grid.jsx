// Grid Row Component
const Row = ({ children, className = "" }) => {
    return <div className={`row ${className}`.trim()}>{children}</div>;
};

// Grid Column Component
const Col = ({ children, width, responsive = "", className = "" }) => {
    const colClass = `col${responsive ? `-${responsive}` : ""}-${width}`.trim();
    return <div className={`${colClass} ${className}`}>{children}</div>;
};

export { Row, Col };