import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";

const fetchMenus = async () => {
  const { data } = await api.get("/private/api/v1/menus");
  return data;
};

export function useMenus() {
  return useQuery({
    queryKey: ["menus"],
    queryFn: fetchMenus,
    staleTime: Infinity,
    enabled: true,
  });
}
