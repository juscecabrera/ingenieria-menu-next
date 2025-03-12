import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1>Ingenieria del Menu</h1>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li><Link href="/costs">Costos</Link></li>
        <li><Link href="/platos">Platos</Link></li>
      </ul>      
    </div>
  );
}
