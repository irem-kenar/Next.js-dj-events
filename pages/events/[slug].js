import { useRouter } from 'next/router';
import React from 'react';

export default function EventPage() {
    const router = useRouter();

    console.log(router)
    return (
        <div>
            <h1>This is my dynamic events page</h1>
            <h3>{router.query.slug}</h3>
            <button onClick={() => router.push('/')}>Click</button>
        </div>
    )
}
