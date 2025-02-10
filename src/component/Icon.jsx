const Icon = ({ name, onClick }) => {

    return (
        <i className={`bi bi-${name}`} onClick={onClick} style={{cursor: "pointer"}}></i>
    )
}

export default Icon;