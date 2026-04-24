import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export default function FarmDataPage() {
  const { session } = useAuth();
  const [farms, setFarms] = useState([]);
  const [payload, setPayload] = useState({ farmId: '', location: '', cropType: '', soilHealth: '' });

  useEffect(() => {
    api.getFarmData(session.token).then((response) => setFarms(response.farms));
  }, [session.token]);

  async function updateFarm(event) {
    event.preventDefault();
    await api.updateFarm(session.token, payload);
    const refresh = await api.getFarmData(session.token);
    setFarms(refresh.farms);
    setPayload({ farmId: '', location: '', cropType: '', soilHealth: '' });
  }

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <h2>Farm Records</h2>
        <div className="grid two-col">
          <GlassCard title="Update Farm Data">
            <form onSubmit={updateFarm} className="stack">
              <input required placeholder="Farm ID" value={payload.farmId} onChange={(e) => setPayload({ ...payload, farmId: e.target.value })} />
              <input required placeholder="Location" value={payload.location} onChange={(e) => setPayload({ ...payload, location: e.target.value })} />
              <input required placeholder="Crop Type" value={payload.cropType} onChange={(e) => setPayload({ ...payload, cropType: e.target.value })} />
              <input required placeholder="Soil Health" value={payload.soilHealth} onChange={(e) => setPayload({ ...payload, soilHealth: e.target.value })} />
              <button type="submit">Save</button>
            </form>
          </GlassCard>
          <GlassCard title="Current Farms">
            <ul>
              {farms.map((farm) => (
                <li key={farm.farmId}>
                  <strong>{farm.farmId}</strong> · {farm.location} · {farm.cropType} · Soil {farm.soilHealth}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
