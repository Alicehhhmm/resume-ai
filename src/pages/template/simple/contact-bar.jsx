import { Phone, Mail, MapPin, Linkedin } from 'lucide-react'

function ContactBar({ contact }) {
    const { phone, email, address, linkedin } = contact

    return (
        <div className='bg-accent border-t border-b border-border py-3 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm px-4'>
            <div className='flex items-center gap-2'>
                <Phone size={14} className='text-primary' />
                <span>{phone}</span>
            </div>
            <div className='flex items-center gap-2'>
                <Mail size={14} className='text-primary' />
                <span>{email}</span>
            </div>
            <div className='flex items-center gap-2'>
                <MapPin size={14} className='text-primary' />
                <span>{address}</span>
            </div>
            <div className='flex items-center gap-2'>
                <Linkedin size={14} className='text-primary' />
                <span>{linkedin}</span>
            </div>
        </div>
    )
}

export default ContactBar
