import ReactDOM from 'react-dom/client';
import ImageGallery from './src/components/ImageGallery';
import Image from './src/components/Image';
import React from 'react';

const images = [
  {
    id: 1,
    title: 'Image-1',
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Image-2',
    src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Image-3',
    src: 'https://w0.peakpx.com/wallpaper/203/1010/HD-wallpaper-forest-flora-forest-vithurshan-dark-europe-faded-green-leaf-mood-moody-sri-lanka-vithurshan-jpeg-wood.jpg',
  },
  {
    id: 4,
    title: 'Image-4',
    src: 'https://images.unsplash.com/photo-1755877379664-2f809909cbec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    title: 'Image-5',
    src: 'https://images.unsplash.com/photo-1755398104003-67d116e62f38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    title: 'Image-6',
    src: 'https://images.unsplash.com/photo-1741557571786-e922da981949?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    title: 'Image-7',
    src: 'https://images.unsplash.com/photo-1754901350480-c0fdd1a427b4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    title: 'Image-8',
    src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=652&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    title: 'Image-9',
    src: 'https://plus.unsplash.com/premium_photo-1719943510748-4b4354fbcf56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

function App() {
  return (
    <ImageGallery lazyLoading={false}>
      {images.map((image) => (
        <Image key={image.id} src={image.src} alt={image.title} />
      ))}
    </ImageGallery>
  );
}
