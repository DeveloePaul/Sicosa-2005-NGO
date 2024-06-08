
const ContactUs = () => {
  return (
    <div className="min-h-screen bg-base-200 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input type="text" className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block">Email:</label>
          <input type="email" className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block">Message:</label>
          <textarea className="textarea textarea-bordered w-full"></textarea>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
