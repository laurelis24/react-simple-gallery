# React Simple Gallery

- https://laurelis24.github.io/react-simple-gallery/ - Latest version (may not be released yet)

## 📸 Demo

![Image Gallery Demo](https://raw.githubusercontent.com/laurelis24/simple-react-gallery/refs/heads/main/screenshots/gallery.gif)

## Features

- Simple using minimal amount of dependencies
- Keyboard navigation
- Swipe support
- Infinite swipe

## Installation

```bash
npm install @laurelis/react-simple-gallery
```

## Usage

- Basic example

```tsx
import ImageGallery, { Image } from '@laurelis/react-simple-gallery';
import '@laurelis/react-simple-gallery/dist/style.css';

function App() {
  return (
    <ImageGallery /*props here*/>
      <Image src={'image1.jpg'} title={'Image title'} description={'Lorem ipsum'} />
      <Image src={'image2.jpg'} title={'Image title without description'} />
      <Image src={'image3.jpg'} />
    </ImageGallery>
  );
}
```

- Example using a free public API (cat images) to demonstrate a dynamic gallery with images of different sizes.

```tsx
import ImageGallery, { Image } from '@laurelis/react-simple-gallery';
import { useEffect, useState } from 'react';
import '@laurelis/react-simple-gallery/dist/style.css';

function App() {
  const [images, setImages] = useState<{ id: string; url: string }[] | null>(null);

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const reponse = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const data = await reponse.json();
        setImages(data);
      } catch (error) {}
    };

    fetchCatImages();
  }, []);
  return (
    <main>
      {(images && (
        <ImageGallery sliderAnimationDuration={350}>
          {images.map((image) => {
            return <Image key={image.id} src={image.url} />;
          })}
        </ImageGallery>
      )) || <Loader />}
    </main>
  );
}

function Loader() {
  return <h1>Loading gallery...</h1>;
}
```

- Example how to apply custom style to gallery or image. (Slider is not customizable yet)

```tsx
// for tailwind css use !important to override css file.
// for custom css use inline style to override css file.
// there's also an option to change original css file.
<ImageGallery className="border-2!" /* tailwind */>
  <Image style={{ border: 'solid 2px black' }} /* custom style */ />
  <Image className="border-2!" />
  <Image />
</ImageGallery>
```

- ImageGallery props
  | Prop | Type | Default | Description |
  | ------------------------- | --------- | ---------- | -------------------------------------------------------------------------------------- |
  | `keyboard` | `boolean` | `true` | Enable keyboard navigation (LEFT, RIGHT, ESC) |
  | `arrowButtons` | `boolean` | `true` | Show or hide arrow key buttons |
  | `swipeable` | `boolean` | `true` | Enable swipe on/off (mobile and pc) |
  | `fullScreenButton` | `boolean` | `true` | Show or hide full screen button |
  | `sliderThumbnail` | `boolean` | `true` | Show or hide sliders image thumbnail navigation button |
  | `sliderIndex` | `boolean` | `true` | Show or hide sliders image index/position |
  | `sliderTheme` | `boolean` | `true` | Show or hide sliders light/dark mode button |
  | `showImageCount` | `number` | `Infinity` | Specifies the number of images initially displayed in the gallery (min-1) |
  | `sliderAnimationDuration` | `number` | `300` | Slider animation duration |
  | `layout` | `string` | `masonry` | `responsive` | Gallery layout type - "masonry" and "flex" |
  | `lazyLoading` | `boolean` | `true` | Enable lazy loading of whole gallery (HTML lazy loading) |
  | `galleryImageAnimation` | `boolean` | `true` | Enables or disables image animation when clicking the gallery (may impact performance) |
  | `className` | `string` | — | Optional CSS class for custom styling |

- Image props
  | Prop | Type | Default | Description |
  | ------------- | -------- | ------- | --------------------------- |
  | `title` | `string` | `""` | Image title in slider |
  | `description` | `string` | `""` | Image description in slider |

## Performance

To increase performance, consider the following suggestions:

- Use small, optimized images to reduce memory usage and loading times.
- Prefer modern image formats (e.g., WebP, AVIF) for better compression.
- Lazy-load images that are not immediately visible on the screen.
- Compress images without losing noticeable quality.
- Use responsive images (`srcSet`) to serve different sizes based on device resolution.

### Development & Contribution

- Contributions and feedback are welcome! Feel free to join development!
- Possible updates/bug fixes from time to time

### Used dependencies

- react-swipeable

### License

MIT © [laurelis24](https://github.com/laurelis24)
