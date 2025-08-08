import { fetchDropBySlug } from "../../../lib/shopify";

export default async function DropPage({ params }: { params: { slug: string } }) {
  const drop = await fetchDropBySlug(params.slug);
  if (!drop) {
    return <div className="p-8">No drop found.</div>;
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl">{drop.title}</h1>
      <p>{drop.story}</p>
      <ul>
        {drop.products?.map((p: any) => (
          <li key={p.id}><a href={`/products/${p.handle}`}>{p.title}</a></li>
        ))}
      </ul>
    </div>
  );
}
