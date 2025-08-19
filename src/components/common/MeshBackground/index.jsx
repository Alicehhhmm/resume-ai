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
            sm: 'mesh-size-small', // 10px
            md: 'mesh-size-medium', // 20px
            lg: 'mesh-size-large', // 30px
            xl: 'mesh-size-xlarge', // 40px
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

export const MeshBackground = ({ scale = 0.6, unit = 50, model, size, opacity = 0.4, colors, className, style }) => {
    return (
        <div
            name='mesh-background-box'
            className={cn(meshVariants({ model, size, colors }), className)}
            style={{
                '--grid-size': `${unit * scale}px`,
                opacity,
                ...style,
            }}
        />
    )
}

export default MeshBackground
