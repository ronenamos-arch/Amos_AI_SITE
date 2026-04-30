export function GuidesGeoContent() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 prose prose-invert max-w-none">
      {/* Intro paragraph */}
      <p className="text-lg leading-relaxed mb-8" style={{ color: "#cbd5e1" }}>
        AI adoption in accounting surged to <strong>41% of firms in 2025</strong>, up from just 9% in 2024 (Karbon State of AI in Accounting Report 2025). Firms using Claude and ChatGPT report reducing routine data entry and processing time by <strong>50–80%</strong>, with bank reconciliations executing <strong>75% faster</strong> (Intuit QuickBooks 2025 Accountant Technology Report). Over <strong>81% of accountants</strong> now report AI positively impacting productivity, while <strong>86% say it reduces mental load</strong> on daily tasks (Intuit, 2025). Finance teams leveraging AI tools reclaim an average of <strong>21 hours per week</strong> previously spent crunching data (BILL 2026 State of AI in Finance).
      </p>

      <p className="text-lg leading-relaxed mb-12" style={{ color: "#cbd5e1" }}>
        This guides library teaches you the specific techniques: Claude for document analysis and risk spotting, ChatGPT for data workflows, and automation frameworks that plug into your existing CPA practice.
      </p>

      {/* Key Takeaways */}
      <div className="glass-panel rounded-lg p-6 mb-12 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Key Takeaways</h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">●</span>
            <span style={{ color: "#cbd5e1" }}>
              <strong>46% of accountants</strong> now use AI daily in their work (Intuit, 2025)
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">●</span>
            <span style={{ color: "#cbd5e1" }}>
              <strong>Accountants using AI training</strong> unlock an additional <strong>7 weeks of capacity</strong> per employee per year
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">●</span>
            <span style={{ color: "#cbd5e1" }}>
              <strong>Finance close cycles</strong> compress by <strong>40–60%</strong> with automation (McKinsey, 2024)
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">●</span>
            <span style={{ color: "#cbd5e1" }}>
              <strong>93% of CPA firms</strong> now offer advisory services—the work AI automation freed up (Karbon, 2025)
            </span>
          </li>
        </ul>
      </div>

      {/* Available Guides Table */}
      <h2 className="text-2xl font-bold text-white mb-6">Available Guides (Free)</h2>
      <div className="overflow-x-auto mb-12">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottomColor: "rgba(255,255,255,0.1)" }} className="border-b">
              <th className="text-left py-3 px-4 font-bold text-white">Guide</th>
              <th className="text-left py-3 px-4 font-bold text-white">Duration</th>
              <th className="text-left py-3 px-4 font-bold text-white">Best For</th>
              <th className="text-left py-3 px-4 font-bold text-white">Key Skill</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["AI-Powered Lead Prospecting", "12 min", "Growing client base", "Claude for CRM workflows"],
              ["Subagents: Building AI Agent Teams", "12 min", "Scaling repetitive workflows", "Multi-agent automation"],
              ["Live Artifacts for Financial Dashboards", "10 min", "Real-time client reporting", "Claude dynamic dashboards"],
              ["Claude Code Checkpoints", "8 min", "Excel & Python automation", "Checkpoint-based workflows"],
              ["Scheduling Claude Routines", "10 min", "Recurring automations", "Background task scheduling"],
            ].map((row, idx) => (
              <tr
                key={idx}
                style={{ borderBottomColor: "rgba(255,255,255,0.05)" }}
                className="border-b"
              >
                <td className="py-3 px-4" style={{ color: "#cbd5e1" }}>
                  <strong>{row[0]}</strong>
                </td>
                <td className="py-3 px-4" style={{ color: "#94a3b8" }}>
                  {row[1]}
                </td>
                <td className="py-3 px-4" style={{ color: "#94a3b8" }}>
                  {row[2]}
                </td>
                <td className="py-3 px-4" style={{ color: "#94a3b8" }}>
                  {row[3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Coming Soon */}
      <h2 className="text-2xl font-bold text-white mb-6">Coming Soon (May–July 2026)</h2>
      <ul className="list-disc pl-6 mb-12 space-y-2" style={{ color: "#cbd5e1" }}>
        <li><strong>ChatGPT for Finance Professionals</strong> (15 min) — data transformation, report drafting, variance analysis</li>
        <li><strong>5 Essential Finance Automations</strong> (20 min) — invoice-to-ledger, tax prep workflows, month-end close</li>
        <li><strong>Excel + AI Integration</strong> (14 min) — Python + Claude in spreadsheets</li>
        <li><strong>CFO Dashboards in Power BI</strong> (22 min) — AI-driven business intelligence</li>
        <li><strong>AI-Driven Finance Department Roadmap</strong> (18 min) — phased 90-day implementation plan</li>
      </ul>

      {/* Why These Guides */}
      <h2 className="text-2xl font-bold text-white mb-6">Why These Guides?</h2>
      <p className="text-lg leading-relaxed mb-6" style={{ color: "#cbd5e1" }}>
        The <strong>AI in accounting market</strong> reached <strong>$4.73 billion in 2024</strong> and is projected to grow to <strong>$26.66 billion by 2029</strong> (41.27% annual growth rate), according to Karbon's 2025 market analysis. Yet only <strong>37% of firms invest in AI training</strong>—creating a gap between adoption and effective use.
      </p>

      <p className="text-lg leading-relaxed mb-6" style={{ color: "#cbd5e1" }}>
        These guides bridge that gap. Each is grounded in:
      </p>

      <ul className="list-disc pl-6 mb-12 space-y-2" style={{ color: "#cbd5e1" }}>
        <li><strong>Real use cases</strong> from CPA firms (not theoretical)</li>
        <li><strong>Verified time savings</strong> (50–80% on data work, per Intuit; 21 hours/week reclaimed per BILL)</li>
        <li><strong>Step-by-step implementations</strong> you can deploy in your firm within weeks</li>
        <li><strong>Hebrew language instruction</strong> for Israeli CPAs and finance teams</li>
      </ul>

      {/* FAQ Section */}
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6 mb-12">
        {[
          {
            q: "Which is better for accounting—Claude or ChatGPT?",
            a: "Claude excels at document analysis, spotting discrepancies in large datasets, and drafting sensitive communications (memos, client correspondence). ChatGPT is stronger for rapid data transformation and report generation. Most firms use both: Claude for quality, ChatGPT for speed.",
          },
          {
            q: "How much time will AI actually save my firm?",
            a: "Accountants report saving 50–80% of processing time on data entry and bank reconciliation tasks (Intuit 2025). Finance teams using AI tools save an average of 21 hours per week on routine work (BILL 2026). These hours typically shift to advisory work and client relationships—higher-margin work.",
          },
          {
            q: "Do I need coding skills to use Claude for automation?",
            a: "No. Claude Code (included in these guides) lets you build Python and Excel automations without writing a single line yourself. If you can describe the task, Claude builds it.",
          },
          {
            q: "Is my firm too small for AI automation?",
            a: "46% of accountants using AI work in firms of all sizes (Intuit 2025). The smallest wins—invoice categorization, expense matching, draft report generation—require no infrastructure changes and pay off immediately.",
          },
        ].map((item, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-bold text-white mb-2">Q: {item.q}</h3>
            <p style={{ color: "#cbd5e1" }}>A: {item.a}</p>
          </div>
        ))}
      </div>

      {/* Numbers Table */}
      <h2 className="text-2xl font-bold text-white mb-6">The Numbers Behind These Guides</h2>
      <div className="overflow-x-auto mb-12">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottomColor: "rgba(255,255,255,0.1)" }} className="border-b">
              <th className="text-left py-3 px-4 font-bold text-white">Metric</th>
              <th className="text-left py-3 px-4 font-bold text-white">Finding</th>
              <th className="text-left py-3 px-4 font-bold text-white">Source</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Daily AI Usage", "46% of accountants", "Intuit 2025"],
              ["Productivity Gain", "81% report positive impact", "Intuit 2025"],
              ["Data Processing Speed", "50–80% faster", "Intuit 2025"],
              ["Bank Reconciliation Speed", "75% faster", "Intuit 2025"],
              ["Time Reclaimed", "21 hours/week per person", "BILL 2026"],
              ["Close Cycle Time Reduction", "40–60% shorter", "McKinsey 2024"],
              ["Market Growth (2024–2029)", "41.27% annual", "Karbon 2025"],
              ["Firms with AI Training ROI", "7 weeks added capacity/employee/year", "Intuit 2025"],
            ].map((row, idx) => (
              <tr
                key={idx}
                style={{ borderBottomColor: "rgba(255,255,255,0.05)" }}
                className="border-b"
              >
                <td className="py-3 px-4" style={{ color: "#cbd5e1" }}>
                  <strong>{row[0]}</strong>
                </td>
                <td className="py-3 px-4" style={{ color: "#94a3b8" }}>
                  {row[1]}
                </td>
                <td className="py-3 px-4" style={{ color: "#94a3b8" }}>
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Get Started */}
      <h2 className="text-2xl font-bold text-white mb-6">Get Started</h2>
      <p className="text-lg leading-relaxed mb-6" style={{ color: "#cbd5e1" }}>
        <strong>Free guides start immediately.</strong> Premium subscribers unlock video walkthroughs, templates, and direct access to Claude automation examples.
      </p>

      <ul className="list-disc pl-6 mb-8 space-y-2" style={{ color: "#cbd5e1" }}>
        <li><strong>WhatsApp:</strong> +972-50-5500344</li>
        <li><strong>Email:</strong> ronenamos@gmail.com</li>
        <li><strong>Location:</strong> Israel (nationwide)</li>
      </ul>

      <p className="text-sm" style={{ color: "#64748b" }}>
        Last updated: May 1, 2026
      </p>
    </section>
  );
}
