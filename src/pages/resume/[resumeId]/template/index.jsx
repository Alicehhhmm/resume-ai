import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { templateMap } from '@/pages/template/view/index'
import { FilterCarousel, TemplateGrid } from '@/pages/resume/components/template-list'
import { useGlobalResume } from '@/hooks'

const categories = [
    { value: 'all', label: 'All' },
    { value: 'simple', label: 'Simple' },
    { value: 'canon', label: 'Canon' },
    { value: 'creativity', label: 'Creativity' },
    { value: 'specialty', label: 'Specialty' },
]

function TemplatePage() {
    // hooks

    const [searchParams, setSearchParams] = useSearchParams()
    const { setSelectTemplate } = useGlobalResume()

    // States

    const [loading, setLoading] = useState(false)
    const [categoryId, setCategoryId] = useState('all')
    const [selectedId, setSelectedId] = useState()
    const [templatesByCategory, setTemplatesByCategory] = useState({})

    // Method

    // Memoized template list conversion
    const templateList = useMemo(() => {
        if (!templateMap || Object.keys(templateMap).length === 0) return []

        return Object.entries(templateMap).map(([key, item]) => ({
            id: key,
            ...item,
        }))
    }, [templateMap])

    // Mock backend Api
    const getTemplateList = useCallback(async () => {
        if (loading) return

        setLoading(true)

        try {
            // Simulate API call - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 500))

            // Group templates by category
            const categorizedTemplates = templateList.reduce((acc, template) => {
                const category = template.category || 'simple'
                if (!acc[category]) {
                    acc[category] = []
                }
                acc[category].push(template)
                return acc
            }, {})

            setTemplatesByCategory(categorizedTemplates)
        } catch (error) {
            console.error('Failed to load templates:', error)
            setTemplatesByCategory({})
        } finally {
            setLoading(false)
        }
    }, [templateList, loading])

    // Handle category selection
    const handleCategorySelect = useCallback(
        value => {
            const newCategory = value || 'all'
            setCategoryId(newCategory)

            const nextParams = new URLSearchParams(searchParams)
            if (newCategory === 'all') nextParams.delete('category')
            nextParams.set('category', newCategory)

            setSearchParams(nextParams)
        },
        [searchParams, setSearchParams]
    )

    // Handle template selection
    const handleTemplateSelect = useCallback(
        row => {
            if (!row) return

            setSelectedId(row.id)
            setSelectTemplate({
                category: row.category,
                title: row.title,
            })
        },
        [setSelectTemplate]
    )

    useEffect(() => {
        getTemplateList()
    }, [categoryId])

    return (
        <div className='h-full flex flex-col gap-4'>
            <header className='px-4 pt-4 space-y-1'>
                <h1 className='text-xl font-semibold'>Recommended Template</h1>
                <p className='text-sm text-muted-foreground'>Choose a resume template that suits you and start creating it.</p>
            </header>

            <nav className='px-0 flex justify-center items-center'>
                <FilterCarousel value={categoryId} onSelect={handleCategorySelect} data={categories} />
            </nav>

            <main className='flex-1 border-t'>
                <TemplateGrid
                    category={categoryId}
                    selectedId={selectedId}
                    onSelect={handleTemplateSelect}
                    templates={templatesByCategory}
                    isLoading={loading}
                />
            </main>
        </div>
    )
}

export default TemplatePage
