import LoginForm from '@/components/LoginForm';

export default function Home() {
  return (
    <section className='w-full h-[100vh] flex flex-col pt-20 gap-9 sm:pt-32 sm:gap-16 items-center'>
      <h1 className='head_text text-center'>
        <span className='orange_gradient text-center'> AP Nail Art </span>
        <br className='max-md:hidden' />
        <p className='text-2xl sm:text-3xl'>Gift Card System</p>
      </h1>

      {/* Login Form */}
      <LoginForm />
    </section>
  );
}
