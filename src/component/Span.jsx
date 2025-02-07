const Span = ({ 
    children = '', 
    fontSize = '', 
    fontWeight = '', 
    badge = '',
    badgeColor = '',
    className = ''
}) => {
    const classes = [
        className,
        fontSize ? `fs-${fontSize}` : '',
        fontWeight ? `fw-${fontWeight}` : '',
        badge ? 'badge' : '',
        badge && badgeColor ? `badge-${badgeColor}` : '',
    ].filter(Boolean).join(' ');

    return (
        <span className={classes}>
            {children}
        </span>
    );
};

export default Span;
