# Prompt

```md
帮我封装一个 **通用文件上传组件**。

要求：基于 https://upload-react-component.vercel.app/ 结合本项目 现有的组件封装 一个通用的文件上传组件
（小而可组合、样式基于 Tailwind v4、内部使用 shadcn/ui 组件）。

要求：

1. 使用 JSX（不要 TS）
2. 使用 Tailwind v4 样式类
3. 内部使用 shadcn/ui 组件
4. 带详细注释(采用 JSDoc 形式)
5. 保证组件可运行、可复用
6. 确保代码简洁、易读、高效
```

## 📂 目录结构

@/components/common/uploadx/
├── test
├── index.jsx
├── uploadx.jsx (一个文件，包含所有组件，类似 shadcn/ui 的组件模式)
├── doc.md
├── req.md (组件封装需求描述文档)

## ⚙️ 技术栈

-   React (JSX)
-   Tailwind CSS v4
-   shadcn/ui 基础组件
-   rc-upload (底层上传逻辑)
-   lucide-react (icon 图标)

## ✨ 功能需求

### 文件选择

-   点击按钮选择文件
-   拖拽上传
-   支持单文件 / 多文件

### 文件列表展示

-   图片：缩略图
-   其他文件：图标 + 文件名
-   状态：
    -   上传中 → Progress
    -   成功 → ✅
    -   失败 → ❌
-   操作：
    -   删除
    -   重新上传
    -   预览 / 下载

### 文件校验

-   支持 `accept` 限制文件类型（默认 jpg/png/webp/pdf/docx）
-   支持 `maxSize`（默认 5MB）
-   超出限制提示错误

### 上传状态

-   `idle | uploading | success | error`
-   上传进度条
-   成功显示 `CheckCircle2`
-   失败显示 `AlertCircle`

---

## 🎨 设计规范

-   遵循 **shadcn/ui 哲学** → 小而可组合
-   样式：基于 Tailwind v4，支持 `className` 覆盖
-   文件列表：UploadList + ListItem
-   拖拽区域：虚线边框，悬停高亮
-   状态图标：lucide-react
-   内部复用 **Button、Progress、Avatar** 等 shadcn/ui 组件
-   现代 UI，响应式，支持暗黑模式
-   ***

## 必须遵循的 shadcn/ui 组件规范

-   内容区域：UploadContent
-   预览区域：UploadPreview
-   按钮风格：UploadTextButton、UploadPricteButton,UploadDraggerZone
-   上传组件：UploadComponent
-   拖拽区域：UploadDragger
-   上传按钮：UploadButton
-   文件列表：UploadList + ListItem
-   上下文：UploadProvider + useUpload
-   组件导出：`export { Uploadx, UploadComponent, UploadButton, UploadListItem, UploadList, UploadProvider, useUpload }`

具体参考 @/components/common/uploadx.jsx 当前预设的组件模板

## 注释要求

-   所有组件都必须有详细的注释，采用 JSDoc 形式
-   注释应包括参数、返回值、异常等信息
-   注释应简洁、易读，避免使用复杂的术语

-   局域注释使用 /\*_ ... _/ 格式 如下例子：

```
/** -------------------------
 *  internal constants
 * ------------------------- */
```

---

## 📦 输出要求

请输出以下文件的完整 JSX 代码：完整的单个文件

-   uploadx.jsx
-   index.jsx (导出所有组件)
-   doc.md (组件使用文档和 api 说明)
-   test/demo.jsx (测试组件)
