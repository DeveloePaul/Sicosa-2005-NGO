const Programs = () => {
  return (
    <div className='min-h-screen bg-base-200 py-10 px-4'>
      <h1 className='text-4xl font-bold text-center mb-10'>
        Programs and Initiatives
      </h1>
      <div className='space-y-6'>
        <div className='bg-white shadow-xl rounded-lg p-6'>
          <h2 className='text-2xl font-semibold mb-4'>Scholarship Program</h2>
          <p className='mb-4'>We offer scholarships to deserving students...</p>
          <button className='btn btn-primary'>Apply Now</button>
        </div>
        <div className='bg-white shadow-xl rounded-lg p-6'>
          <h2 className='text-2xl font-semibold mb-4'>Mentorship Initiative</h2>
          <p className='mb-4'>
            Our mentorship program connects students with professionals...
          </p>
          <button className='btn btn-primary'>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Programs;
