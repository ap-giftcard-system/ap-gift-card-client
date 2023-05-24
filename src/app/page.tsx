import Image from 'next/image';

export default function Home() {
  return (
    <section className='w-full h-[95vh] flex justify-center items-center'>
      <h1 className='head_text text-center'>
        <span className='orange_gradient text-center'> AP Nail Art </span>
        <br className='max-md:hidden' />
        <p className='text-2xl sm:text-3xl'>Gift Card System</p>
      </h1>
    </section>
  );
}
