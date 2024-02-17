export default async function DashboardPage() {
  // const { data, error } = await getCurrentUser();

  // if (error || !data?.user) {
  //   redirect('/login');
  // }

  return (
    <div className='container'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='font-heading text-3xl md:text-4xl'>Posts</h1>
          <p className='text-lg text-muted-foreground'>
            Create and manage posts.
          </p>
        </div>
      </div>
    </div>
  );
}
