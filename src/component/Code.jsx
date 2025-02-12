const Code = ({ children }) => {
    return (
        <code
            className="bg-secondary-subtle text-secondary-emphasis"
            style={{
            color: "#444",
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
