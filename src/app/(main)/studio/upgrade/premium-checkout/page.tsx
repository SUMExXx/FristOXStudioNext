import NavbarStudio from '@/components/NavbarStudio';
import PremiumCheckoutMainPocketsFlow from '@/components/PremiumCheckoutDodo';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const PremiumWrapper = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    if(!token) {
        redirect('/');
    }

  return (
    <>
      <NavbarStudio style={null} />
      <div className='mt-[60px] md:mt-[80px] md:min-h-[calc(100vh-80px)] h-full text-black'>
        <PremiumCheckoutMainPocketsFlow token={token} />
      </div>
    </>
  )
};

export default PremiumWrapper;