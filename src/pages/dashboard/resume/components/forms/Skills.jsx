'use client'

import React, { useEffect, memo, useState, useCallback } from 'react'
import { Plus, Trash2, LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

import { useResumeEdit, useTransformLang } from '@/hooks'
import { UpdateResumeDetail } from '@/api/apis/resume'

function Skills() {
    // hooks
    const params = useParams()
    const { t } = useTransformLang()
    const { resumeInfo, setResumeInfo } = useResumeEdit()

    // States
    const [loading, setLoading] = useState(false)
    const [skillsList, setSkillsList] = useState([{ name: '', rating: 0 }])

    // Method

    useEffect(() => {
        if (resumeInfo?.skills?.length > 0) {
            setSkillsList(resumeInfo.skills)
        }
    }, [resumeInfo?.skills])

    useEffect(() => {
        // 延迟同步到全局，减少频率
        const timer = setTimeout(() => {
            setResumeInfo(prev => ({ ...prev, skills: skillsList }))
        }, 300)
        return () => clearTimeout(timer)
    }, [skillsList, setResumeInfo])

    const addNewSkill = () => {
        setSkillsList(prev => [...prev, { name: '', rating: 0 }])
    }

    const removeSkill = useCallback((index, e) => {
        e.preventDefault()
        setSkillsList(prev => prev.filter((_, i) => i !== index))
    }, [])

    // 修改技能名称
    const handleChangeName = useCallback((index, value) => {
        setSkillsList(prev => prev.map((item, i) => (i === index ? { ...item, name: value } : item)))
    }, [])

    // 提交评分（最终值）
    const handleCommitRating = useCallback((index, value) => {
        setSkillsList(prev => prev.map((item, i) => (i === index ? { ...item, rating: value } : item)))
    }, [])

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const upDateResumeId = params?.resumeId
            const updateData = {
                skills: skillsList.filter(skill => skill.name.trim() !== ''),
            }

            const res = await UpdateResumeDetail(upDateResumeId, updateData)
            if (res) toast.success('Saved successfully')
        } catch (error) {
            toast.error(error?.message || 'Save error')
            console.error('Submit error', error)
        } finally {
            setLoading(false)
        }
    }

    if (!resumeInfo) return null

    return (
        <form onSubmit={onSubmit} className='space-y-4'>
            {skillsList.map((item, index) => (
                <SkillItem
                    key={index}
                    index={index}
                    item={item}
                    t={t}
                    onChangeName={handleChangeName}
                    onCommitRating={handleCommitRating}
                    onRemove={removeSkill}
                    disableRemove={skillsList.length <= 1}
                />
            ))}

            <div className='flex justify-between '>
                <Button type='button' variant='outline' onClick={addNewSkill} className='text-primary'>
                    {t('addSkill')}
                    <Plus size={16} />
                </Button>

                <Button type='submit' disabled={loading}>
                    {loading ? <LoaderCircle className='animate-spin' /> : t('save')}
                </Button>
            </div>
        </form>
    )
}

const SkillItem = memo(({ index, item, t, onChangeName, onCommitRating, onRemove, disableRemove }) => {
    const [localRating, setLocalRating] = useState(item.rating)

    return (
        <div className='p-3 border rounded-md space-y-3'>
            <div className='flex items-start gap-2'>
                <div className='flex-1 space-y-2'>
                    <Label htmlFor={`skill-${index}`}>{t('skillName')}</Label>
                    <Input id={`skill-${index}`} value={item.name} onChange={e => onChangeName(index, e.target.value)} />
                </div>
                <Button
                    variant='ghost'
                    size='sm'
                    onClick={e => onRemove(index, e)}
                    className='h-8 w-8 p-0 mt-7'
                    disabled={disableRemove}
                    type='button'
                >
                    <Trash2 size={16} />
                </Button>
            </div>

            <div className='space-y-2'>
                <div className='flex justify-between'>
                    <Label>{t('rating')}</Label>
                    <span className='text-sm text-muted-foreground'>{localRating}%</span>
                </div>
                <Slider
                    value={[localRating]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={([val]) => setLocalRating(val)}
                    onValueCommit={([val]) => onCommitRating(index, val)}
                />
            </div>
        </div>
    )
})

export default Skills
