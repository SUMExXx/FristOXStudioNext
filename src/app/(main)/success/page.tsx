import SuccessComp from "@/components/SuccessComp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Success = async () => {

  let isPremium = false;

  const checkPremium = async () => {

    const cookiesData = await cookies();
    
    const token = cookiesData.get('token')?.value;

    if (!token) {
      redirect('/signin');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verify-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      redirect('/signin');
    }

    const data = await response.json();
    console.log(data)

    isPremium = data.plan == 'premium';

  }

  await checkPremium();

  return (
    <SuccessComp text={isPremium? 'YOUR SUBSCRIPTION IS ACTIVATED': 'SUBSCRIPTION NOT ACTIVATED'}/>
  )
}

export default Success;
