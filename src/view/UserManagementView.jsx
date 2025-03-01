import { useAuth } from "../context/Auth";
import Button from "../component/Button";
import { greetAsApplication } from "../data/APIs";
import { useState } from "react";
import Span from "../component/Span";
import Area from "../component/Area";

const UserManagementView = () => {
    const { auth } = useAuth();
    const [successMessage, setSuccessMessage] = useState(null);

    const handleGreetAsApplication = async () => {
        try {
            const message = await greetAsApplication(auth);
            setSuccessMessage(message);
        } catch (error) {
            setSuccessMessage(error.message);
        }
    };

    return (
        <>
            <Button size="sm" variant="light" onClick={handleGreetAsApplication}>
                greet as application
            </Button>
            {successMessage && (
                <Area>
                    <Span badge="light">{successMessage}</Span>
                </Area>
            )}
        </>
    );
};

export default UserManagementView;
