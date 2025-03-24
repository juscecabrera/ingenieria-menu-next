
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>Este es el header de Grupo 1</header>
      <main>{children}</main>
      <footer>Footer de Grupo 1</footer>
    </div>
  );
}
