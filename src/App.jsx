import React, { useState, useMemo } from 'react';
import { 
  Users, Calendar, AlertTriangle, CheckCircle2, Clock, FileText, 
  PlusCircle, Search, Filter, ShieldAlert, Sparkles, X, Check, Copy, ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overdue');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManager, setSelectedManager] = useState('ALL');
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [briefModalEmp, setBriefModalEmp] = useState(null);
  const [logModalEmp, setLogModalEmp] = useState(null);

  // Sample employee records
  const [employees, setEmployees] = useState([
    { id: 'EMP-001', name: 'Josef James Perez III', position: 'Lead Generation Representative', team: 'GCP', manager: 'Jon', status: 'Active', hireDate: '2015-03-16', lastCheckin: '2026-06-15', checkinType: 'Quarterly', riskLevel: 'LOW', flagReason: 'None' },
    { id: 'EMP-002', name: 'Gringo Parel', position: 'Associate Support Engineer', team: 'Softchoice', manager: 'Fresha', status: 'Active', hireDate: '2025-02-13', lastCheckin: '2026-05-12', checkinType: '180-Day / Regularization', riskLevel: 'WATCH', flagReason: 'Schedule adjustment requested' },
    { id: 'EMP-003', name: 'Erra Mombille', position: 'Billing Analyst', team: 'Softchoice', manager: 'Luciana', status: 'Active', hireDate: '2025-02-20', lastCheckin: '2026-05-19', checkinType: '180-Day / Regularization', riskLevel: 'LOW', flagReason: 'None' },
    { id: 'EMP-088', name: 'Dully Ann Kristine Hawani', position: 'Customer Success Manager', team: 'Softchoice', manager: 'Leanne', status: 'Active', hireDate: '2026-03-06', lastCheckin: 'None', checkinType: '180-Day / Regularization', riskLevel: 'ATTENTION REQUIRED', flagReason: '180-Day Check-in Overdue' },
    { id: 'EMP-089', name: 'Cassandra Marie Fronda', position: 'Inside Sales Representative', team: 'Softchoice', manager: 'Kiran', status: 'Active', hireDate: '2026-03-06', lastCheckin: 'None', checkinType: '180-Day / Regularization', riskLevel: 'ATTENTION REQUIRED', flagReason: '180-Day Check-in Overdue' },
  ]);

  const [checkinForm, setCheckinForm] = useState({
    empFeedback: '',
    mgrNotes: '',
    actionItem: '',
    actionOwner: 'Manager',
    actionDueDate: '2026-09-20',
    riskLevel: 'LOW'
  });

  // KPI Calculations
  const stats = useMemo(() => {
    const overdueCount = employees.filter(e => e.riskLevel === 'ATTENTION REQUIRED' || e.checkinType.includes('Overdue')).length;
    const watchCount = employees.filter(e => e.riskLevel === 'WATCH').length;
    return { overdue: overdueCount, watch: watchCount, total: employees.length };
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesManager = selectedManager === 'ALL' || emp.manager === selectedManager;
      return matchesSearch && matchesManager;
    });
  }, [employees, searchTerm, selectedManager]);

  const handleSaveCheckin = (e) => {
    e.preventDefault();
    if (!logModalEmp) return;
    
    setEmployees(prev => prev.map(emp => {
      if (emp.id === logModalEmp.id) {
        return {
          ...emp,
          lastCheckin: '2026-09-10',
          riskLevel: checkinForm.riskLevel,
          flagReason: checkinForm.mgrNotes || 'Check-in completed successfully.'
        };
      }
      return emp;
    }));
    setLogModalEmp(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Brand Header */}
      <header className="bg-[#064E3B] text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-700 p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SC & WWT Operations Command Center</h1>
              <p className="text-xs text-emerald-200">Employee Check-In & Risk Analytics • System Date: Sep 10, 2026</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-emerald-800 text-emerald-100 rounded-full text-xs font-semibold">Active Roster: {stats.total}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overdue Check-Ins</p>
              <h3 className="text-2xl font-black text-rose-600 mt-1">{stats.overdue}</h3>
              <p className="text-xs text-slate-500 mt-1">Requires immediate completion</p>
            </div>
            <div className="p-3 bg-rose-50 rounded-lg"><AlertTriangle className="w-6 h-6 text-rose-600" /></div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Radar Watchlist</p>
              <h3 className="text-2xl font-black text-amber-600 mt-1">{stats.watch}</h3>
              <p className="text-xs text-slate-500 mt-1">Monitored for follow-up</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg"><ShieldAlert className="w-6 h-6 text-amber-600" /></div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Status</p>
              <h3 className="text-xl font-bold text-emerald-700 mt-1">Fully Operational</h3>
              <p className="text-xs text-slate-500 mt-1">All schedules synced</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg"><CheckCircle2 className="w-6 h-6 text-emerald-600" /></div>
          </div>
        </div>

        {/* Controls and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search employee or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedManager}
              onChange={(e) => setSelectedManager(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 focus:outline-none"
            >
              <option value="ALL">All Managers</option>
              <option value="Jon">Jon</option>
              <option value="Fresha">Fresha</option>
              <option value="Luciana">Luciana</option>
              <option value="Leanne">Leanne</option>
              <option value="Kiran">Kiran</option>
            </select>
          </div>
        </div>

        {/* Employee Roster Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 text-sm">Active Workforce & Check-In Roster</h2>
            <span className="text-xs text-slate-500">Showing {filteredEmployees.length} employees</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Position / Team</th>
                  <th className="px-6 py-3">Manager</th>
                  <th className="px-6 py-3">Check-In Milestone</th>
                  <th className="px-6 py-3">Risk Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{emp.name}</td>
                    <td className="px-6 py-4">
                      <p className="text-slate-800">{emp.position}</p>
                      <p className="text-xs text-slate-400">{emp.team}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{emp.manager}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        {emp.checkinType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        emp.riskLevel === 'ATTENTION REQUIRED' ? 'bg-rose-100 text-rose-700' :
                        emp.riskLevel === 'WATCH' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {emp.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => setBriefModalEmp(emp)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
                      >
                        Brief
                      </button>
                      <button 
                        onClick={() => setLogModalEmp(emp)}
                        className="px-3 py-1.5 bg-[#064E3B] hover:bg-emerald-900 text-white rounded-lg text-xs font-medium transition"
                      >
                        Log Check-In
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Brief Modal */}
      {briefModalEmp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-slate-900 text-lg">Employee Brief: {briefModalEmp.name}</h3>
              <button onClick={() => setBriefModalEmp(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <p><strong>Position:</strong> {briefModalEmp.position} ({briefModalEmp.team})</p>
              <p><strong>Manager:</strong> {briefModalEmp.manager}</p>
              <p><strong>Check-In Milestone:</strong> {briefModalEmp.checkinType}</p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mt-3">
                <p className="font-bold text-slate-800 mb-1">Recommended Discussion Questions:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>How has your overall onboarding experience been so far?</li>
                  <li>Are you receiving adequate clarity and guidance on daily metrics?</li>
                  <li>Do you have any workload or tool access concerns we can address?</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button onClick={() => setBriefModalEmp(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg text-xs font-bold">Close Brief</button>
            </div>
          </div>
        </div>
      )}

      {/* Log Check-In Modal */}
      {logModalEmp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-slate-900 text-lg">Log Check-In: {logModalEmp.name}</h3>
              <button onClick={() => setLogModalEmp(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveCheckin} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Employee Feedback / Key Discussion Points</label>
                <textarea 
                  rows={3}
                  value={checkinForm.empFeedback}
                  onChange={(e) => setCheckinForm({...checkinForm, empFeedback: e.target.value})}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  placeholder="Summarize employee comments..."
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Manager Observations & Notes</label>
                <textarea 
                  rows={2}
                  value={checkinForm.mgrNotes}
                  onChange={(e) => setCheckinForm({...checkinForm, mgrNotes: e.target.value})}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  placeholder="Record observations or action items..."
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Risk Category</label>
                <select 
                  value={checkinForm.riskLevel}
                  onChange={(e) => setCheckinForm({...checkinForm, riskLevel: e.target.value})}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                >
                  <option value="LOW">LOW / NO CURRENT CONCERN</option>
                  <option value="WATCH">WATCH</option>
                  <option value="ATTENTION REQUIRED">ATTENTION REQUIRED</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button type="button" onClick={() => setLogModalEmp(null)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#064E3B] text-white rounded-lg text-xs font-bold">Save Check-In Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
