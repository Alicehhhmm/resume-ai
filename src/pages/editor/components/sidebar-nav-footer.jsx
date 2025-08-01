import { SidebarFooter, SidebarTrigger } from '@/components/ui/sidebar'

function SidebarNavFooter() {
    return (
        <SidebarFooter className='border-t'>
            <div className='flex flex-row items-center justify-end '>
                <SidebarTrigger className='hover:bg-accent rounded' />
            </div>
        </SidebarFooter>
    )
}

export default SidebarNavFooter
