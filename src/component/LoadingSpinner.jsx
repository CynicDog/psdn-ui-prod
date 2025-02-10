const LoadingSpinner = ({ message }) => {

    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">{message}</span>
        </div>
    )
}
export default LoadingSpinner