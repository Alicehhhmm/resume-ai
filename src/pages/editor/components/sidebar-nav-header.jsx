import { Logox } from '@/components/common'
import { ResumeaiLogo } from '@/components/iconx'
import { SidebarHeader, SidebarMenuButton } from '@/components/ui/sidebar'

function SidebarNavHeader() {
    return (
        <SidebarHeader className='flex items-center justify-center border-b h-14'>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                    <ResumeaiLogo className='size-9' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                    <Logox />
                </div>
            </SidebarMenuButton>
        </SidebarHeader>
    )
}

export default SidebarNavHeader
