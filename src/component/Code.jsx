const Code = ({
                  children,
                  onClick,
                  bgColor = "secondary-subtle",
                  textColor = "secondary-emphasis"
              }) => {
    const classes = [
        `bg-${bgColor}`,
        `text-${textColor}`
    ].filter(Boolean).join(" ");

    return (
        <code
            className={classes}
            onClick={onClick}
            style={{
                color: "inherit",
                padding: "2px 5px",
                margin: "0px 2px",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "0.9em"
            }}>
            {children}
        </code>
    );
};

export default Code;
