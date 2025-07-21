import { ClerkProvider } from '@clerk/clerk-react'

import React from 'react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
}

function JWTClerkProvider({ children }) {
    return <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>
}

export default JWTClerkProvider
