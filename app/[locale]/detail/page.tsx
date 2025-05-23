import { Suspense } from 'react';

export const revalidate = 0;

async function getRandomFact() {
  const randomFact = await fetch(
    'https://uselessfacts.jsph.pl/random.json?language=en'
  )
    .then((res) => res.json())
    .then((data) => data.text);
  return randomFact;
}

async function Fact() {
  const randomFact = await getRandomFact();
  return <div>{randomFact}</div>;
}

export default function DetailPage() {
  return (
    <div>
      <h1>some facts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Fact />
        </div>
      </Suspense>
    </div>
  );
}
