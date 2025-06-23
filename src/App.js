import { useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    numero: "",
    client: "",
    dateCommande: "",
    dateSouhaitee: "",
    statut: "En attente",
    commentaire: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const ajouterCommande = () => {
    if (!form.numero || !form.client || !form.dateCommande) return;
    setOrders([...orders, { ...form }]);
    setForm({
      numero: "", client: "", dateCommande: "", dateSouhaitee: "",
      statut: "En attente", commentaire: ""
    });
  };

  const getAlerte = (dateSouhaitee) => {
    if (!dateSouhaitee) return "";
    const d1 = new Date(dateSouhaitee);
    const d2 = new Date();
    const diff = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    if (diff >= 14) return "🔴 Retard important";
    if (diff >= 10) return "🟡 Attention";
    return "";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📋 Plateforme de Commandes Opti-W</h1>
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Numéro de commande" name="numero" value={form.numero} onChange={handleChange} />
        <input placeholder="Nom du client" name="client" value={form.client} onChange={handleChange} />
        <input type="date" name="dateCommande" value={form.dateCommande} onChange={handleChange} />
        <input type="date" name="dateSouhaitee" value={form.dateSouhaitee} onChange={handleChange} />
        <textarea placeholder="Commentaire" name="commentaire" value={form.commentaire} onChange={handleChange} />
        <button onClick={ajouterCommande}>Ajouter</button>
      </div>

      <h2>Commandes</h2>
      {orders.map((o, i) => (
        <div key={i} style={{ marginBottom: 10, border: "1px solid gray", padding: 10 }}>
          <strong>Commande:</strong> {o.numero}<br />
          <strong>Client:</strong> {o.client}<br />
          <strong>Date:</strong> {o.dateCommande}<br />
          <strong>Souhaitée:</strong> {o.dateSouhaitee}<br />
          <strong>Statut:</strong> {o.statut}<br />
          {o.commentaire && <><strong>Note:</strong> {o.commentaire}<br /></>}
          <strong>Alerte:</strong> {getAlerte(o.dateSouhaitee)}
        </div>
      ))}
    </div>
  );
}

export default App;
