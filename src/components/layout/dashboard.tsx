"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user-context";
import { User } from "@/types/user";
import { SkeletonDashboard } from "@/components/layout/skeleton-dahboard";

export default function Dashboard() {
  const { user } = useUser();

  const { user: userDetail, accounts, loading, error } = useDashboard(user?.id);
  console.log(accounts);
  // console.log("user detail", userDetail);
  
  
  if (loading) return <DashboardSkeleton />;
  if (error) return <DashboardError />;

  // const user = data?.data?.user;

  return (
    <section className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 xl:grid-cols-4 lg:px-6">
      <UserCard user={userDetail}/>
      {/* Tambahkan komponen data lainnya di sini */}
    </section>
  );
}

function UserCard({ user }: { user?: User | null }) {
  return (
    <Card className="@container/card shadow-xs bg-gradient-to-t from-primary/5 to-card dark:bg-card">
      <CardHeader className="relative">
        <CardDescription>{user?.username}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {user?.fullName}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            {/* Optional role/status badge */}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">Welcome</div>
        <div className="text-muted-foreground">{user?.email}</div>
      </CardFooter>
    </Card>
  );
}

function DashboardSkeleton() {
  return <SkeletonDashboard />;
}

function DashboardError() {
  return <p className="text-red-500">Failed to load dashboard data.</p>;
}
