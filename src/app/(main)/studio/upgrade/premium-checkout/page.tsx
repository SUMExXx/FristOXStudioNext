import PremiumCheckoutMain from '@/components/PremiumCheckoutMain';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const PremiumWrapper = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    if(!token) {
        redirect('/');
    }

  return <PremiumCheckoutMain token={token} />;
};

export default PremiumWrapper;