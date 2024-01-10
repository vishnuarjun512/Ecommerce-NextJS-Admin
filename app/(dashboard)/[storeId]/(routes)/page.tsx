import Store from "@/models/store.model";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await Store.findOne({ _id: params.storeId });
  return (
    <div>
      <h1>This is a Dashboard</h1>
      <p>Active Store : {store?.storeName}</p>
    </div>
  );
};

export default DashboardPage;
