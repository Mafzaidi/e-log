import api from "@/lib/axiosInstance";
import { MenuItem } from "@/types/menu";

export async function getMenus(): Promise<MenuItem[]> {
  try {
    const res = await api.get("/private/api/v1/menus?=is_active=true")
    return res.data?.data || [];
  } catch (error) {
    console.error("SSR Menu Error:", error);
    return [];
  }
}