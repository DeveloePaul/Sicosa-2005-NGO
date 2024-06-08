
const DonationPage = () => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Make a Donation</h2>
        <div className="text-center">
          <p className="mb-4">Support our cause by making a donation.</p>
          <button className="btn btn-primary mb-4">Donate Now</button>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Current Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add campaign information here */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Campaign 1</h3>
              <p>Details about Campaign 1</p>
              <button className="btn btn-primary">Donate</button>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Campaign 2</h3>
              <p>Details about Campaign 2</p>
              <button className="btn btn-primary">Donate</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationPage;
