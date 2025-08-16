import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";

const fetchCurrentUser = async () => {
  const { data } = await api.get("/private/api/v1/auth/me");
  return data.data;
};

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    enabled: true,
    retry: 1,
  });
}