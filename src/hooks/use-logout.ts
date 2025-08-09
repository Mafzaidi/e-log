import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

const useLogout = () => {
    const router = useRouter();

    const logout = async () => {
        try {
            await api.post("/api/v1/auth/logout");
            router.push("/login")
        } catch (error) {
            console.log("failed to logout:", error);
            
        }
    };

    return logout
};

export default useLogout;