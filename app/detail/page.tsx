export default async function DetailPage() {
  const randomFact = await fetch('https://uselessfacts.jsph.pl/random.json?language=en')
    .then(res => res.json())
    .then(data => data.text);

  return <div>{randomFact}</div>;
}
