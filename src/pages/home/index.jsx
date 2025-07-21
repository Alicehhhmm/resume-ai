import React from 'react'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/clerk-react'

function HomePage() {
    return (
        <div>
            HomePage
            <div className='flex min-h-svh flex-col items-center justify-center'>
                <Button variant='default'>Click me</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default HomePage
