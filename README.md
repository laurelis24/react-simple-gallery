# Simple React Gallery

## 📸 Demo

![Image Gallery Demo](https://raw.githubusercontent.com/laurelis24/simple-react-gallery/refs/heads/main/screenshots/gallery.gif)

## Features

- Simple with no other dependencies
- Slides from thumbnail
- Keyboard navigation
- Swipe support (in progress...)

## Installation

```bash
npm install @laurelis/react-simple-gallery
```

## Usage

```tsx
import ImageGallery from '@laurelis/react-simple-gallery';

const images = [
  { id: 1, src: '/images/photo1.jpg' },
  { id: 2, src: '/images/photo2.jpg' },
  { id: 3, src: '/images/photo3.jpg' },
];

function App() {
  return <ImageGallery images={images} lazyLoading={true} keyboard={true} />;
}
```

| Prop          | Type                             | Default | Description                                              |
| ------------- | -------------------------------- | ------- | -------------------------------------------------------- |
| `images`      | `{ id: number; src: string; }[]` | —       | Array of images to display                               |
| `lazyLoading` | `boolean`                        | `true`  | Enable lazy loading of whole gallery (HTML lazy loading) |
| `keyboard`    | `boolean`                        | `true`  | Enable keyboard navigation                               |
| `className`   | `string`                         | —       | Optional CSS class for custom styling                    |

### Development & Contribution

- Contributions and feedback are welcome! Feel free to join development!
- Possible updates/bug fixes from time to time

### License

MIT © [laurelis24](https://github.com/laurelis24)
