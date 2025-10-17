# Enhanced Requirements: Universal File Upload Component

## 📋 Overview
Create a universal file upload component following shadcn/ui design principles, based on `rc-upload`, with functionality similar to Ant Design's Upload component.

## 🎯 Goals
- Create a highly customizable, reusable file upload component
- Follow shadcn/ui design philosophy: small, composable, unstyled
- Implement drag-and-drop functionality
- Support multiple file types and validation
- Provide comprehensive file management features

## 📂 Directory Structure
```
@/components/common/uploadx/
├── test/
│   └── demo.jsx          # Test component with usage examples
├── index.jsx             # Public exports
├── uploadx.jsx           # Main component file with all subcomponents
├── doc.md                # Component usage documentation and API reference
├── req.md                # This requirements document (enhanced)
```

## ⚙️ Technology Stack
- **React**: Functional components with hooks (JSX, no TypeScript)
- **Tailwind CSS v4**: Utility-first styling with dark mode support
- **shadcn/ui**: Base components (Button, Progress, Avatar, etc.)
- **rc-upload**: Underlying upload logic
- **lucide-react**: Icon library for consistent icons

## 🧱 Component Architecture

### Core Components to Implement
- `Uploadx` - Main component combining all functionality
- `UploadComponent` - Wrapper component handling core upload logic
- `UploadButton` - Upload button with various styles
- `UploadDragger` - Drag and drop zone component
- `UploadList` - List container for uploaded files
- `UploadListItem` - Individual file item in the list
- `UploadProvider` - Context provider for state management
- `useUpload` - Custom hook for upload functionality

### Component Hierarchy
```
<UploadProvider>
  <UploadComponent>
    <UploadDragger> (or UploadButton)
      <UploadList>
        <UploadListItem />
        <UploadListItem />
        ...
      </UploadList>
  </UploadComponent>
</UploadProvider>
```

## ✨ Functional Requirements

### Basic Upload Functionality
- Click button to open file browser
- Drag and drop files into designated area
- Support single file and multiple file uploads via `multiple` prop
- Progress tracking for each file
- Visual feedback during upload process

### File Validation
- File type validation via `accept` prop (default: "image/*,.pdf,.doc,.docx,.xls,.xlsx")
- File size validation via `maxSize` prop (default: 5MB)
- Custom validation via `beforeUpload` callback
- User-friendly error messages for validation failures

### File List Management
- Display files in a list with thumbnails (for images) or icons (for other files)
- Show file name, size, and upload status
- Different status indicators:
  - `idle` - File selected, waiting to upload
  - `uploading` - File currently uploading with progress bar
  - `success` - Upload completed successfully with CheckCircle2 icon
  - `error` - Upload failed with AlertCircle icon
- Actions for each file:
  - Remove/delete uploaded file
  - Retry failed uploads
  - Preview images and download files

### User Experience
- Responsive design that works on all device sizes
- Support for dark/light mode
- Keyboard accessibility
- Loading states and transitions
- File preview capability for images

## 🎨 Design & Styling Requirements

### UI/UX Principles
- Follow shadcn/ui's design philosophy (minimal, composable, accessible)
- Use Tailwind v4 utility classes for styling
- Support for className overrides for customization
- Consistent spacing and visual hierarchy
- Smooth animations and transitions

### Visual Elements
- Drag and drop zone with dashed border that highlights on hover/drag
- Progress bars using shadcn/ui Progress component
- Icons from lucide-react library
- File type-specific icons for non-image files
- Properly sized image thumbnails
- Consistent color scheme with primary, success, warning, and error states

### Dark Mode Support
- All components must support dark mode automatically
- Use Tailwind's dark: prefix for dark mode variants
- Ensure proper contrast in both light and dark modes

## 📡 API Specifications

### Main UploadComponent Props
```javascript
{
  // Basic configuration
  action: string,                    // Upload URL (required)
  multiple: boolean,                 // Allow multiple file selection (default: false)
  accept: string,                    // Accepted file types (default: "image/*,.pdf,.doc,.docx,.xls,.xlsx")
  maxSize: number,                   // Maximum file size in bytes (default: 5 * 1024 * 1024)
  
  // Callbacks
  onChange: (fileList) => {},        // Called when file list changes
  onUpload: (file) => {},            // Called when upload starts
  onSuccess: (response, file) => {}, // Called when upload succeeds
  onError: (error, file) => {},      // Called when upload fails
  onRemove: (file) => {},            // Called when file is removed
  beforeUpload: (file) => boolean | Promise, // Validation hook (optional)
  
  // UI customization
  className: string,                 // Additional class names
  disabled: boolean,                 // Disable the upload
  children: ReactNode,               // Custom content to render instead of default UI
  
  // Styling
  listType: 'text' | 'picture' | 'picture-card', // List display style (default: 'text')
  showUploadList: boolean,           // Show file list (default: true)
}
```

### UploadButton Props
```javascript
{
  size: 'sm' | 'md' | 'lg',          // Button size
  variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'link', // Button variant
  iconOnly: boolean,                 // Show only icon without text
  ...all UploadComponent props
}
```

### UploadDragger Props
```javascript
{
  disabled: boolean,                 // Disable drag functionality
  className: string,                 // Additional class names
  ...all UploadComponent props
}
```

## 🧪 Testing Requirements

### Test Scenarios
- File selection (single and multiple files)
- Drag and drop functionality
- File validation (type and size)
- Upload progress tracking
- Error handling
- File removal
- Retry failed uploads
- Success and error state visual feedback
- Component customization options

### Test Demo
Create a comprehensive demo in `test/demo.jsx` that showcases:
- Basic usage
- Different list types
- Custom validation
- Error handling
- Disabled state
- Custom styling
- All available props

## 📝 Documentation Requirements

### doc.md should include:
- Import instructions
- Basic usage examples
- API reference with all props and their types
- Usage examples for different scenarios
- Customization options
- Styling guidelines
- Common use cases and patterns
- Troubleshooting tips

## 🔧 Implementation Guidelines

### Code Quality
- Use JSDoc for all exported components and functions
- Include parameter types, descriptions, return values, and exceptions
- Write clean, well-organized code with consistent formatting
- Follow React best practices (hooks, memoization where appropriate)
- Implement proper error boundaries and error handling

### Performance
- Optimize rendering with React.memo where applicable
- Implement proper cleanup for side effects
- Handle large file lists efficiently
- Minimize unnecessary re-renders

### Accessibility
- Ensure keyboard navigation works properly
- Provide proper ARIA attributes
- Support screen readers
- Follow WCAG guidelines

## 🚫 Constraints & Limitations

### Technical Constraints
- Must use JSX (not TypeScript)
- Must use Tailwind v4 classes
- Must integrate with existing shadcn/ui components
- Must be compatible with React 18+
- File size limit validation should happen before upload
- Network upload logic should be handled by rc-upload

### Design Constraints
- Must follow shadcn/ui styling patterns
- Should be theme-able with className overrides
- Should maintain consistent design language
- Color palette should align with the project's overall theme

## 📋 Deliverables

### Required Files
1. `uploadx.jsx` - Complete implementation of all components in one file
2. `index.jsx` - Export all components with proper named exports
3. `doc.md` - Comprehensive documentation with examples
4. `test/demo.jsx` - Interactive demo showcasing all features

### Expected Exports
```javascript
export {
  Uploadx,
  UploadComponent,
  UploadButton,
  UploadListItem,
  UploadList,
  UploadDragger,
  UploadProvider,
  useUpload
}
```

## 🧾 JSDoc Comment Standards

### Component Documentation Example
```javascript
/**
 * UploadComponent - A versatile file upload component with drag-and-drop support
 * 
 * @param {Object} props - Component properties
 * @param {string} props.action - Upload endpoint URL
 * @param {boolean} [props.multiple=false] - Whether to allow multiple file selection
 * @param {string} [props.accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"] - Accepted file types
 * @param {number} [props.maxSize=5242880] - Maximum file size in bytes (default 5MB)
 * @param {Function} [props.onChange] - Callback when file list changes
 * @param {Function} [props.onSuccess] - Callback when upload succeeds
 * @param {Function} [props.onError] - Callback when upload fails
 * @param {ReactNode} [props.children] - Custom content to render
 * @returns {JSX.Element} The upload component JSX
 */
```

### Internal Constants Format
```javascript
/** -------------------------
 *  internal constants
 * ------------------------- */
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const DEFAULT_ACCEPT_TYPES = "image/*,.pdf,.doc,.docx,.xls,.xlsx";
```

## 🎯 Acceptance Criteria

- [ ] Component is fully functional and tested
- [ ] All shadcn/ui design principles followed
- [ ] Proper TypeScript-style JSDoc comments included
- [ ] All props are properly validated and handled
- [ ] Responsive design works on all screen sizes
- [ ] Dark mode support implemented
- [ ] Accessibility features implemented
- [ ] Documentation is comprehensive and clear
- [ ] Demo component showcases all features
- [ ] Code follows project conventions
- [ ] Performance is optimized
- [ ] All export requirements met