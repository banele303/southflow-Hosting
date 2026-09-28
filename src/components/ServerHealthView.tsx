import React from 'react';
import { 
  Server, Activity, ShieldCheck, Cpu, HardDrive, 
  Wifi, Zap, CheckCircle2, Clock, Globe 
} from 'lucide-react';

export const ServerHealthView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">All Systems Operational</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Teraco Tier-3 Datacenter Cluster Status
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Hosting 15 production websites across high-availability redundant clusters in Isando (Johannesburg) and Rondebosch (Cape Town).
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex-shrink-0">
          <div className="text-center px-2">
            <div className="text-2xl font-black text-emerald-400">99.98%</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">90-Day Uptime SLA</div>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div className="text-center px-2">
            <div className="text-2xl font-black text-indigo-400">4.2 ms</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">NAPAfrica JHB Ping</div>
          </div>
        </div>
      </div>

      {/* Datacenter Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Node 1: Johannesburg Teraco JB1 */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Node ZA-JHB-01 (Primary)</h3>
                <p className="text-xs text-slate-400">Teraco JB1, Isando, Johannesburg</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              Operational
            </span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> AMD EPYC™ 9654 (64-Core)</span>
                <span className="font-mono text-white">24% Load</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> DDR5 ECC RAM (256 GB)</span>
                <span className="font-mono text-white">38% Used (97.2 GB)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> NVMe Gen4 Enterprise (4 TB RAID10)</span>
                <span className="font-mono text-white">41% Allocated</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '41%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl text-slate-400 text-xs flex justify-between border border-slate-800">
            <span>Hosted Sites on Node:</span>
            <span className="font-bold text-white">9 Websites (incl. Glenanda Hotel, Elijah Church)</span>
          </div>
        </div>

        {/* Node 2: Cape Town Teraco CT1 */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Node ZA-CPT-01 (Secondary)</h3>
                <p className="text-xs text-slate-400">Teraco CT1, Rondebosch, Cape Town</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              Operational
            </span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> AMD EPYC™ 9654 (64-Core)</span>
                <span className="font-mono text-white">19% Load</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '19%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> DDR5 ECC RAM (256 GB)</span>
                <span className="font-mono text-white">31% Used (79.3 GB)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '31%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> NVMe Gen4 Enterprise (4 TB RAID10)</span>
                <span className="font-mono text-white">35% Allocated</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl text-slate-400 text-xs flex justify-between border border-slate-800">
            <span>Hosted Sites on Node:</span>
            <span className="font-bold text-white">6 Websites (incl. Cape Vineyard, Zambezi)</span>
          </div>
        </div>

      </div>

      {/* Latency Benchmarks */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-base">South African Regional Network Latencies (Anycast DNS)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block mb-1">Johannesburg (JHB)</span>
            <span className="font-mono text-emerald-400 text-lg font-bold">3.8 ms</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block mb-1">Pretoria (PTA)</span>
            <span className="font-mono text-emerald-400 text-lg font-bold">5.1 ms</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block mb-1">Cape Town (CPT)</span>
            <span className="font-mono text-emerald-400 text-lg font-bold">14.6 ms</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block mb-1">Durban (DBN)</span>
            <span className="font-mono text-emerald-400 text-lg font-bold">11.2 ms</span>
          </div>
        </div>
      </div>

    </div>
  );
};
