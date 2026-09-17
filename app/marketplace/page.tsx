import MarketplaceClient from "@/components/MarketplaceClient";

export default async function Marketplace({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="page">
      <div className="container">
        <div className="page-head">
          <span className="section-kicker">
            MARKETPLACE
          </span>

          <h1>Browse products</h1>

          <p>
            Search, filter and open any product to see its details.
          </p>
        </div>

        <MarketplaceClient
          initialCategory={params.category || "All"}
        />
      </div>
    </main>
  );
}
