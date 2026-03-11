/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Search, 
  Activity, 
  Lock, 
  Database,
  ChevronRight,
  Download,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Severity = 'Low' | 'Medium' | 'High';

interface IncidentScenario {
  id: string;
  title: string;
  description: string;
  type?: string;
  severity?: Severity;
  reason?: string[];
  impactArea?: string;
  status: 'Pending' | 'Classified';
}

const INITIAL_SCENARIOS: IncidentScenario[] = [
  {
    id: 'INC-001',
    title: 'Malware Infection on Employee Workstation',
    description: 'A workstation in the finance department is exhibiting unusual behavior, including slow performance and unauthorized outbound network connections to known malicious IPs.',
    status: 'Pending'
  },
  {
    id: 'INC-002',
    title: 'Unauthorized Login Attempt',
    description: 'The security logs show 50+ failed login attempts within 5 minutes for the administrator account from an external IP address in a different geographical region.',
    status: 'Pending'
  },
  {
    id: 'INC-003',
    title: 'Sensitive Data Leakage',
    description: 'An automated DLP (Data Loss Prevention) alert triggered when an employee attempted to upload a file named "Q4_Customer_Records.csv" to a personal cloud storage service.',
    status: 'Pending'
  }
];

const PRE_CLASSIFIED_DATA: Record<string, Partial<IncidentScenario>> = {
  'INC-001': {
    type: 'Malware Infection (Malicious Software Attack)',
    severity: 'High',
    reason: [
      'Malware can spread to other systems in the network.',
      'Risk of ransomware encrypting critical data.',
      'May disrupt business operations.',
      'Requires immediate isolation and investigation.'
    ],
    impactArea: 'Confidentiality, Integrity, and Availability (CIA Triad)'
  },
  'INC-002': {
    type: 'Unauthorized Access Attempt',
    severity: 'Medium',
    reason: [
      'Multiple failed login attempts detected.',
      'Indicates possible brute-force attack or stolen credentials.',
      'Requires password reset and monitoring.',
      'If successful, it could escalate to a serious breach.'
    ],
    impactArea: 'Potential confidentiality risk'
  },
  'INC-003': {
    type: 'Data Exfiltration / Leakage',
    severity: 'High',
    reason: [
      'Direct exposure of sensitive customer information.',
      'Potential regulatory compliance violation (GDPR/CCPA).',
      'High reputational risk for the organization.',
      'Indicates potential insider threat or lack of security awareness.'
    ],
    impactArea: 'Confidentiality and Compliance'
  }
};

export default function App() {
  const [scenarios, setScenarios] = useState<IncidentScenario[]>(INITIAL_SCENARIOS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleClassify = (id: string) => {
    setScenarios(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, ...PRE_CLASSIFIED_DATA[id], status: 'Classified' };
      }
      return s;
    }));
  };

  const selectedScenario = scenarios.find(s => s.id === selectedId);

  const getSeverityColor = (severity?: Severity) => {
    switch (severity) {
      case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0]">
      {/* Header */}
      <header className="border-b border-[#141414] p-6 flex justify-between items-center bg-[#E4E3E0] sticky top-0 z-10">
        <div>
          <h1 className="font-serif italic text-2xl tracking-tight">IncidentResponse Intern</h1>
          <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono mt-1">Assignment 1: Identification & Classification</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 border border-[#141414] rounded-full text-xs font-mono">
            <Activity className="w-3 h-3 animate-pulse text-red-600" />
            LIVE_MONITORING
          </div>
          <div className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center text-[#E4E3E0] text-xs font-mono">
            IR
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-88px)]">
        {/* Left Panel: Incident List */}
        <div className="lg:col-span-4 border-r border-[#141414] p-0 overflow-y-auto">
          <div className="p-4 border-b border-[#141414] bg-[#DCDAD7]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
              <input 
                type="text" 
                placeholder="SEARCH_INCIDENTS..." 
                className="w-full bg-transparent border border-[#141414] rounded-md py-2 pl-10 pr-4 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#141414]"
              />
            </div>
          </div>
          
          <div className="divide-y divide-[#141414]">
            {scenarios.map((scenario) => (
              <motion.button
                key={scenario.id}
                onClick={() => setSelectedId(scenario.id)}
                className={`w-full text-left p-6 transition-colors hover:bg-[#DCDAD7] group relative ${selectedId === scenario.id ? 'bg-[#DCDAD7]' : ''}`}
                whileHover={{ x: 4 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-mono opacity-50">{scenario.id}</span>
                  {scenario.status === 'Classified' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </div>
                <h3 className="font-medium text-sm mb-2 group-hover:underline decoration-1 underline-offset-4">{scenario.title}</h3>
                <p className="text-xs opacity-60 line-clamp-2 font-serif italic">{scenario.description}</p>
                {selectedId === scenario.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#141414]" 
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Panel: Details & Classification */}
        <div className="lg:col-span-8 p-8 bg-[#F0EFED] overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedScenario ? (
              <motion.div
                key={selectedScenario.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#141414] text-[#E4E3E0] rounded-lg">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif italic">{selectedScenario.title}</h2>
                      <p className="text-[10px] font-mono opacity-50">STATUS: {selectedScenario.status.toUpperCase()}</p>
                    </div>
                  </div>
                  {selectedScenario.status === 'Classified' && (
                    <button 
                      className="flex items-center gap-2 px-4 py-2 border border-[#141414] rounded-md text-xs font-mono hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors"
                      onClick={() => {
                        setIsGeneratingReport(true);
                        setTimeout(() => setIsGeneratingReport(false), 2000);
                      }}
                    >
                      <Download className="w-4 h-4" />
                      {isGeneratingReport ? 'EXPORTING...' : 'EXPORT_DOC'}
                    </button>
                  )}
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-3 border-b border-[#141414]/10 pb-1">Description</h4>
                    <p className="text-sm leading-relaxed font-serif italic text-[#141414]/80">
                      {selectedScenario.description}
                    </p>
                  </section>

                  {selectedScenario.status === 'Pending' ? (
                    <div className="p-8 border-2 border-dashed border-[#141414]/20 rounded-xl flex flex-col items-center justify-center text-center bg-[#E4E3E0]/50">
                      <Lock className="w-8 h-8 opacity-20 mb-4" />
                      <h3 className="text-sm font-medium mb-2">Classification Required</h3>
                      <p className="text-xs opacity-50 mb-6 max-w-xs">Analyze the scenario and perform identification and severity classification to proceed.</p>
                      <button 
                        onClick={() => handleClassify(selectedScenario.id)}
                        className="px-6 py-3 bg-[#141414] text-[#E4E3E0] rounded-md text-xs font-mono tracking-widest hover:scale-105 transition-transform"
                      >
                        RUN_CLASSIFICATION_ENGINE
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-[#141414] rounded-lg bg-white/50">
                          <h4 className="text-[10px] font-mono uppercase opacity-50 mb-1">Incident Type</h4>
                          <p className="text-sm font-medium">{selectedScenario.type}</p>
                        </div>
                        <div className={`p-4 border rounded-lg ${getSeverityColor(selectedScenario.severity)}`}>
                          <h4 className="text-[10px] font-mono uppercase opacity-50 mb-1">Severity</h4>
                          <p className="text-sm font-bold tracking-widest">{selectedScenario.severity?.toUpperCase()}</p>
                        </div>
                      </div>

                      <section>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-3 border-b border-[#141414]/10 pb-1">Classification Reason</h4>
                        <ul className="space-y-3">
                          {selectedScenario.reason?.map((r, i) => (
                            <li key={i} className="flex gap-3 text-xs">
                              <ChevronRight className="w-4 h-4 shrink-0 opacity-30" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-3 border-b border-[#141414]/10 pb-1">Impact Area</h4>
                        <div className="flex items-center gap-3 p-4 border border-[#141414] rounded-lg bg-[#141414] text-[#E4E3E0]">
                          <Database className="w-5 h-5 opacity-50" />
                          <span className="text-xs font-mono tracking-tight">{selectedScenario.impactArea}</span>
                        </div>
                      </section>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <ShieldCheck className="w-16 h-16 mb-4" />
                <p className="font-serif italic">Select an incident from the queue to begin classification.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-[#141414] bg-[#141414] text-[#E4E3E0] p-2 px-6 flex justify-between items-center text-[10px] font-mono">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            SYSTEM_OPTIMAL
          </span>
          <span className="opacity-50">NODE_ID: IR-INTERN-01</span>
        </div>
        <div className="flex gap-4">
          <span>{new Date().toLocaleTimeString()}</span>
          <span className="opacity-50">© 2026 INCIDENT_RESPONSE_CORP</span>
        </div>
      </footer>
    </div>
  );
}
