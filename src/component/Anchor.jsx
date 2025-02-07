const Anchor = ({ label, onClick }) => {

    return (
        <a
            className="link-primary link-underline-opacity-0"
            style={{cursor: "pointer"}}
            onClick={onClick}>
            {label}
        </a>
    )
}

export default Anchor