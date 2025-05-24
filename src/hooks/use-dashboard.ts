
// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/axiosInstance";

// export const fetchDashboard = async () => {
//   const { data } = await api.get("/private/api/dashboard");
//   return data;
// };

// export function useDashboard() {
//   return useQuery({
//     queryKey: ["dashboard"],
//     queryFn: fetchDashboard,
//   });
// }

import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance"; // axios instance

type UserData = {
  id: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  group: string;
};

type AccountData = {
  id: string;
  accountName: string;
  // sesuaikan dengan response API
};

export const useDashboard = (userId?: string) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [accounts, setAccounts] = useState<AccountData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [userRes, accountsRes] = await Promise.all([
          api.get(`/private/api/v1/users/${userId}`),
          api.get(`/private/api/v1/accounts`)
        ]);

        setUser(userRes.data);
        setAccounts(accountsRes.data);
        
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDashboardData();
    }
  }, [userId]);
  
  console.log("user", user);
  return { user, accounts, loading, error };
};
