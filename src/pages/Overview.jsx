import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock3,
  Globe2,
  Pause,
  Play,
  Radar,
  RefreshCw,
  Target,
  Workflow,
  Zap,
} from "lucide-react";
import { workflow } from "../data/mockData";
import {
  KPI,
  MiniChart,
  PanelTitle,
  SectionHeader,
  Status,
} from "../components/ui";

export default function Overview({
  alerts,
  replay,
  setReplay,
  time,
  setActive,
}) {
  return (
    <div className="page">
      <SectionHeader
        eyebrow="OPERATIONS / OVERVIEW"
        title="Command center"
        action={
          <div className="header-actions">
            <span className="live-indicator">
              <span className="pulse-dot" /> LIVE REPLAY
            </span>
            <button className="button secondary">
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        }
      />
      <div className="kpi-grid">
        <KPI
          label="Flows processed"
          value="2.84M"
          delta="+18.4%"
          tone="blue"
          icon={Activity}
        >
          <MiniChart color="#4aa3ff" />
        </KPI>
        <KPI
          label="Alerts · 24h"
          value="1,248"
          delta="+7.2%"
          tone="red"
          icon={AlertTriangle}
        >
          <div className="severity-bar">
            <i />
            <i />
            <i />
            <i />
          </div>
        </KPI>
        <KPI
          label="Open incidents"
          value="18"
          delta="+3"
          tone="orange"
          icon={Radar}
        >
          <MiniChart color="#f0883e" />
        </KPI>
        <KPI
          label="Pending approvals"
          value="5"
          delta="+2"
          tone="yellow"
          icon={CheckCircle2}
        >
          <MiniChart color="#d29922" />
        </KPI>
        <KPI label="MTTD" value="42s" delta="−18.6%" tone="green" icon={Zap}>
          <MiniChart color="#3fb950" />
        </KPI>
        <KPI
          label="MTTR"
          value="8m 14s"
          delta="−12.1%"
          tone="purple"
          icon={Clock3}
        >
          <MiniChart color="#b48cff" />
        </KPI>
      </div>
      <div className="dashboard-grid top-grid">
        <LiveTraffic />
        <Distribution />
        <TopTalkers />
      </div>
      <div className="dashboard-grid bottom-grid">
        <RecentAlerts alerts={alerts} setActive={setActive} />
        <ReplayCard replay={replay} setReplay={setReplay} time={time} />
        <PipelineHealth />
      </div>
    </div>
  );
}

function LiveTraffic() {
  return (
    <section className="panel traffic-panel">
      <PanelTitle
        icon={Activity}
        title="Live telemetry"
        meta="rolling 5 minutes"
        action={
          <div className="chart-legend">
            <span>
              <i className="legend-line cyan" /> flows/sec
            </span>
            <span>
              <i className="legend-line orange" /> alerts/sec
            </span>
          </div>
        }
      />
      <div className="hero-chart">
        <div className="y-labels">
          <span>120</span>
          <span>80</span>
          <span>40</span>
          <span>0</span>
        </div>
        <svg viewBox="0 0 640 190" preserveAspectRatio="none">
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#2bc7a7" stopOpacity=".3" />
              <stop offset="1" stopColor="#2bc7a7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="gridline"
            d="M0 20H640 M0 70H640 M0 120H640 M0 170H640"
          />
          <path
            d="M0 153 C35 140 42 150 72 120 S112 141 140 98 S180 110 214 77 S250 102 282 85 S320 94 352 49 S390 92 422 62 S462 68 498 38 S548 71 580 32 S610 55 640 20 V190 H0Z"
            fill="url(#area)"
          />
          <path
            className="flow-line"
            d="M0 153 C35 140 42 150 72 120 S112 141 140 98 S180 110 214 77 S250 102 282 85 S320 94 352 49 S390 92 422 62 S462 68 498 38 S548 71 580 32 S610 55 640 20"
          />
          <path
            className="alert-line"
            d="M0 174 C38 168 58 176 91 160 S120 170 150 153 S185 168 218 144 S250 164 287 148 S326 156 357 132 S390 159 420 125 S465 150 500 112 S544 145 576 106 S610 118 640 94"
          />
        </svg>
      </div>
      <div className="chart-footer">
        <span>10:37</span>
        <span>10:42</span>
        <b>
          <span className="pulse-dot" /> ingesting from
          Friday-Afternoon-PortScan
        </b>
      </div>
    </section>
  );
}

function Distribution() {
  return (
    <section className="panel">
      <PanelTitle
        icon={Target}
        title="Attack distribution"
        meta="1,248 alerts"
      />
      <div className="donut-wrap">
        <div className="donut">
          <div>
            <strong>82%</strong>
            <span>attacks</span>
          </div>
        </div>
        <div className="donut-legend">
          <LegendRow label="Reconnaissance" value="32%" color="#4aa3ff" />
          <LegendRow label="Denial of service" value="27%" color="#f85149" />
          <LegendRow label="Brute force" value="18%" color="#f0883e" />
          <LegendRow label="Web attacks" value="13%" color="#d29922" />
          <LegendRow label="Other" value="10%" color="#708097" />
        </div>
      </div>
    </section>
  );
}
function LegendRow({ label, value, color }) {
  return (
    <div className="legend-row">
      <i style={{ background: color }} /> <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
function TopTalkers() {
  return (
    <section className="panel">
      <PanelTitle icon={Globe2} title="Top source IPs" meta="by alert volume" />
      <div className="talkers">
        {[
          ["172.16.0.1", 286, "Kali / external"],
          ["205.174.165.68", 184, "public edge"],
          ["192.168.10.14", 92, "Windows client"],
          ["192.168.10.50", 61, "web server"],
          ["192.168.10.19", 43, "Ubuntu host"],
        ].map(([ip, count, label], index) => (
          <div className="talker" key={ip}>
            <span className="rank">0{index + 1}</span>
            <div className="talker-name">
              <b>{ip}</b>
              <small>{label}</small>
            </div>
            <div className="talker-bar">
              <i style={{ width: `${count / 2.86}%` }} />
            </div>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
function RecentAlerts({ alerts, setActive }) {
  return (
    <section className="panel recent-panel">
      <PanelTitle
        icon={Bell}
        title="Latest alerts"
        meta="updated just now"
        action={
          <button className="text-button" onClick={() => setActive("Alerts")}>
            View all <ArrowUpRight size={14} />
          </button>
        }
      />
      <div className="mini-table">
        {alerts.slice(0, 5).map((alert) => (
          <div className="mini-row" key={alert.id}>
            <span className={`severity ${alert.sev}`}>{alert.sev}</span>
            <b>{alert.label}</b>
            <span className="mono">{alert.src.split(":")[0]}</span>
            <span className="muted">{alert.time}</span>
            <Status status={alert.status} />
          </div>
        ))}
      </div>
    </section>
  );
}
function ReplayCard({ replay, setReplay, time }) {
  return (
    <section className="panel replay-panel">
      <PanelTitle
        icon={Play}
        title="Replay engine"
        meta="CIC-IDS-2017"
        action={
          <span className="status-tag">
            <i className="status-dot green" /> running
          </span>
        }
      />
      <div className="replay-day">
        <div>
          <span>ACTIVE DATASET</span>
          <strong>Friday-Afternoon-PortScan</strong>
        </div>
        <button
          className="icon-button small"
          onClick={() => setReplay(!replay)}
        >
          {replay ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
      <div className="progress-track">
        <i style={{ width: "68%" }} />
      </div>
      <div className="replay-meta">
        <span>68.4% complete</span>
        <span>10:42:18 UTC</span>
      </div>
      <div className="replay-stats">
        <div>
          <span>Throughput</span>
          <b>
            4,280 <small>flows/s</small>
          </b>
        </div>
        <div>
          <span>Speed</span>
          <b>100×</b>
        </div>
        <div>
          <span>Cursor</span>
          <b>{time.toLocaleTimeString()}</b>
        </div>
      </div>
    </section>
  );
}
function PipelineHealth() {
  return (
    <section className="panel pipeline-panel">
      <PanelTitle
        icon={Workflow}
        title="Agent pipeline health"
        meta="15 steps"
        action={
          <span className="status-tag">
            <i className="status-dot green" /> 13 healthy
          </span>
        }
      />
      <div className="pipeline-pills">
        {workflow.map(([name, status, step]) => (
          <div className={`pipeline-pill ${status}`} key={step}>
            <span>{step}</span>
            <b>{name}</b>
            <i />
          </div>
        ))}
      </div>
    </section>
  );
}
