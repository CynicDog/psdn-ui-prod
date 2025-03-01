import {useAuth} from "../context/Auth";
import Button from "../component/Button";
import {greetAsApplication} from "../data/APIs";
import {useMsal} from "@azure/msal-react";

const UserManagementView = () => {

    const { instance } = useMsal();

    const { auth } = useAuth()

    return (
        <>
            <Button
                size="sm"
                variant="primary"
                onClick={() => {
                    greetAsApplication(auth, instance)
            }}>
                greet as admin
            </Button>

        </>
    )
}

export default UserManagementView;