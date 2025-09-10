# React Simple Gallery

- https://laurelis24.github.io/react-simple-gallery/

## 📸 Demo

![Image Gallery Demo](https://raw.githubusercontent.com/laurelis24/simple-react-gallery/refs/heads/main/screenshots/gallery.gif)

## Features

- Simple using minimal amount of dependencies
- Slides from thumbnail
- Keyboard navigation
- Swipe support
- Infinite swipe

## Installation

- react-swipeable is now a peer dependency (You have to install react-swipeable)

```bash
npm install @laurelis/react-simple-gallery
```

## Usage

```tsx
import ImageGallery, { Image } from '@laurelis/react-simple-gallery';

const images = [
  { id: 1, title: "Image-1" src: '/images/photo1.jpg' },
  { id: 2, title: "Image-2", src: '/images/photo2.jpg' },
  { id: 3, title: "Image-3", src: '/images/photo3.jpg' },
];

function App() {
  return (
    <ImageGallery lazyLoading={true} keyboard={true} className={'your-class'}>
      {images.map((image) => (
        // Now you can add own style to images
        <Image key={image.id} src={image.src} alt={image.title} className={'your-class'} />
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
| `swipeable`    | `boolean` | `true`  | Enable swipe on/off (mobile and pc)                      |
| `className`    | `string`  | —       | Optional CSS class for custom styling                    |

### Development & Contribution

- Contributions and feedback are welcome! Feel free to join development!
- Possible updates/bug fixes from time to time

### Used dependencies

- react-swipeable

### License

MIT © [laurelis24](https://github.com/laurelis24)
