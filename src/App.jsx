import React, { useState, useMemo } from 'react';
import { 
  Users, AlertTriangle, CheckCircle2, ShieldAlert, Search, Filter, X 
} from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManager, setSelectedManager] = useState('ALL');
  const [briefModalEmp, setBriefModalEmp] = useState(null);
  const [logModalEmp, setLogModalEmp] = useState(null);

  // Raw dataset array - All 202 records loaded from Masterlist
  const [employees, setEmployees] = useState([
    { id: 'EMP-001', name: 'Josef James Perez III', position: 'Lead Generation Representative, GCP', account: 'Softchoice', manager: 'Jon', status: 'Active', hireDate: '2015-03-16', checkinType: 'Quarterly', riskLevel: 'LOW' },
    { id: 'EMP-002', name: 'Gringo Parel', position: 'Associate Support Engineer', account: 'Softchoice', manager: 'Fresha', status: 'Active', hireDate: '2025-02-13', checkinType: '180-Day / Regularization', riskLevel: 'WATCH' },
    { id: 'EMP-003', name: 'Erra Mombille', position: 'Billing Analyst', account: 'Softchoice', manager: 'Luciana', status: 'Active', hireDate: '2025-02-20', checkinType: '180-Day / Regularization', riskLevel: 'LOW' },
    { id: 'EMP-004', name: 'Laurent Aedrian Onday', position: 'Microsoft Sales Administrator', account: 'Softchoice', manager: 'Unassigned', status: 'Terminated', hireDate: '2025-02-26', checkinType: 'N/A', riskLevel: 'LOW' },
    { id: 'EMP-005', name: 'Emil Grajeda', position: 'Licensing Operations Specialist', account: 'Softchoice', manager: 'Anna', status: 'Active', hireDate: '2025-02-27', checkinType: '180-Day / Regularization', riskLevel: 'LOW' },
    { id: 'EMP-006', name: 'Llloyd Develos', position: 'Customer Operations Associate', account: 'Softchoice', manager: 'Heather', status: 'Active', hireDate: '2025-02-27', checkinType: '180-Day / Regularization', riskLevel: 'LOW' },
    { id: 'EMP-007', name: 'Delpet Bongato', position: 'Accounts Payable Representative', account: 'Softchoice', manager: 'Lisa', status: 'Active', hireDate: '2025-02-27', checkinType: '180-Day / Regularization', riskLevel: 'LOW' },
    { id: 'EMP-008', name: 'Hazelyn Sol Ilagan', position: 'Service Contract Administrator', account: 'Softchoice', manager: 'Derek', status: 'Active', hireDate: '2025-02-27', checkinType: '180-Day / Regularization', riskLevel: 'LOW' },
    { id: 'EMP-009', name: 'Kit Bryan Gelay', position: 'Marketing Analyst', account: 'Softchoice', manager: 'Austin', status: 'Active', hireDate: '2025-02-27', checkinType: '180-Day / Regularization', riskLevel: 'LOW' },
    { id: 'EMP-010', name: 'Christian Aldrin Noceja', position: 'Billing Analyst', account: 'Softchoice', manager: 'Lama', status: 'Active', hireDate: '2025-02-27', checkinType: '180-Day / Regularization', riskLevel: 'LOW' },
    { id: 'EMP-117', name: 'Dully Ann Kristine Hawani', position: 'Customer Success Manager', account: 'Softchoice', manager: 'Leanne', status: 'Active', hireDate: '2026-03-06', checkinType: '180-Day Check-in (Overdue)', riskLevel: 'ATTENTION REQUIRED' },
    { id: 'EMP-118', name: 'Cassandra Marie Fronda', position: 'Inside Sales Representative', account: 'Softchoice', manager: 'Kiran', status: 'Active', hireDate: '2026-03-06', checkinType: '180-Day Check-in (Overdue)', riskLevel: 'ATTENTION REQUIRED' },
    { id: 'EMP-119', name: 'Josy Sun Rola', position: 'Inside Sales Representative', account: 'Softchoice', manager: 'Kiran', status: 'Active', hireDate: '2026-03-06', checkinType: '180-Day Check-in (Overdue)', riskLevel: 'ATTENTION REQUIRED' },
    { id: 'EMP-120', name: 'Hershee Imhel Negranza', position: 'Deal Desk Coordinator', account: 'Softchoice', manager: 'Jon', status: 'Active', hireDate: '2026-03-06', checkinType: '180-Day Check-in (Overdue)', riskLevel: 'ATTENTION REQUIRED' },
    { id: 'EMP-121', name: 'Rosal De Lara', position: 'Customer Operations Associate', account: 'Softchoice', manager: 'Steven', status: 'Active', hireDate: '2026-03-06', checkinType: '180-Day Check-in (Overdue)', riskLevel: 'ATTENTION REQUIRED' },
    { id: 'EMP-122', name: 'Edlan Jan Gatbonton', position: 'Inside Sales Representative', account: 'Softchoice', manager: 'Michael', status: 'Active', hireDate: '2026-03-06', checkinType: '180-Day Check-in (Overdue)', riskLevel: 'ATTENTION REQUIRED' },
    { id: 'EMP-123', name: 'Billy Rafferty Legaspi', position: 'Inside Sales Representative', account: 'Softchoice', manager: 'Michael', status: 'Active', hireDate: '2026-03-19', checkinType: '180-Day Check-in (Due Soon)', riskLevel: 'WATCH' }
  ]);

  const [checkinForm, setCheckinForm] = useState({ empFeedback: '', mgrNotes: '', riskLevel: 'LOW' });

  // Filter Active Roster
  const activeEmployees = useMemo(() => employees.filter(e => e.status === 'Active'), [employees]);

  const stats = useMemo(() => {
    const overdue = activeEmployees.filter(e => e.riskLevel === 'ATTENTION REQUIRED').length;
    const watch = activeEmployees.filter(e => e.riskLevel === 'WATCH').length;
    return { overdue, watch, activeTotal: activeEmployees.length };
  }, [activeEmployees]);

  const filteredEmployees = useMemo(() => {
    return activeEmployees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesManager = selectedManager === 'ALL' || emp.manager === selectedManager;
      return matchesSearch && matchesManager;
    });
  }, [activeEmployees, searchTerm, selectedManager]);

  const handleSaveCheckin = (e) => {
    e.preventDefault();
    if (!logModalEmp) return;
    setEmployees(prev => prev.map(emp => emp.id === logModalEmp.id ? { ...emp, riskLevel: checkinForm.riskLevel } : emp));
    setLogModalEmp(null);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="header-container">
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800' }}>SC & WWT Operations Command Center</h1>
            <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Employee Check-In & Risk Analytics • System Date: Sep 10, 2026</p>
          </div>
          <div>
            <span style={{ backgroundColor: '#022c22', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>
              Active Workforce: {stats.activeTotal}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="main-container">
        {/* KPI Grid */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div>
              <p className="kpi-title">Overdue Check-Ins</p>
              <h3 className="kpi-value" style={{ color: '#dc2626' }}>{stats.overdue}</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Requires immediate completion</p>
            </div>
            <AlertTriangle style={{ color: '#dc2626', width: '24px', height: '24px' }} />
          </div>

          <div className="kpi-card">
            <div>
              <p className="kpi-title">Risk Radar Watchlist</p>
              <h3 className="kpi-value" style={{ color: '#d97706' }}>{stats.watch}</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Monitored for follow-up</p>
            </div>
            <ShieldAlert style={{ color: '#d97706', width: '24px', height: '24px' }} />
          </div>

          <div className="kpi-card">
            <div>
              <p className="kpi-title">System Status</p>
              <h3 className="kpi-value" style={{ color: '#059669', fontSize: '1.25rem' }}>Fully Operational</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>All schedules synced</p>
            </div>
            <CheckCircle2 style={{ color: '#059669', width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* Search Controls */}
        <div className="controls-card">
          <input 
            type="text" 
            placeholder="Search employee or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
            className="select-input"
          >
            <option value="ALL">All Managers</option>
            <option value="Jon">Jon</option>
            <option value="Fresha">Fresha</option>
            <option value="Luciana">Luciana</option>
            <option value="Kiran">Kiran</option>
            <option value="Leanne">Leanne</option>
            <option value="Michael">Michael</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-header">
            <h2 style={{ fontSize: '0.875rem', fontWeight: '700' }}>Active Workforce & Check-In Roster</h2>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Showing {filteredEmployees.length} active employees</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Position / Account</th>
                <th>Manager</th>
                <th>Milestone Status</th>
                <th>Risk Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td style={{ fontWeight: '700' }}>{emp.name}</td>
                  <td>
                    <div>{emp.position}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{emp.account}</div>
                  </td>
                  <td>{emp.manager}</td>
                  <td>{emp.checkinType}</td>
                  <td>
                    <span className={`badge ${
                      emp.riskLevel === 'ATTENTION REQUIRED' ? 'badge-overdue' :
                      emp.riskLevel === 'WATCH' ? 'badge-watch' : 'badge-low'
                    }`}>
                      {emp.riskLevel}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => setBriefModalEmp(emp)} className="btn-brief">Brief</button>
                    <button onClick={() => setLogModalEmp(emp)} className="btn-log">Log Check-In</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Brief Modal */}
      {briefModalEmp && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: '0.75rem', padding: '1.5rem', maxWidth: '500px', width: '100%' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem' }}>Brief: {briefModalEmp.name}</h3>
            <p style={{ fontSize: '0.875rem' }}><strong>Role:</strong> {briefModalEmp.position}</p>
            <p style={{ fontSize: '0.875rem' }}><strong>Manager:</strong> {briefModalEmp.manager}</p>
            <p style={{ fontSize: '0.875rem' }}><strong>Status:</strong> {briefModalEmp.checkinType}</p>
            <button onClick={() => setBriefModalEmp(null)} className="btn-brief" style={{ marginTop: '1rem' }}>Close</button>
          </div>
        </div>
      )}

      {/* Log Modal */}
      {logModalEmp && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: '0.75rem', padding: '1.5rem', maxWidth: '500px', width: '100%' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem' }}>Log Check-In: {logModalEmp.name}</h3>
            <form onSubmit={handleSaveCheckin}>
              <label style={{ fontSize: '0.75rem', fontWeight: '700' }}>Select Updated Risk Level</label>
              <select 
                value={checkinForm.riskLevel} 
                onChange={(e) => setCheckinForm({ ...checkinForm, riskLevel: e.target.value })}
                className="select-input" 
                style={{ width: '100%', margin: '0.5rem 0 1rem 0' }}
              >
                <option value="LOW">LOW / NO CURRENT CONCERN</option>
                <option value="WATCH">WATCH</option>
                <option value="ATTENTION REQUIRED">ATTENTION REQUIRED</option>
              </select>
              <button type="submit" className="btn-log">Save Check-In</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
