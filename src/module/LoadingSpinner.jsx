import Area from "../component/Area";
import Span from "../component/Span";

const LoadingSpinner = ({ message }) => {

    return (
        <Area flex justifyContent="center" m="3">
            <Area className="spinner-border" role="status">
                <Span className="visually-hidden">{message}</Span>
            </Area>
        </Area>
    )
}
export default LoadingSpinner