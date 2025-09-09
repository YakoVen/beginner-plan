import OrderTable from "@/components/dashboard/order-table";


export async function getServerSideProps() {
  return { props: {} };
}

async function DashboardPage() {



    return (

        <div className="min-h-screen ">
            <div className="">
                <OrderTable />
            </div>

        </div>
    );
}

export default DashboardPage;