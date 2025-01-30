import Image from 'next/image';
import best from '@/images/best.jpeg';

function ImageTest() {
  return (
    <div className='w-full'>
      {/* <div className='w-full '>
        <Image
          src='https://pub-ce42191b7e6f487fa1077cb938dc35a3.r2.dev/chiron13.jpg'
          alt='main'
          width={2048}
          height={1365}
          priority
          blurDataURL='https://pub-ce42191b7e6f487fa1077cb938dc35a3.r2.dev/chiron13.jpg'
          placeholder='blur'
        />
      </div> */}
      <div className='flex flex-col md:flex-row gap-4 w-full justify-center items-start'>
        <div className='w-full md:w-1/2'>
          <Image
            src='https://pub-ce42191b7e6f487fa1077cb938dc35a3.r2.dev/best.jpeg'
            alt='other'
            width={1080}
            height={1350}
            className='w-full h-auto'
            blurDataURL='data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAACQAwCdASoQABQAPt1ut1usBgEAFgNwAFYAxeZRKm7en4XuqNgAAOJ3ylzIBqcEfwnoNY/vNbjtvFNlRM+/n2oXVT/CprMdv781BAdFlxratKxUSfGX9bA1qRYm6SbMTKFc3jBdAy5x8RbDvr/5xty0717XbVwLCZA2fbpzeUP4ix4h23QzizjmjqmFvWMwUgm1rrtnVa3taxGddkbcAA=='
            placeholder='blur'
          />
        </div>
        <div className='w-full md:w-1/2'>
          <Image src={best} alt='other' className='w-full h-auto' />
        </div>
      </div>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
    </div>
  );
}

export default ImageTest;
