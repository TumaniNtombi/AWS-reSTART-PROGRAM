export default function GlassCard({ title, children }) {
  return (
    <section className="glass card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}
