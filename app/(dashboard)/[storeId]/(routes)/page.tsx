import getGraphRevenue from "@/actions/getGraphRevenue";
import getTotalProducts from "@/actions/getTotalProducts";
import getTotalRevenue from "@/actions/getTotalRevenue";
import getTotalSales from "@/actions/getTotalSales";
import Overview from "@/components/Overview";
import Heading from "@/components/ui/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";

import {
  CreditCardIcon,
  GlobeIcon,
  IndianRupeeIcon,
  PackageIcon,
} from "lucide-react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const totalSales = await getTotalSales(params.storeId);
  const totalProducts = await getTotalProducts(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your Store" />
        <Separator />

        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <IndianRupeeIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Products in stock
              </CardTitle>
              <PackageIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Overview</CardTitle>
              <GlobeIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
