import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  Shield, 
  User, 
  Monitor, 
  Plus, 
  Trash2, 
  ChevronRight, 
  FileText,
  Download,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

interface TimelineEvent {
  id: string;
  time: string;
  description: string;
  type: 'incident' | 'detection' | 'response' | 'mitigation';
}

const INITIAL_EVENTS: TimelineEvent[] = [
  { id: '1', time: '09:00 AM', description: 'Employee opened suspicious email.', type: 'incident' },
  { id: '2', time: '09:05 AM', description: 'Malware started running.', type: 'incident' },
  { id: '3', time: '09:15 AM', description: 'System became slow.', type: 'incident' },
  { id: '4', time: '09:25 AM', description: 'Antivirus gave warning.', type: 'detection' },
  { id: '5', time: '09:30 AM', description: 'Security team informed.', type: 'response' },
  { id: '6', time: '09:35 AM', description: 'System disconnected from network.', type: 'mitigation' },
];

export default function App() {
  const [events, setEvents] = useState<TimelineEvent[]>(INITIAL_EVENTS);
  const [incidentName, setIncidentName] = useState('Malware Infection - Q1-2026');
  const [affectedSystems, setAffectedSystems] = useState('One employee computer (Workstation-042)');
  const [affectedUsers, setAffectedUsers] = useState('John Doe (Marketing Dept)');

  const detectionPoint = useMemo(() => {
    return events.find(e => e.type === 'detection');
  }, [events]);

  const addEvent = () => {
    const newEvent: TimelineEvent = {
      id: Math.random().toString(36).substr(2, 9),
      time: '10:00 AM',
      description: 'New event description...',
      type: 'response'
    };
    setEvents([...events, newEvent]);
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const updateEvent = (id: string, updates: Partial<TimelineEvent>) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Top Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Incident Response Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <div className="h-4 w-[1px] bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                IR
              </div>
              <span className="text-sm font-medium text-gray-700">Intern Mode</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" />
            Assignment 2: Incident Timeline Creation
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <input 
                value={incidentName}
                onChange={(e) => setIncidentName(e.target.value)}
                className="text-4xl font-extrabold tracking-tight bg-transparent border-none focus:ring-0 p-0 w-full mb-2"
              />
              <p className="text-gray-500 max-w-2xl">
                A detailed chronological report of the malware infection incident, identifying key detection points and mitigation steps taken by the response team.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2 bg-red-50 border border-red-100 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-bold text-red-700 uppercase">Critical</span>
              </div>
              <div className="px-4 py-2 bg-green-50 border border-green-100 rounded-full flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-700 uppercase">Resolved</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Chronological Timeline
                </div>
                <button 
                  onClick={addEvent}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" />
                  Add Event
                </button>
              </div>
              
              <div className="p-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[47px] top-8 bottom-8 w-[2px] bg-gray-100" />
                
                <div className="space-y-8">
                  <AnimatePresence mode="popLayout">
                    {events.map((event, index) => (
                      <motion.div 
                        key={event.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative flex gap-6 group"
                      >
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-sm",
                            event.type === 'incident' && "bg-orange-100 text-orange-600",
                            event.type === 'detection' && "bg-red-600 text-white scale-110",
                            event.type === 'response' && "bg-blue-100 text-blue-600",
                            event.type === 'mitigation' && "bg-green-100 text-green-600"
                          )}>
                            {event.type === 'incident' && <AlertTriangle className="w-4 h-4" />}
                            {event.type === 'detection' && <Shield className="w-5 h-5" />}
                            {event.type === 'response' && <ChevronRight className="w-4 h-4" />}
                            {event.type === 'mitigation' && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        </div>
                        
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between mb-1">
                            <input 
                              value={event.time}
                              onChange={(e) => updateEvent(event.id, { time: e.target.value })}
                              className="text-sm font-bold text-gray-400 uppercase tracking-widest bg-transparent border-none focus:ring-0 p-0 w-24"
                            />
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <select 
                                value={event.type}
                                onChange={(e) => updateEvent(event.id, { type: e.target.value as any })}
                                className="text-[10px] font-bold uppercase border-none bg-gray-100 rounded px-2 py-1 focus:ring-0"
                              >
                                <option value="incident">Incident</option>
                                <option value="detection">Detection</option>
                                <option value="response">Response</option>
                                <option value="mitigation">Mitigation</option>
                              </select>
                              <button 
                                onClick={() => removeEvent(event.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className={cn(
                            "p-4 rounded-xl border transition-all",
                            event.type === 'detection' 
                              ? "bg-red-50 border-red-100 shadow-md" 
                              : "bg-white border-gray-100 hover:border-gray-200"
                          )}>
                            <textarea 
                              value={event.description}
                              onChange={(e) => updateEvent(event.id, { description: e.target.value })}
                              className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-800 font-medium resize-none leading-relaxed"
                              rows={1}
                            />
                            {event.type === 'detection' && (
                              <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-red-600 uppercase tracking-wider">
                                <Info className="w-3 h-3" />
                                Critical Point of Detection
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary & Metadata */}
          <div className="space-y-6">
            {/* Point of Detection Card */}
            <div className="bg-red-600 rounded-2xl p-6 text-white shadow-lg shadow-red-200">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wider text-sm">Point of Detection</h3>
              </div>
              {detectionPoint ? (
                <>
                  <div className="text-3xl font-black mb-1">{detectionPoint.time}</div>
                  <p className="text-red-100 text-sm leading-relaxed">
                    The incident was officially identified when the antivirus software triggered a high-priority alert.
                  </p>
                </>
              ) : (
                <p className="text-red-100 text-sm italic">No detection point marked in timeline.</p>
              )}
            </div>

            {/* Affected Assets Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-800">
                <Monitor className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold uppercase tracking-wider text-sm">Affected Systems</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">System ID</div>
                  <input 
                    value={affectedSystems}
                    onChange={(e) => setAffectedSystems(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-800 font-bold"
                  />
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Primary User</div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <input 
                      value={affectedUsers}
                      onChange={(e) => setAffectedUsers(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-800 font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion Card */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Final Conclusion
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed mb-4">
                A timeline helps to understand how the attack started, know when it was detected, and see how fast the response happened.
              </p>
              <div className="bg-white/50 p-3 rounded-lg border border-blue-200/50">
                <p className="text-blue-900 text-xs font-medium italic">
                  "It tells the complete story of the incident step-by-step."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-200 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            Incident Response Intern Assignment • 2026
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-black text-gray-800">{events.length}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-gray-800">35m</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MTTD</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-gray-800">10m</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MTTR</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
