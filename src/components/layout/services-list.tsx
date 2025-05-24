import { useServices } from "@/hooks/use-service";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { cn } from "@/lib/utils"
import { ServicesProps } from "@/types/service";
import GoogleIcon from "../ui/google-icon"
import YahooIcon from "../ui/yahoo-icon";

interface ServiceListProps {
    items: ServicesProps[];
}

export function ServicesList({ items }: ServiceListProps) {
const [services, setServices] = useServices()

useEffect(() => {
    if (items.length > 0 && !services.selected) {
        setServices({ ...services, selected: items[0].service });
    }
    }, [items, services, setServices]);

    return (
        <ScrollArea className="max-h-[calc(100vh-200px)] overflow-auto">
            <div className="flex flex-col gap-2 p-4 pt-0">
            {items.map((item) => (
                <button
                key={item.service}
                className={cn(
                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                    services.selected === item.service && "bg-muted"
                )}
                onClick={() =>
                    setServices({
                        ...services,
                        selected: item.service,
                    })
                    }
                >
                <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        {/* Cek berdasarkan service name */}
                        {item.service === "GOOGLE" && <GoogleIcon />}
                        {item.service === "YAHOO" && <YahooIcon />}
                        <div className="font-semibold"> {item.service_name}</div>
                    </div>
                    <div
                        className={cn(
                        "ml-auto text-xs",
                        services.selected === item.service
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                    >
                    </div>
                    </div>
                    {/* <div className="text-xs font-medium">{account.host}</div> */}
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                    {/* {account.notes} */}
                </div>
                </button>
            ))}
            </div>
        </ScrollArea>
    )
}