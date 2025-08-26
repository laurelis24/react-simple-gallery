# React Simple Gallery

## 📸 Demo

![Image Gallery Demo](https://raw.githubusercontent.com/laurelis24/simple-react-gallery/refs/heads/main/screenshots/gallery.gif)

## Features

- Simple using minimal amount of dependencies
- Slides from thumbnail
- Keyboard navigation
- Swipe support
- Infinite swipe

## Installation

```bash
npm install @laurelis/react-simple-gallery
```

## Usage

```tsx
import ImageGallery, { Image } from '@laurelis/react-simple-gallery';

const images = [
  { id: 1, src: '/images/photo1.jpg' },
  { id: 2, src: '/images/photo2.jpg' },
  { id: 3, src: '/images/photo3.jpg' },
];

function App() {
  return (
    <ImageGallery lazyLoading={true} keyboard={true} className={'your-class'}>
      {images.map((image) => (
        // Now you can add own style to images
        <Image key={image.id} src={image.src} className={'your-class'} />
      ))}
    </ImageGallery>
  );
}
```

| Prop           | Type      | Default | Description                                              |
| -------------- | --------- | ------- | -------------------------------------------------------- |
| `lazyLoading`  | `boolean` | `true`  | Enable lazy loading of whole gallery (HTML lazy loading) |
| `keyboard`     | `boolean` | `true`  | Enable keyboard navigation                               |
| `arrowButtons` | `boolean` | `true`  | Enable show or hide arrow key buttons                    |
| `swipable`     | `boolean` | `true`  | Enable swipe on/off (mobile and pc)                      |
| `className`    | `string`  | —       | Optional CSS class for custom styling                    |

### Development & Contribution

- Contributions and feedback are welcome! Feel free to join development!
- Possible updates/bug fixes from time to time

### Used dependencies

- react-swipeable

### License

MIT © [laurelis24](https://github.com/laurelis24)
