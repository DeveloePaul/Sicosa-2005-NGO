
const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add testimonials here */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>"Testimonial 1"</p>
              <p className="text-right">- Person 1</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>"Testimonial 2"</p>
              <p className="text-right">- Person 2</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>"Testimonial 3"</p>
              <p className="text-right">- Person 3</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
