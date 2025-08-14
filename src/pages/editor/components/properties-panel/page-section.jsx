import { StickyNote, Columns2, Eye, EyeOff } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { cn } from '@/lib/utils'
import { DropdownSelect } from '@/components/common/dropdown-select'
import { ToolButton, PropertyInput, CollapsibleRow, CollapsibleRowContentGroup, CollapsibleRowContentLabel } from '@/components/common'

import { useEditor } from '@/pages/editor/components'
import { useTransformLang } from '@/hooks'

// 布局类型枚举
const pageLayoutType = {
    SINGLE: 'single',
    MULTI: 'multi',
}

// 常见纸张尺寸
const paperSizesOptions = [
    { label: 'A4 (210 × 297mm)', value: { width: 794, height: 1123 } },
    { label: 'A3 (297 × 420mm)', value: { width: 1123, height: 1587 } },
    { label: 'Letter (8.5 × 11in)', value: { width: 816, height: 1056 } },
    { label: 'Legal (8.5 × 14in)', value: { width: 816, height: 1344 } },
    { label: 'Tabloid (11 × 17in)', value: { width: 1056, height: 1632 } },
]

export const PageSection = () => {
    const { t } = useTransformLang()
    const { pageMode, setPageMode } = useEditor()

    const isDisabled = pageMode.pageCount <= 1

    // 切换布局类型
    const handleTypeChange = type => {
        if (type) setPageMode(prev => ({ ...prev, layout: type }))
    }

    // 显示/隐藏页码
    const handleShowPageNumber = () => {
        setPageMode(prev => ({ ...prev, showPageNumber: !prev.showPageNumber }))
    }

    // 显示/隐藏分页符
    const handlePageBreak = () => {
        setPageMode(prev => ({
            ...prev,
            pageBreak: { ...prev.pageBreak, show: !prev.pageBreak.show },
        }))
    }

    // 调整页面间距
    const handleGapChange = val => {
        const num = parseInt(val, 10)
        if (!isNaN(num)) {
            setPageMode(prev => ({ ...prev, pageGap: num }))
        }
    }

    // 修改纸张尺寸
    const handlePageSize = (val, item) => {
        const { height, width } = val

        if (val) {
            setPageMode(prev => ({
                ...prev,
                pageSize: {
                    height,
                    width,
                },
            }))
        }
    }

    // 更新 position 属性
    const handlePositionChange = (key, val) => {
        const num = parseFloat(val)
        if (!isNaN(num)) {
            setPageMode(prev => ({
                ...prev,
                position: {
                    ...prev.position,
                    [key]: num,
                },
            }))
        }
    }

    const toggleGroupItemStyles =
        'h-7 text-[11px] font-medium tracking-wide border transition-all duration-100 ' +
        'data-[state=on]:bg-primary/10 data-[state=on]:text-primary ' +
        'hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed'

    return (
        <CollapsibleRow open title={t('pageMode')}>
            {/* 画布位置 (Position) */}
            <CollapsibleRowContentGroup>
                <CollapsibleRowContentLabel label={t('position')} />
                <div className='grid grid-cols-2 gap-2'>
                    <PropertyInput
                        name='posX'
                        label='X'
                        value={pageMode.position.x}
                        onChange={val => handlePositionChange('x', Number(val))}
                        unit='px'
                        onLabelClick={() => {}}
                    />
                    <PropertyInput
                        name='posY'
                        label='Y'
                        value={pageMode.position.y}
                        onChange={val => handlePositionChange('y', Number(val))}
                        unit='px'
                        onLabelClick={() => {}}
                    />
                    <PropertyInput
                        name='posScale'
                        label='S'
                        value={pageMode.position.scale}
                        placeholder='Scale'
                        onChange={val => handlePositionChange('scale', Number(val))}
                        unit='%'
                        onLabelClick={() => {}}
                    />
                </div>
            </CollapsibleRowContentGroup>

            {/* 布局类型 */}
            <CollapsibleRowContentGroup>
                <CollapsibleRowContentLabel label={t('layout')} />
                <ToggleGroup
                    type='single'
                    variant='outline'
                    value={pageMode.layout}
                    onValueChange={handleTypeChange}
                    className='grid grid-cols-2 gap-1'
                    disabled={isDisabled}
                >
                    <ToggleGroupItem value={pageLayoutType.SINGLE} className={cn(toggleGroupItemStyles)}>
                        <StickyNote className='size-3.5' />
                        <span>{t('single')}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value={pageLayoutType.MULTI} className={cn(toggleGroupItemStyles)}>
                        <Columns2 className='size-3.5' />
                        <span>{t('multi')}</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </CollapsibleRowContentGroup>

            {/* 显示页码 & 分页符*/}
            <CollapsibleRowContentGroup>
                <div className='grid grid-cols-2 gap-2'>
                    <CollapsibleRowContentLabel
                        label={t('pageNumber')}
                        rightAsChild={
                            <ToolButton
                                disabled={isDisabled}
                                tooltip={pageMode.showPageNumber ? t('visible') : t('hidden')}
                                onClick={handleShowPageNumber}
                            >
                                {pageMode.showPageNumber ? <Eye /> : <EyeOff />}
                            </ToolButton>
                        }
                    />
                    <CollapsibleRowContentLabel
                        label={t('pageBreak')}
                        rightAsChild={
                            <ToolButton
                                disabled={isDisabled}
                                tooltip={pageMode.pageBreak.show ? t('visible') : t('hidden')}
                                onClick={handlePageBreak}
                            >
                                {pageMode.pageBreak.show ? <Eye /> : <EyeOff />}
                            </ToolButton>
                        }
                    />
                </div>
            </CollapsibleRowContentGroup>

            {/* 间距 & 页数 & 纸张尺寸 */}
            <CollapsibleRowContentGroup>
                <div className='grid grid-cols-2 gap-2'>
                    <CollapsibleRowContentLabel
                        label={t('gap')}
                        rightAsChild={
                            <PropertyInput
                                name='pageGap'
                                type='number'
                                step='5'
                                min='0'
                                max='60'
                                value={pageMode.pageGap}
                                onChange={val => handleGapChange(val)}
                                className='w-full'
                            />
                        }
                        className='gap-1'
                    />
                    <CollapsibleRowContentLabel
                        label={t('count')}
                        rightAsChild={<PropertyInput name='pageCount' disabled value={pageMode.pageCount} />}
                        className='gap-1'
                    />

                    <CollapsibleRowContentLabel
                        label={t('size')}
                        rightAsChild={
                            <DropdownSelect
                                groupLabel='Paper Sizes'
                                options={paperSizesOptions}
                                value={pageMode.pageSize}
                                placeholder='Select paper size...'
                                onSelect={handlePageSize}
                                className='h-6'
                            />
                        }
                        className='gap-1'
                    />
                </div>
            </CollapsibleRowContentGroup>
        </CollapsibleRow>
    )
}
