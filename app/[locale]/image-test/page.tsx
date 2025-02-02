import React from 'react';
import Image from 'next/image';
import best from '@/images/best.jpeg';
import { getPlaiceholder } from 'plaiceholder';

const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async res => Buffer.from(await res.arrayBuffer()));

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

// 在没有类似 vercel/cloudflare image 等图片服务的情况下使用 svg 将违背 image placeholder 的初衷，因为只有存在图片服务，先 fetch 请求 low quality 的图片才有意义。否则先 fetch 完整图片再生成 svg 本末倒置。
// 未来应该采用 css 或 base64 方式。color 的效果不太好。
async function ImageTest() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { css, svg, color, img } = await getImage('https://pub-ce42191b7e6f487fa1077cb938dc35a3.r2.dev/best.jpeg');
  console.log(css, 'color');
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
          <div className='relative overflow-hidden'>
            {React.createElement(
              svg[0],
              {
                ...svg[1],
                style: {
                  ...svg[1].style,
                  transform: ['scale(1)', svg[1].style.transform].join(' '),
                  filter: 'blur(40px)',
                },
                className: 'z-[-1]',
              },
              svg[2].map(child =>
                React.createElement(child[0], {
                  key: [child[1].x, child[1].y].join(','),
                  ...child[1],
                })
              )
            )}
            {/* <div
              className={cx(
                'absolute',
                'inset-0',
                'w-full',
                'h-full',
                'transform',
                'scale-150',
                'filter',
                'blur-2xl',
                'z-[-1]'
              )}
              style={{ backgroundColor: color.hex }}
            /> */}
            {/* <div
              className={cx(
                'absolute',
                'inset-0',
                'w-full',
                'h-full',
                'transform',
                'scale-150',
                'filter',
                'blur-2xl',
                'z-[-1]'
              )}
              style={css}
            /> */}
            <Image {...img} alt='remote' className='w-full h-auto' />
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <Image src={best} alt='local' className='w-full h-auto' placeholder='blur' />
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
