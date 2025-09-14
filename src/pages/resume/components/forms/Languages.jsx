'use client'

import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Accordion } from '@/components/ui/accordion'

import { RichTextEditor, CollapsiblePanel } from '@/components/common'

import { useResumeEdit, useTransformLang } from '@/hooks'

import { UpdateResumeDetail } from '@/services/resume'

const uuid = uuidv4()

const initialFormField = {
    id: uuid,
    name: '',
    link: '',
    startDate: '',
    endDate: '',
    position: '',
    description: '',
    summary: '',
}

function Languages() {
    return (
        <>
            <h2>Languages</h2>
        </>
    )
}

export default Languages
