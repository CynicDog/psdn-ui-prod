import Area from "../../component/Area";
import Span from "../../component/Span";

const UsersArea = ({ users }) => {

    return (
        <Area>
            {users?.value.length > 0 && (
                <Area>
                    {users.value.map((user, index) => (
                        <Span key={index} badge="light" m="1">
                            {user.displayName}
                        </Span>
                    ))}
                </Area>
            )}
        </Area>
    )
}

export default UsersArea