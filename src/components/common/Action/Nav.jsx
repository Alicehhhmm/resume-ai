import { forwardRef } from 'react'

import { Action } from './Action'
import { Milestone } from 'lucide-react'

export const Nav = forwardRef((props, ref) => {
    return (
        <Action ref={ref} cursor='pointer' data-cypress='draggable-handle' {...props}>
            <Milestone className='size-3.5 opacity-60' />
        </Action>
    )
})
