# Uploadx Component Documentation

## Overview
Uploadx is a versatile file upload component that follows shadcn/ui design principles, based on `rc-upload`, with functionality similar to Ant Design's Upload component. It provides drag-and-drop functionality, file validation, and comprehensive file management features.

## Installation
First, make sure you have the required dependencies installed:

```bash
npm install rc-upload lucide-react
```

## Import
```javascript
import { Uploadx, UploadComponent, UploadButton, UploadList, UploadListItem, UploadDragger, UploadProvider, useUpload } from '@/components/common/uploadx';
```

## Basic Usage

### Simple Upload
```jsx
import { Uploadx } from '@/components/common/uploadx';

const MyComponent = () => {
  const handleUploadSuccess = (response, file) => {
    console.log('Upload successful', response, file);
  };

  const handleUploadError = (error, file) => {
    console.error('Upload failed', error, file);
  };

  return (
    <Uploadx
      action="/api/upload"
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    />
  );
};
```

### Upload with Custom UI
```jsx
import { Uploadx, UploadButton } from '@/components/common/uploadx';

const MyComponent = () => {
  return (
    <Uploadx
      action="/api/upload"
      listType="picture"
    >
      <UploadButton>Click to Upload</UploadButton>
    </Uploadx>
  );
};
```

## API Reference

### Uploadx
Main component that combines all functionality.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| action | string | required | Upload endpoint URL |
| multiple | boolean | false | Whether to allow multiple file selection |
| accept | string | "image/*,.pdf,.doc,.docx,.xls,.xlsx" | Accepted file types |
| maxSize | number | 5242880 | Maximum file size in bytes (default 5MB) |
| onChange | function | | Callback when file list changes |
| onSuccess | function | | Callback when upload succeeds |
| onError | function | | Callback when upload fails |
| onRemove | function | | Callback when file is removed |
| beforeUpload | function | | Validation hook (optional) |
| className | string | | Additional class names |
| disabled | boolean | false | Disable the upload |
| children | ReactNode | | Custom content to render instead of default UI |
| listType | 'text' \| 'picture' \| 'picture-card' | 'text' | List display style |
| showUploadList | boolean | true | Show file list |

### UploadComponent
Wrapper component handling core upload logic.

#### Props
Same as Uploadx props.

### UploadButton
Upload button with various styles.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| variant | 'default' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'default' | Button variant |
| iconOnly | boolean | false | Show only icon without text |
| All Uploadx props | | | Inherits all Uploadx props |

### UploadDragger
Drag and drop zone component.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | | Child components |
| disabled | boolean | false | Disable drag functionality |
| className | string | | Additional class names |

### UploadList
List container for uploaded files.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fileList | Array | | Array of file objects |
| onRemove | function | | Callback to remove file |
| onRetry | function | | Callback to retry upload |
| onDownload | function | | Callback to download file |
| listType | 'text' \| 'picture' \| 'picture-card' | 'text' | List display style |
| className | string | | Additional class names |

### UploadListItem
Individual file item in the upload list.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| file | Object | required | File object |
| onRemove | function | | Callback to remove file |
| onRetry | function | | Callback to retry upload |
| onDownload | function | | Callback to download file |
| listType | 'text' \| 'picture' \| 'picture-card' | 'text' | List display style |
| className | string | | Additional class names |

## Styling
The component supports Tailwind v4 classes for customization. You can use the `className` prop to add custom styles:

```jsx
<Uploadx 
  className="max-w-md mx-auto" 
  action="/api/upload"
/>
```

## Theming
The component automatically supports dark mode and follows the project's theme configuration.

## Examples

### Picture List Type
```jsx
<Uploadx
  action="/api/upload"
  listType="picture"
  accept="image/*"
  maxSize={2 * 1024 * 1024} // 2MB
>
  <UploadButton variant="outline">Upload Images</UploadButton>
</Uploadx>
```

### Picture Card List Type
```jsx
<Uploadx
  action="/api/upload"
  listType="picture-card"
  multiple
>
  <div className="text-center">
    <p>Upload Images</p>
  </div>
</Uploadx>
```

### Custom Validation
```jsx
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    alert('You can only upload JPG/PNG file!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    alert('Image must smaller than 2MB!');
    return false;
  }
  return true;
};

<Uploadx
  action="/api/upload"
  beforeUpload={beforeUpload}
>
  <UploadButton>Upload Image</UploadButton>
</Uploadx>
```

### Disabled Upload
```jsx
<Uploadx
  action="/api/upload"
  disabled
>
  <UploadButton disabled>Upload (Disabled)</UploadButton>
</Uploadx>
```

## Hooks

### useUpload
Custom hook to access upload context (useful when using UploadProvider).

```jsx
const MyComponent = () => {
  const uploadContext = useUpload();
  // Use uploadContext to manage upload state
  return <div>...</div>;
};
```

## Context Provider
```jsx
<UploadProvider value={uploadState}>
  <UploadComponent>
    {/* Children components */}
  </UploadComponent>
</UploadProvider>
```

## File Statuses
- `idle`: File selected, waiting to upload
- `uploading`: File currently uploading with progress bar
- `success`: Upload completed successfully
- `error`: Upload failed