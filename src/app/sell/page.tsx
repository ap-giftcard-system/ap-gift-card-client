import SellForm from '@/components/SellForm';

const SellPage = () => {
  return (
    <section className='flex flex-col gap-3 mt-9 mb-16 sm:mb-24 sm:gap-9 sm:mt-16'>
      {/* header */}
      <h1 className='head_text orange_gradient text-center'>Sell Form</h1>

      {/* sell form */}
      <SellForm />
    </section>
  );
};

export default SellPage;
