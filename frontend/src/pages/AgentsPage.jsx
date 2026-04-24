import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export default function AgentsPage() {
  const { session } = useAuth();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    api.getAgents(session.token).then((response) => setAgents(response.agents));
  }, [session.token]);

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <h2>AI Agents</h2>
        <div className="grid">
          {agents.map((agent) => (
            <GlassCard key={agent.name} title={agent.name}>
              <p>{agent.insight}</p>
              <small>Confidence: {agent.confidence}%</small>
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
}
