const LoadingSpinner = ({ message }) => {

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
        }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">{message}</span>
            </div>
        </div>
    )
}
export default LoadingSpinner