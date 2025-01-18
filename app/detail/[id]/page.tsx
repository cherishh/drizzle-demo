export default async function BookDetail({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div>
      <h1>BookDetail</h1>
      <p>{id}</p>
    </div>
  );
}
