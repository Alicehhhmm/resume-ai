import React from 'react'
import { Button } from '@/components/ui/button'

function HomePage() {
    return (
        <div>
            HomePage
            <div className='flex min-h-svh flex-col items-center justify-center'>
                <Button variant='default'>Click me</Button>
                <button className={'glass-btn'}>glass btn</button>
                <ul>
                    <li>1</li>
                </ul>
            </div>
        </div>
    )
}

export default HomePage
