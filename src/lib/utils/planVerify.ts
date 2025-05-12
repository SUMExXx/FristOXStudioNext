export default async function planVerify(token: string): Promise<boolean> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verify-plan`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
        // Force server-side fetch
        cache: 'no-store',
    });

    if (!res.ok) {
        return false; // or return notFound()
    }

    const data = await res.json();
    const isValid = data?.plan === 'premium' || data?.plan === 'enterprise';

    if (!isValid) {
        return false; // or return notFound()
    }

    return true;
  }