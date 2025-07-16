# Simple React Gallery

## Features

- Simple with no other dependencies
- Slides from thumbnail
- Keyboard navigation

## Installation

```bash
npm install @lauris/simple-react-gallery
```

<pre>```tsx
import ImageGallery from '@lauris/simple-react-gallery';

const images = [
  { id: 1, src: '/images/photo1.jpg' },
  { id: 2, src: '/images/photo2.jpg' },
  { id: 3, src: '/images/photo3.jpg' },
];

function App() {
  return <ImageGallery images={images} lazyLoading={true} keyboard={true} />;
}
 ``` </pre>

| Prop          | Type                             | Default | Description                                              |
| ------------- | -------------------------------- | ------- | -------------------------------------------------------- |
| `images`      | `{ id: number; src: string; }[]` | —       | Array of images to display                               |
| `lazyLoading` | `boolean`                        | `true`  | Enable lazy loading of whole gallery (HTML lazy loading) |
| `keyboard`    | `boolean`                        | `true`  | Enable keyboard navigation                               |
| `className`   | `string`                         | —       | Optional CSS class for custom styling                    |
