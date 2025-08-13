import React from 'react'
import { MeshSection } from './mesh-section'
import { PageSection } from './page-section'

function PropertiesPanel() {
    return (
        <div data-label='editor_properties_panel' className=''>
            <MeshSection />
            <PageSection />
        </div>
    )
}

export default PropertiesPanel
