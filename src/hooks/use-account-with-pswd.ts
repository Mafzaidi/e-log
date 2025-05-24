import api from "@/lib/axiosInstance";

interface AccountPayload {
    accountID: string | "";
    appPassword : string | "";
}

const useAccountWithPswd = ({
    accountID,
    appPassword
}: AccountPayload) => {

    const fetchAccount = async () => {
        try {
            const response = await api.post(
              "/private/api/view-account",
              { account_id: accountID, password_application: appPassword } 
            );
            return response
        } catch (error) {
            console.log("failed to fetch:", error);
        }
    };

    return fetchAccount
};

export default useAccountWithPswd;