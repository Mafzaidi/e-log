// import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
// import getQueryClient from "@/lib/get-query-client";
// import { fetchDashboard } from "@/hooks/use-dashboard";
import Dashboard from "../../components/layout/dashboard";

export default async function DashboardPage() {
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["dashboard"],
  //   queryFn: fetchDashboard,
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    // </HydrationBoundary>
  );
}