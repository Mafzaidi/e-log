import { ServicesProps } from "@/types/service";
import { useState } from "react";
import { AccountProps, AccountWithPasswordProps } from "@/types/account";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ConfirmPassword from "./confirm-password";
import api from "@/lib/axiosInstance";
// import useAccountWithPswd from "@/hooks/use-account-with-pswd";

interface AccountListProps {
  item: ServicesProps | null;
}


export function AccountList({ item }: AccountListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountProps | null>(null)
  const [decryptedAccounts, setDecryptedAccounts] = useState<{ [id: string]: string }>({});;

  const handleViewPassword = (account: AccountProps) => {
    setSelectedAccount(account)
    setDialogOpen(true);
  };

  const handleDecryptedAccount = (decrypted: AccountWithPasswordProps) => {
    setDecryptedAccounts((prev) => ({
      ...prev,
      [decrypted.id]: decrypted.account_password,
    }));
  };

  return (
    <ScrollArea className="max-h-[calc(100vh)] overflow-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {item?.accounts?.map((account) => (
          <Card className="col-span-3" key={account.id}>
            <CardHeader>
              <CardTitle>{item.service_name}</CardTitle>
              <CardDescription>{account.host}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center justify-between space-x-2">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {account.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      password: {decryptedAccounts[account.id] ?? "********"}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      onClick={() => handleViewPassword(account)}
                    >
                      <Eye /> View
                    </Button>

                    <Button variant="secondary">
                      <Pencil />
                    </Button>
                    <Button variant="destructive">
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <ConfirmPassword<AccountProps, AccountWithPasswordProps>
          selectedData={selectedAccount}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onSuccess={handleDecryptedAccount}
          onSubmit={async ({ data, password }) => {
            const res = await api.post("/private/api/view-account", {
              account_id: data.id,
              password_application: password,
            });
            return res.data.data as AccountWithPasswordProps;
          }}
        />
      </div>
    </ScrollArea>
  );
}
