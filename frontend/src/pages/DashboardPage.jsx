import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export default function DashboardPage() {
  const { session } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getDashboard(session.token).then(setDashboard).catch((e) => setError(e.message));
  }, [session.token]);

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <h2>Operational Climate Dashboard</h2>
        {error && <p>{error}</p>}
        {!dashboard ? (
          <p>Loading live risk telemetry...</p>
        ) : (
          <div className="grid">
            <GlassCard title="Risk Score">
              <p className="metric">{dashboard.riskScore}</p>
            </GlassCard>
            <GlassCard title="Active Alerts">
              <ul>{dashboard.alerts.map((a) => <li key={a}>{a}</li>)}</ul>
            </GlassCard>
            <GlassCard title="Temperature">
              <p className="metric">{dashboard.temperature}°C</p>
            </GlassCard>
            <GlassCard title="Rainfall">
              <p className="metric">{dashboard.rainfall} mm</p>
            </GlassCard>
          </div>
        )}
      </main>
    </div>
  );
}
