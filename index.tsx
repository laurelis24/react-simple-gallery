import ReactDOM from 'react-dom/client';
import ImageGallery from './src/components/ImageGallery';

const images = [
  {
    id: 1,
    src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/96b8627588997030e5a6b56ca5e9944756c8f288/capsule_616x353.jpg?t=1746612330',
  },
  {
    id: 2,
    src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/96b8627588997030e5a6b56ca5e9944756c8f288/capsule_616x353.jpg?t=1746612330',
  },
  {
    id: 3,
    src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/96b8627588997030e5a6b56ca5e9944756c8f288/capsule_616x353.jpg?t=1746612330',
  },
  {
    id: 4,
    src: 'https://w0.peakpx.com/wallpaper/203/1010/HD-wallpaper-forest-flora-forest-vithurshan-dark-europe-faded-green-leaf-mood-moody-sri-lanka-vithurshan-jpeg-wood.jpg',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1747134392471-831ea9a48e1e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1748519707841-df414b70a215?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1748519707841-df414b70a215?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1748519707841-df414b70a215?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg',
  },
  {
    id: 9,
    src: 'https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/513871665_1047921377466605_647890360810318158_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nfbgn86SPzYQ7kNvwEKDv-D&_nc_oc=Adku4e49myAikfwnwkNOvAQV6vPz1UevzWW-SVQWBJDB4yHW1aEBZHppa3S9nr_yYgIh7d3jEWPmsy8axyOBkVo5&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=hwnyh4ss1OvZFEbofI4eTA&oh=00_AfTZ7WYtGxAl81C5kQFEB5Rff3A4MsUxhnbsF-RZRJJn4Q&oe=687D9B53',
  },
  {
    id: 10,
    src: 'https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/513871665_1047921377466605_647890360810318158_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nfbgn86SPzYQ7kNvwEKDv-D&_nc_oc=Adku4e49myAikfwnwkNOvAQV6vPz1UevzWW-SVQWBJDB4yHW1aEBZHppa3S9nr_yYgIh7d3jEWPmsy8axyOBkVo5&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=hwnyh4ss1OvZFEbofI4eTA&oh=00_AfTZ7WYtGxAl81C5kQFEB5Rff3A4MsUxhnbsF-RZRJJn4Q&oe=687D9B53',
  },
  {
    id: 11,
    src: 'https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/513871665_1047921377466605_647890360810318158_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nfbgn86SPzYQ7kNvwEKDv-D&_nc_oc=Adku4e49myAikfwnwkNOvAQV6vPz1UevzWW-SVQWBJDB4yHW1aEBZHppa3S9nr_yYgIh7d3jEWPmsy8axyOBkVo5&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=hwnyh4ss1OvZFEbofI4eTA&oh=00_AfTZ7WYtGxAl81C5kQFEB5Rff3A4MsUxhnbsF-RZRJJn4Q&oe=687D9B53',
  },
  {
    id: 12,
    src: 'https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/513871665_1047921377466605_647890360810318158_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nfbgn86SPzYQ7kNvwEKDv-D&_nc_oc=Adku4e49myAikfwnwkNOvAQV6vPz1UevzWW-SVQWBJDB4yHW1aEBZHppa3S9nr_yYgIh7d3jEWPmsy8axyOBkVo5&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=hwnyh4ss1OvZFEbofI4eTA&oh=00_AfTZ7WYtGxAl81C5kQFEB5Rff3A4MsUxhnbsF-RZRJJn4Q&oe=687D9B53',
  },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <Test />,
  // </React.StrictMode>,
);

function Test() {
  return (
    <main>
      <p style={{ width: '150px' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet possimus temporibus error nostrum. Dolor id
        eveniet eum doloremque totam dolorum at recusandae laudantium iusto maxime numquam officia ab dicta placeat
        maiores, obcaecati ipsa vitae sint. Enim, molestias dolorum! Aperiam mollitia eveniet quia expedita amet?
        Laboriosam autem tempora quisquam voluptate, sapiente eos, cum at dignissimos mollitia soluta eligendi
        laudantium modi dolores! Facilis, rem ab. Obcaecati molestiae deleniti repudiandae velit. Sapiente temporibus
        tenetur adipisci culpa, illo iste tempore voluptatum dicta, pariatur soluta nobis. Rem hic voluptatibus rerum
        porro quidem quibusdam nobis vel minima corporis facere beatae pariatur, facilis sit esse dolores odio
        distinctio ab modi? Sit, expedita ipsam? Voluptates reiciendis, iure facilis perferendis ducimus aut.
        Consequatur aliquam tenetur itaque fugiat illum consectetur, quia sed quidem ab saepe adipisci omnis maiores
        perspiciatis error minima beatae odit dignissimos amet aut vitae est! Nobis, id. Non quod veniam quam eos, velit
        veritatis asperiores distinctio cum dolorem dolores nobis maiores? Ipsum repellat voluptate autem ducimus quam
        illo. Quidem unde consectetur vitae saepe distinctio quisquam, non aliquam! Rerum deserunt vitae, quasi delectus
        accusantium, atque sint consequatur explicabo reiciendis exercitationem deleniti illum nisi ex officia libero
        est hic iusto iure quam suscipit facilis. Necessitatibus quibusdam numquam debitis veniam!
      </p>
      <ImageGallery images={images} lazyLoading={true} keyboard={true} />
    </main>
  );
}
