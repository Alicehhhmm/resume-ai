import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

import './mesh-background.css'

// Useing editor right panel
export const MeshType = {
    LINES: 'lines',
    DOTS: 'dots',
}

export const MeshColors = {
    GRAY: 'gray',
    BLUE: 'blue',
    GREEN: 'green',
}

const meshVariants = cva('absolute inset-0 pointer-events-none z-0 bg-mesh', {
    variants: {
        model: {
            [MeshType.LINES]: 'lines',
            [MeshType.DOTS]: 'dots',
        },
        size: {
            sm: 'mesh-size-small',
            md: 'mesh-size-medium',
            lg: 'mesh-size-large',
            xl: 'mesh-size-xlarge',
        },
        colors: {
            [MeshColors.GRAY]: 'mesh-color-gray',
            [MeshColors.BLUE]: 'mesh-color-blue',
            [MeshColors.GREEN]: 'mesh-color-green',
        },
    },
    defaultVariants: {
        model: MeshType.LINES,
        size: 'md',
        colors: MeshColors.GRAY,
    },
})

export const MeshBackground = ({ model, size, opacity = 0.4, colors, className, style }) => {
    return <div name='mesh-background-box' className={cn(meshVariants({ model, size, colors }), className)} style={{ opacity, ...style }} />
}

export default MeshBackground
