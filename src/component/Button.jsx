const Button = ({
                    children,
                    onClick,
                    variant = "primary",
                    size = "",
                    outline = false,
                    block = false,
                    disabled = false,
                    className = "",
                }) => {
    const classes = [
        "btn",
        outline ? `btn-outline-${variant}` : `btn-${variant}`,
        size ? `btn-${size}` : "",
        block ? "w-100" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={classes} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
