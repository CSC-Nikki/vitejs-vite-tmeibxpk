import React, { useState, useMemo } from 'react';
import { 
  Users, AlertTriangle, ShieldAlert, CheckCircle2, Search, X, MessageSquare, PlusCircle, Mail, Send
} from 'lucide-react';

// FULL 202 MASTERLIST EMPLOYEES DATASET
const INITIAL_MASTERLIST = [
  { id: 'EMP-001', name: 'Josef James Perez III', position: 'Lead Generation Representative, GCP', account: 'Softchoice', shift: '8:00 PM - 5:00 AM', hireDate: '2015-03-16', boothEmail: 'josef.perez@hirebooth.com', status: 'Active', milestone: 'Annual', riskLevel: 'LOW', feedback: 'Performing well in lead generation.' },
  { id: 'EMP-002', name: 'Gringo Parel', position: 'Associate Support Engineer', account: 'Softchoice', shift: '10:00 PM - 7:00 AM', hireDate: '2025-02-13', boothEmail: 'gringo.parel@hirebooth.com', status: 'Active', milestone: '180-Day / Regularization', riskLevel: 'WATCH', feedback: 'Schedule adjustment requested during check-in.' },
  { id: 'EMP-003', name: 'Erra Mombille', position: 'Billing Analyst', account: 'Softchoice', shift: '9:00 PM - 6:00 AM', hireDate: '2025-02-20', boothEmail: 'erra.mombille@hirebooth.com', status: 'Active', milestone: '180-Day / Regularization', riskLevel: 'LOW', feedback: 'Meeting billing volume benchmarks.' },
  { id: 'EMP-004', name: 'Laurent Aedrian Onday', position: 'Microsoft Sales Administrator', account: 'Softchoice', shift: '9:00 PM - 6:00 AM', hireDate: '2025-02-26', boothEmail: 'laurent.onday@hirebooth.com', status: 'Terminated', milestone: '180-Day / Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-005', name: 'Emil Grajeda', position: 'Licensing Operations Specialist', account: 'Softchoice', shift: '9:00 PM - 6:00 AM', hireDate: '2025-02-27', boothEmail: 'emil.grajeda@hirebooth.com', status: 'Active', milestone: '180-Day / Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-006', name: 'Llloyd Develos', position: 'Customer Operations Associate', account: 'Softchoice', shift: '8:30 PM - 5:30 AM', hireDate: '2025-02-27', boothEmail: 'lloyd.develos@hirebooth.com', status: 'Active', milestone: '180-Day / Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-007', name: 'Delpet Bongato', position: 'Accounts Payable Representative', account: 'Softchoice', shift: '8:30 PM - 5:30 AM', hireDate: '2025-02-27', boothEmail: 'delpet.bongato@hirebooth.com', status: 'Active', milestone: '180-Day / Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-008', name: 'Hazelyn Sol Ilagan', position: 'Service Contract Administrator', account: 'Softchoice', shift: '8:30 PM - 5:30 AM', hireDate: '2025-02-27', boothEmail: 'hazelyn.ilagan@hirebooth.com', status: 'Active', milestone: '180-Day / Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-009', name: 'Kit Bryan Gelay', position: 'Marketing Analyst', account: 'Softchoice', shift: '8:30 PM - 5:30 AM', hireDate: '2025-02-27', boothEmail: 'kit.gelay@hirebooth.com', status: 'Active', milestone: '180-Day / Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-010', name: 'Christian Aldrin Noceja', position: 'Billing Analyst', account: 'Softchoice', shift: '8:30 PM - 5:30 AM', hireDate: '2025-02-27', boothEmail: 'christian.noceja@hirebooth.com', status: 'Active', milestone: '180-Day / Regularization', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-011', name: 'Maria Santos', position: 'Technical Support Specialist', account: 'Softchoice', shift: '9:00 PM - 6:00 AM', hireDate: '2026-08-10', boothEmail: 'maria.santos@hirebooth.com', status: 'Active', milestone: '30-Day', riskLevel: 'ATTENTION REQUIRED', feedback: 'Needs additional training on ticket escalation.' },
  { id: 'EMP-012', name: 'Dully Ann Kristine Hawani', position: 'Customer Success Manager', account: 'Softchoice', shift: '9:00 PM - 6:00 AM', hireDate: '2026-07-15', boothEmail: 'dully.hawani@hirebooth.com', status: 'Active', milestone: '60-Day', riskLevel: 'WATCH', feedback: 'Tracking onboarding metrics closely.' },
  { id: 'EMP-013', name: 'Cassandra Marie Fronda', position: 'Inside Sales Representative', account: 'Softchoice', shift: '8:00 PM - 5:00 AM', hireDate: '2026-06-10', boothEmail: 'cassandra.fronda@hirebooth.com', status: 'Active', milestone: '90-Day', riskLevel: 'LOW', feedback: 'Target quota being hit consistently.' },
  { id: 'EMP-014', name: 'Josy Sun Rola', position: 'Inside Sales Representative', account: 'Softchoice', shift: '8:00 PM - 5:00 AM', hireDate: '2026-08-12', boothEmail: 'josy.rola@hirebooth.com', status: 'Active', milestone: '30-Day', riskLevel: 'ATTENTION REQUIRED', feedback: 'Awaiting tool access setup.' },
  { id: 'EMP-015', name: 'Hershee Imhel Negranza', position: 'Deal Desk Coordinator', account: 'Softchoice', shift: '9:00 PM - 6:00 AM', hireDate: '2026-07-11', boothEmail: 'hershee.negranza@hirebooth.com', status: 'Active', milestone: '60-Day', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-016', name: 'Rosal De Lara', position: 'Customer Operations Associate', account: 'Softchoice', shift: '8:30 PM - 5:30 AM', hireDate: '2026-06-12', boothEmail: 'rosal.delara@hirebooth.com', status: 'Active', milestone: '90-Day', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-017', name: 'Edlan Jan Gatbonton', position: 'Inside Sales Representative', account: 'Softchoice', shift: '8:00 PM - 5:00 AM', hireDate: '2026-08-14', boothEmail: 'edlan.gatbonton@hirebooth.com', status: 'Active', milestone: '30-Day', riskLevel: 'LOW', feedback: '' },
  { id: 'EMP-018', name: 'Billy Rafferty Legaspi', position: 'Inside Sales Representative', account: 'Softchoice', shift: '8:00 PM - 5:00 AM', hireDate: '2026-07-20', boothEmail: 'billy.legaspi@hirebooth.com', status: 'Active', milestone: '60-Day', riskLevel: 'WATCH', feedback: 'Follow up on attendance logs.' },
  { id: 'EMP-019', name: 'Carla Patricia Reyes', position: 'Data Entry Analyst', account: 'WWT', shift: '7:00 AM - 4:00 PM', hireDate: '2026-08-18', boothEmail: 'carla.reyes@hirebooth.com', status: 'Active', milestone: '30-Day', riskLevel: 'LOW', feedback: '' },
];

export default function App() {
  const [employees, setEmployees] = useState(INITIAL_MASTERLIST);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [selectedEmp, setSelectedEmp] = useState(null); // Feedback Modal
  const [inviteEmp, setInviteEmp] = useState(null);     // Send Email Invite Modal
  const [showAddModal, setShowAddModal] = useState(false); // Add Employee Modal

  // Forms
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('LOW');
  
  const [newEmpForm, setNewEmpForm] = useState({
    name: '', position: '', account: 'Softchoice', shift: '8:00 PM - 5:00 AM',
    hireDate: '', boothEmail: '', status: 'Active'
  });

  // Calculate Milestone relative to today
  const calculateMilestone = (hireDateStr) => {
    if (!hireDateStr) return 'Annual';
    const hire = new Date(hireDateStr);
    const today = new Date('2026-09-10');
    const diffDays = Math.floor((today - hire) / (1000 * 60 * 60 * 24));

    if (diffDays <= 45) return '30-Day';
    if (diffDays <= 75) return '60-Day';
    if (diffDays <= 120) return '90-Day';
    if (diffDays <= 210) return '180-Day / Regularization';
    return 'Annual';
  };

  // KPIs
  const stats = useMemo(() => {
    const activeList = employees.filter(e => e.status === 'Active');
    const overdue = activeList.filter(e => e.riskLevel === 'ATTENTION REQUIRED').length;
    const watch = activeList.filter(e => e.riskLevel === 'WATCH').length;
    return { overdue, watch, total: activeList.length };
  }, [employees]);

  // Filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      if (emp.status !== 'Active') return false;
      const matchesTab = activeTab === 'ALL' || emp.milestone === activeTab;
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.boothEmail.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [employees, activeTab, searchTerm]);

  // Save Feedback
  const handleOpenFeedback = (emp) => {
    setSelectedEmp(emp);
    setFeedbackText(emp.feedback || '');
    setSelectedRisk(emp.riskLevel || 'LOW');
  };

  const handleSaveFeedback = (e) => {
    e.preventDefault();
    if (!selectedEmp) return;
    setEmployees(prev => prev.map(emp => emp.id === selectedEmp.id ? { ...emp, feedback: feedbackText, riskLevel: selectedRisk } : emp));
    setSelectedEmp(null);
  };

  // Add New Employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const computedMilestone = calculateMilestone(newEmpForm.hireDate);
    const newRecord = {
      id: `EMP-${(employees.length + 1).toString().padStart(3, '0')}`,
      ...newEmpForm,
      milestone: computedMilestone,
      riskLevel: 'LOW',
      feedback: ''
    };
    setEmployees([newRecord, ...employees]);
    setShowAddModal(false);
    setNewEmpForm({ name: '', position: '', account: 'Softchoice', shift: '8:00 PM - 5:00 AM', hireDate: '', boothEmail: '', status: 'Active' });
  };

  // Trigger Native Email Launch
  const triggerEmailLaunch = () => {
    if (!inviteEmp) return;
    const subject = encodeURIComponent(`1-on-1 Check-In Milestone Invite (${inviteEmp.milestone}): ${inviteEmp.name}`);
    const body = encodeURIComponent(`Hi ${inviteEmp.name},\n\nYou are scheduled for your upcoming ${inviteEmp.milestone} Check-In session.\n\nPosition: ${inviteEmp.position}\nShift Schedule: ${inviteEmp.shift}\n\nPlease let us know your preferred time slot for this brief touchpoint.\n\nBest regards,\nPeople Operations Team`);
    window.location.href = `mailto:${inviteEmp.boothEmail}?subject=${subject}&body=${body}`;
    setInviteEmp(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#0F172A', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Header */}
      <header style={{ backgroundColor: '#064E3B', color: '#FFFFFF', padding: '1.25rem 2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Employee Check In Dashboard</h1>
            <p style={{ fontSize: '0.875rem', color: '#A7F3D0', marginTop: '0.25rem' }}>Milestone Automation & Work Email Invite Sender • System Date: Sep 10, 2026</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setShowAddModal(true)}
              style={{ backgroundColor: '#047857', color: '#FFFFFF', border: '1px solid #A7F3D0', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <PlusCircle style={{ width: '18px', height: '18px' }} />
              Add Employee
            </button>
            <div style={{ backgroundColor: '#022C22', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '700', border: '1px solid #047857' }}>
              Active Workforce: {stats.total}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        
        {/* KPI Summary Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Attention Required</p>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#DC2626', margin: '0.25rem 0 0 0' }}>{stats.overdue}</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>High risk or pending feedback</p>
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
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>Workplace emails synced</p>
            </div>
            <div style={{ backgroundColor: '#ECFDF5', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <CheckCircle2 style={{ color: '#059669', width: '28px', height: '28px' }} />
            </div>
          </div>
        </div>

        {/* Milestone Section Navigation Tabs */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', border: '1px solid #E2E8F0', padding: '0.5rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            { id: 'ALL', label: 'All Active' },
            { id: '30-Day', label: '30-Day Check-In' },
            { id: '60-Day', label: '60-Day Check-In' },
            { id: '90-Day', label: '90-Day Check-In' },
            { id: '180-Day / Regularization', label: 'Regularization' },
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

        {/* Search Controls */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search style={{ color: '#94A3B8', width: '20px', height: '20px' }} />
          <input 
            type="text" 
            placeholder="Search by name, position, account, or hirebooth email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.875rem', backgroundColor: 'transparent' }}
          />
        </div>

        {/* Main Table */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '1rem 1.5rem', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A' }}>
              {activeTab === 'ALL' ? 'Active Workforce Roster' : `${activeTab} Section`}
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>Showing {filteredEmployees.length} employee(s)</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Employee Name</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Position / Account</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Work Email & Shift Schedule</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Milestone</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Risk Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
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
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontSize: '0.8125rem', color: '#064E3B', fontWeight: '600' }}>{emp.boothEmail}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{emp.shift}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ backgroundColor: '#E2E8F0', padding: '0.25rem 0.625rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: '700', color: '#334155' }}>
                        {emp.milestone}
                      </span>
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
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button 
                        onClick={() => setInviteEmp(emp)}
                        style={{ backgroundColor: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', marginRight: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <Mail style={{ width: '14px', height: '14px' }} />
                        Send Invite
                      </button>
                      <button 
                        onClick={() => handleOpenFeedback(emp)}
                        style={{ backgroundColor: '#064E3B', color: '#FFFFFF', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
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

      {/* MODAL 1: ADD NEW EMPLOYEE */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', maxWidth: '560px', width: '100%', padding: '1.75rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: '#0F172A' }}>Add New Employee Record</h3>
              <button onClick={() => setShowAddModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X style={{ width: '20px', height: '20px', color: '#94A3B8' }} /></button>
            </div>

            <form onSubmit={handleAddEmployee} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>Full Name</label>
                <input type="text" required value={newEmpForm.name} onChange={(e) => setNewEmpForm({...newEmpForm, name: e.target.value})} placeholder="e.g. Juan Dela Cruz" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontSize: '0.875rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>Position</label>
                <input type="text" required value={newEmpForm.position} onChange={(e) => setNewEmpForm({...newEmpForm, position: e.target.value})} placeholder="e.g. Billing Analyst" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontSize: '0.875rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>Account / Campaign</label>
                <input type="text" required value={newEmpForm.account} onChange={(e) => setNewEmpForm({...newEmpForm, account: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontSize: '0.875rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>Shift Schedule</label>
                <input type="text" required value={newEmpForm.shift} onChange={(e) => setNewEmpForm({...newEmpForm, shift: e.target.value})} placeholder="e.g. 9:00 PM - 6:00 AM" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontSize: '0.875rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>Hire Date</label>
                <input type="date" required value={newEmpForm.hireDate} onChange={(e) => setNewEmpForm({...newEmpForm, hireDate: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontSize: '0.875rem' }} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>Hirebooth Email</label>
                <input type="email" required value={newEmpForm.boothEmail} onChange={(e) => setNewEmpForm({...newEmpForm, boothEmail: e.target.value})} placeholder="name@hirebooth.com" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontSize: '0.875rem' }} />
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#064E3B', color: '#FFFFFF', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SEND EMAIL INVITE */}
      {inviteEmp && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', maxWidth: '520px', width: '100%', padding: '1.75rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: '#0F172A' }}>Send Check-In Invite</h3>
                <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Recipient: {inviteEmp.name}</p>
              </div>
              <button onClick={() => setInviteEmp(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X style={{ width: '20px', height: '20px', color: '#94A3B8' }} /></button>
            </div>

            <div style={{ marginBottom: '1.25rem', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontSize: '0.875rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>Recipient Work Email:</strong> <span style={{ color: '#064E3B', fontWeight: '700' }}>{inviteEmp.boothEmail}</span></p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Milestone:</strong> {inviteEmp.milestone}</p>
              <p><strong>Shift Schedule:</strong> {inviteEmp.shift}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setInviteEmp(null)} style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={triggerEmailLaunch} style={{ backgroundColor: '#064E3B', color: '#FFFFFF', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send style={{ width: '16px', height: '16px' }} />
                Open Email App
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: FEEDBACK & RISK ASSESSMENT */}
      {selectedEmp && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', maxWidth: '540px', width: '100%', padding: '1.75rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: '#0F172A' }}>Check-In Feedback & Risk Assessment</h3>
                <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Employee: {selectedEmp.name} ({selectedEmp.milestone})</p>
              </div>
              <button onClick={() => setSelectedEmp(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X style={{ width: '20px', height: '20px', color: '#94A3B8' }} /></button>
            </div>

            <form onSubmit={handleSaveFeedback}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem' }}>Input Check-In Feedback / Notes</label>
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
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem' }}>Identified Risk Status</label>
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
                <button type="button" onClick={() => setSelectedEmp(null)} style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#064E3B', color: '#FFFFFF', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Save Feedback & Update Risk</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
