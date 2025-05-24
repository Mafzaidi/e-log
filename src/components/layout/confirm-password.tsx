import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ConfirmPasswordProps<TData = unknown, TResult = unknown> {
  selectedData: TData | null;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onSuccess: (result: TResult) => void;
  onSubmit: (payload: { data: TData; password: string }) => Promise<TResult>;
}

export default function ConfirmPassword<TData, TResult>({
  selectedData,
  dialogOpen,
  setDialogOpen,
  onSuccess,
  onSubmit
}: ConfirmPasswordProps<TData, TResult>) {
  const [appPassword, setAppPassword] = useState("");
  const [error, setError] = useState("");
  

  const handleConfirmPassword = async () => {
    if (!selectedData) return;
    try {
      const result  = await onSubmit({
        data: selectedData,
        password: appPassword,
      });

      onSuccess(result); 
      setDialogOpen(false);
      setAppPassword("");
      setError("");
      toast.success("Password confirmed successfully!");
    } catch (error) {
      console.error('Submission error', error)
      setError("Password is incorrect");
      toast.error('Failed to submit the form. Please try again.')
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Password</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <PasswordInput
            id="password"
            placeholder="********"
            autoComplete="current-password"
            value={appPassword}
            onChange={(e) => setAppPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmPassword}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
