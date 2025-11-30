import { FieldRenderer } from './section-form-field'

export function FieldRendererGroup({ schema, item, index, onInput, t, itemkey }) {
    return (
        <div id='field-group' className='grid grid-cols-2 gap-3'>
            {schema.map(field => (
                <FieldRenderer
                    t={t}
                    field={field}
                    fieldKey={itemkey}
                    value={item[field.name]}
                    onChange={e => onInput(e, index)}
                    key={`item-${index}-${field.name}`}
                />
            ))}
        </div>
    )
}
