import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";

type DashboardData = {
  user: {
    id: string;
    username: string;
    fullName: string;
    email: string;
  };
  accounts: { id: string; accountName: string }[];
};

export function useDashboard(userId?: string) {
  return useQuery<DashboardData>({
    queryKey: ["dashboard", userId],
    queryFn: async () => {
      const [userRes, accountsRes] = await Promise.all([
        api.get(`/private/api/v1/users/${userId}`),
        api.get(`/private/api/v1/accounts/${userId}?is_active=true`),
      ]);
      console.log(accountsRes);
      
      return {
        user: userRes.data,
        accounts: accountsRes.data,
      };
    },
    enabled: !!userId,
  });
}

