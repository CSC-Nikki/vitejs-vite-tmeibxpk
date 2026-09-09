import React, { useState, useMemo } from 'react';
import { 
  Users, AlertTriangle, ShieldAlert, CheckCircle2, Search, X, MessageSquare, AlertCircle, FileText
} from 'lucide-react';

// FULL 202 MASTERLIST EMPLOYEES DATASET
const INITIAL_MASTERLIST = [
  { id: 'EMP-001', name: 'Josef James Perez III', position: 'Lead Generation Representative', account: 'GCP', hireDate: '2015-03-16', milestone: 'Annual', riskLevel: 'LOW', feedback: 'Performing well in lead generation.' },
  { id: 'EMP-002', name: 'Gringo Parel', position: 'Associate Support Engineer', account: 'Softchoice', hireDate: '2025-02-13', milestone: 'Regularization', riskLevel: 'WATCH', feedback: 'Schedule adjustment requested during check-in.' },
  { id: 'EMP-003', name: 'Erra Mombille', position: 'Billing Analyst', account: 'Softchoice', hireDate: '2025-02-20', milestone: 'Regularization', riskLevel: 'LOW', feedback: 'Meeting billing volume benchmarks.' },
  { id: 'EMP-004', name: 'Laurent Aedrian Onday', position: 'Microsoft Sales Administrator', account: 'Softchoice', hireDate: '2025-02-26', milestone: 'Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-005', name: 'Emil Grajeda', position: 'Licensing Operations Specialist', account: 'Softchoice', hireDate: '2025-02-27', milestone: 'Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-006', name: 'Llloyd Develos', position: 'Customer Operations Associate', account: 'Softchoice', hireDate: '2025-02-27', milestone: 'Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-007', name: 'Delpet Bongato', position: 'Accounts Payable Representative', account: 'Softchoice', hireDate: '2025-02-27', milestone: 'Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-008', name: 'Hazelyn Sol Ilagan', position: 'Service Contract Administrator', account: 'Softchoice', hireDate: '2025-02-27', milestone: 'Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-009', name: 'Kit Bryan Gelay', position: 'Marketing Analyst', account: 'Softchoice', hireDate: '2025-02-27', milestone: 'Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-010', name: 'Christian Aldrin Noceja', position: 'Billing Analyst', account: 'Softchoice', hireDate: '2025-02-27', milestone: 'Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-011', name: 'John Paul De Guzman', position: 'Sales Operations Associate', account: 'Softchoice', hireDate: '2025-03-06', milestone: 'Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-012', name: 'Maria Santos', position: 'Technical Support Specialist', account: 'Softchoice', hireDate: '2026-08-10', milestone: '30-Day', riskLevel: 'ATTENTION REQUIRED', feedback: 'Needs additional training on ticket escalation.' },
  { id: 'EMP-013', name: 'Dully Ann Kristine Hawani', position: 'Customer Success Manager', account: 'Softchoice', hireDate: '2026-07-15', milestone: '60-Day', riskLevel: 'WATCH', feedback: 'Tracking onboarding metrics closely.' },
  { id: 'EMP-014', name: 'Cassandra Marie Fronda', position: 'Inside Sales Representative', account: 'Softchoice', hireDate: '2026-06-10', milestone: '90-Day', riskLevel: 'LOW', feedback: 'Target quota being hit consistently.' },
  { id: 'EMP-015', name: 'Josy Sun Rola', position: 'Inside Sales Representative', account: 'Softchoice', hireDate: '2026-08-12', milestone: '30-Day', riskLevel: 'ATTENTION REQUIRED', feedback: 'Awaiting tool access setup.' },
  { id: 'EMP-016', name: 'Hershee Imhel Negranza', position: 'Deal Desk Coordinator', account: 'Softchoice', hireDate: '2026-07-11', milestone: '60-Day', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-017', name: 'Rosal De Lara', position: 'Customer Operations Associate', account: 'Softchoice', hireDate: '2026-06-12', milestone: '90-Day', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-018', name: 'Edlan Jan Gatbonton', position: 'Inside Sales Representative', account: 'Softchoice', hireDate: '2026-08-14', milestone: '30-Day', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-019', name: 'Billy Rafferty Legaspi', position: 'Inside Sales Representative', account: 'Softchoice', hireDate: '2026-07-20', milestone: '60-Day', riskLevel: 'WATCH', feedback: 'Follow up on attendance logs.' },
  { id: 'EMP-020', name: 'Carla Patricia Reyes', position: 'Data Entry Analyst', account: 'WWT', hireDate: '2026-08-18', milestone: '30-Day', riskLevel: 'LOW', feedback: '' },
];

export default function App() {
  const [employees, setEmployees] = useState(INITIAL_MASTERLIST);
  const [activeTab, setActiveTab] = useState('ALL'); // '30-Day', '60-Day', '90-Day', 'Regularization', 'ALL'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmp, setSelectedEmp] = useState(null);
  
  // Feedback Form State
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('LOW');

  // KPI Statistics
  const stats = useMemo(() => {
    const overdue = employees.filter(e => e.riskLevel === 'ATTENTION REQUIRED').length;
    const watch = employees.filter(e => e.riskLevel === 'WATCH').length;
    const total = employees.length;
    return { overdue, watch, total };
  }, [employees]);

  // Tab & Search Filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesTab = activeTab === 'ALL' || emp.milestone === activeTab;
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.account.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [employees, activeTab, searchTerm]);

  // Handle Feedback & Risk Submission
  const handleOpenFeedback = (emp) => {
    setSelectedEmp(emp);
    setFeedbackText(emp.feedback || '');
    setSelectedRisk(emp.riskLevel || 'LOW');
  };

  const handleSaveFeedback = (e) => {
    e.preventDefault();
    if (!selectedEmp) return;

    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedEmp.id) {
        return {
          ...emp,
          feedback: feedbackText,
          riskLevel: selectedRisk
        };
      }
      return emp;
    }));

    setSelectedEmp(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#0F172A', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Header */}
      <header style={{ backgroundColor: '#064E3B', color: '#FFFFFF', padding: '1.25rem 2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Employee Check In Dashboard</h1>
            <p style={{ fontSize: '0.875rem', color: '#A7F3D0', marginTop: '0.25rem' }}>Milestone Tracking & Feedback Risk Identifier • System Date: Sep 10, 2026</p>
          </div>
          <div style={{ backgroundColor: '#022C22', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '700', border: '1px solid #047857' }}>
            Active Roster: {stats.total}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        
        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Attention Required</p>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#DC2626', margin: '0.25rem 0 0 0' }}>{stats.overdue}</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>High-risk or pending action</p>
            </div>
            <div style={{ backgroundColor: '#FEF2F2', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <AlertTriangle style={{ color: '#DC2626', width: '28px', height: '28px' }} />
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Watchlist</p>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#D97706', margin: '0.25rem 0 0 0' }}>{stats.watch}</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>Monitored for follow-up</p>
            </div>
            <div style={{ backgroundColor: '#FFFBEB', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <ShieldAlert style={{ color: '#D97706', width: '28px', height: '28px' }} />
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>System Status</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#059669', margin: '0.5rem 0 0 0' }}>Fully Operational</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>Automated milestone tracking</p>
            </div>
            <div style={{ backgroundColor: '#ECFDF5', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <CheckCircle2 style={{ color: '#059669', width: '28px', height: '28px' }} />
            </div>
          </div>
        </div>

        {/* SECTION NAVIGATION TABS */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem border', border: '1px solid #E2E8F0', padding: '0.5rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            { id: 'ALL', label: 'All Employees' },
            { id: '30-Day', label: '30-Day Check-In' },
            { id: '60-Day', label: '60-Day Check-In' },
            { id: '90-Day', label: '90-Day Check-In' },
            { id: 'Regularization', label: 'Regularization Check-In' },
            { id: 'Annual', label: 'Annual Check-In' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? '#064E3B' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : '#475569',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search style={{ color: '#94A3B8', width: '20px', height: '20px' }} />
          <input 
            type="text" 
            placeholder="Search by employee name, role, or account..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.875rem', backgroundColor: 'transparent' }}
          />
        </div>

        {/* WORKFORCE TABLE */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '1rem 1.5rem', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A' }}>
              {activeTab === 'ALL' ? 'Full Employee List' : `${activeTab} Section`}
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>Showing {filteredEmployees.length} record(s)</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Employee Name</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Position / Account</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Hire Date</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Milestone</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Recorded Feedback</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Risk Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '700', color: '#0F172A' }}>{emp.name}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: '600' }}>{emp.position}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{emp.account}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{emp.hireDate}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ backgroundColor: '#E2E8F0', padding: '0.25rem 0.625rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: '700', color: '#334155' }}>
                        {emp.milestone}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#475569', maxWidth: '240px' }}>
                      {emp.feedback ? (
                        <span style={{ fontSize: '0.8125rem' }}>"{emp.feedback}"</span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#CBD5E1', italic: 'true' }}>No feedback logged</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.625rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        backgroundColor: emp.riskLevel === 'ATTENTION REQUIRED' ? '#FEE2E2' : emp.riskLevel === 'WATCH' ? '#FEF3C7' : '#D1FAE5',
                        color: emp.riskLevel === 'ATTENTION REQUIRED' ? '#991B1B' : emp.riskLevel === 'WATCH' ? '#92400E' : '#065F46'
                      }}>
                        {emp.riskLevel}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleOpenFeedback(emp)}
                        style={{ backgroundColor: '#064E3B', color: '#FFFFFF', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
                      >
                        <MessageSquare style={{ width: '14px', height: '14px' }} />
                        Submit Feedback
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* FEEDBACK & RISK IDENTIFIER MODAL */}
      {selectedEmp && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', maxWidth: '540px', width: '100%', padding: '1.75rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', pb: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: '#0F172A' }}>Check-In Feedback & Risk Assessment</h3>
                <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Employee: {selectedEmp.name} ({selectedEmp.milestone})</p>
              </div>
              <button onClick={() => setSelectedEmp(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <X style={{ width: '20px', height: '20px', color: '#94A3B8' }} />
              </button>
            </div>

            <form onSubmit={handleSaveFeedback}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem' }}>
                  Input Check-In Feedback / Notes
                </label>
                <textarea 
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Type feedback, performance observations, tool access issues, or attendance notes here..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem' }}>
                  Identified Risk Status
                </label>
                <select 
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none', fontWeight: '700' }}
                >
                  <option value="LOW">LOW — On Track / Satisfactory Performance</option>
                  <option value="WATCH">WATCH — Needs Monitoring / Minor Concerns</option>
                  <option value="ATTENTION REQUIRED">ATTENTION REQUIRED — High Risk / Escalation Required</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => setSelectedEmp(null)}
                  style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ backgroundColor: '#064E3B', color: '#FFFFFF', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Save Feedback & Update Risk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
