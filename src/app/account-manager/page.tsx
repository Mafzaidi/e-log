"use client"
import api from "@/lib/axiosInstance";
import { useState, useEffect  } from "react";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ServicesProps } from "@/types/service";
import { ServicesList } from "@/components/layout/services-list";
import { AccountList } from "@/components/layout/account-list";
import { useServices } from "@/hooks/use-service";

export default function AccountManagerPage() {
  const [accounts, setAccounts] = useState<ServicesProps[]>([]);
  const [services] = useServices()
  const fetchAccounts = async () => {
    try {
      const { data } = await api.get("/private/api/accounts");
      setAccounts(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch menus", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);
  
  return (
    <div className="flex h-screen lg:grid lg:grid-cols-2">
      <div className="flex flex-col flex-1 lg:border-r lg:border-l ">
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Accounts</h1>
        </div>
        <Separator />
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
        <ServicesList items={accounts}/>
      </div>
      {/* <Separator /> */}
      <div className="flex flex-col">
        <AccountList item={accounts.find((item) => item.service === services.selected) || null} />
      </div>
    </div>
            
    
  );
}
  