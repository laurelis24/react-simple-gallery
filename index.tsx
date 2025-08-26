import ReactDOM from 'react-dom/client';
import ImageGallery from './src/components/ImageGallery';
import Image from './src/components/Image';
import React from 'react';

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1488510665058-33ce2e6ab561?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    src: 'https://w0.peakpx.com/wallpaper/203/1010/HD-wallpaper-forest-flora-forest-vithurshan-dark-europe-faded-green-leaf-mood-moody-sri-lanka-vithurshan-jpeg-wood.jpg',
  },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

function App() {
  return (
    <ImageGallery>
      {images.map((image) => (
        <Image key={image.id} src={image.src} />
      ))}
    </ImageGallery>
  );
}
