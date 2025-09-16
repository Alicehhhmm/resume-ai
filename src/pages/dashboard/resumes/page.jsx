import { useState } from 'react'
import { LayoutGrid, LayoutList, Plus, FileDown, Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import GridView from './layout/gird'
import ListView from './layout/list'
import ReusmeCreateDialog from './dialog/created'
import ResumeDeleteDialog from './dialog/delete'
import { useTransformLang, useDialog } from '@/hooks/client'

export default function DashboardPage() {
    // hooks

    const { t } = useTransformLang()
    const { onOpen } = useDialog()

    // states

    const [layout, setLayout] = useState('grid') // grid | list

    return (
        <div className='h-screen flex-1 flex flex-col overflow-y-auto'>
            <header className='px-4 md:px-8 lg:px-12 pt-8 pb-4 space-y-3'>
                <h1 className='text-2xl md:text-3xl font-semibold tracking-tight text-foreground'>{t('myResume')}</h1>
                <p className='text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl'>
                    {t('Start creating your AI-powered resume for your next job role.')}
                </p>
            </header>

            <Tabs defaultValue={layout} onValueChange={setLayout}>
                <div className='sticky top-0 z-10 bg-background/95 px-4 md:px-8 lg:px-12 py-3'>
                    <div className='flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between'>
                        <div className='flex items-center gap-2'>
                            <Button className='bg-brand-gradient' onClick={() => onOpen('create:new:resume')}>
                                <Plus className='size-3.5' />
                                <span className='hidden sm:inline'>{t('createNewResume')}</span>
                            </Button>
                            <Button variant='outline'>
                                <FileDown className='size-3.5' />
                                <span className='hidden sm:inline'>{t('importResume')}</span>
                            </Button>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Button size='sm' variant='ghost' className='h-9'>
                                <Filter className='size-3.5' />
                                <span className='sr-only sm:not-sr-only sm:inline'>{t('filter')}</span>
                            </Button>
                            <TabsList>
                                <TabsTrigger value='grid' className='size-8 p-0 sm:h-8 sm:w-auto sm:px-4'>
                                    <LayoutGrid className='size-3.5' />
                                    <span className='hidden sm:inline text-xs'>{t('grid')}</span>
                                </TabsTrigger>
                                <TabsTrigger value='list' className='size-8 p-0 sm:h-8 sm:w-auto sm:px-4'>
                                    <LayoutList className='size-3.5' />
                                    <span className='hidden sm:inline text-xs'>{t('list')}</span>
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>
                </div>

                <div className='px-4 md:px-8 lg:px-12 py-6'>
                    <TabsContent value='grid'>
                        <GridView />
                    </TabsContent>
                    <TabsContent value='list'>
                        <ListView />
                    </TabsContent>
                </div>
            </Tabs>

            {/* dialogs */}
            <ReusmeCreateDialog />
            <ResumeDeleteDialog />
        </div>
    )
}
