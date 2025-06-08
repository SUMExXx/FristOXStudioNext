import PremiumCheckoutMainPocketsFlow from '@/components/PremiumCheckoutMainPocketsFlow';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const PremiumWrapper = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    if(!token) {
        redirect('/');
    }

  return <PremiumCheckoutMainPocketsFlow token={token} />;
};

export default PremiumWrapper;