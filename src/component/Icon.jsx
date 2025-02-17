const Icon = ({
                  name,
                  variant = '',
                  onClick
}) => {

    const classes = [
        variant ? `text-${variant}` : '',
    ].filter(Boolean).join(' ');

    return (
        <i className={`bi bi-${name} ${classes}`} onClick={onClick} style={{cursor: "pointer"}}></i>
    )
}

export default Icon;