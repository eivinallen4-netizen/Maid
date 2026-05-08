'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    section: 'OPERATIONS',
    items: [
      { label: 'Quotes', href: '/quotes', badge: 8 },
      { label: 'Reps', href: '/reps' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Jobs', href: '/jobs', badge: 4 },
      { label: 'Schedule', href: '/schedule' },
    ]
  },
  {
    section: 'CONFIGURATION',
    items: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Business', href: '/business' },
      { label: 'Add-ons', href: '/addons' },
      { label: 'Email', href: '/email' },
      { label: 'Leads', href: '/leads', badge: 12 },
      { label: 'Users', href: '/users' },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-[#0f1117] border-r border-[#2a2d3e] flex flex-col shrink-0 h-screen">
      <div className="p-4 border-b border-[#2a2d3e]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#00d4aa] rounded-lg flex items-center justify-center text-[#0f1117]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zm-9-1a2 2 0 014 0v1h-4V6zm8 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v10z"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">PureBin LV</div>
            <div className="text-xs text-gray-500">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {navItems.map((group) => (
          <div key={group.section}>
            <div className="text-[10px] font-semibold text-gray-600 tracking-widest mb-2 px-2">{group.section}</div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? 'bg-[#00d4aa15] text-[#00d4aa] border border-[#00d4aa30]'
                          : 'text-gray-400 hover:text-white hover:bg-[#1a1d2e]'
                      }`}
                    >
                      <span className="flex-1">{item.label}</span>
                      {'badge' in item && item.badge && (
                        <span className={`text-xs px-1.5 py-0.5 rounded font-semibold min-w-[20px] text-center ${
                          active ? 'bg-[#00d4aa] text-[#0f1117]' : 'bg-[#1a1d2e] text-gray-400 border border-[#2a2d3e]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-[#2a2d3e]">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset DB
        </button>
        <p className="text-[10px] text-gray-600 px-3 mt-0.5">Restore demo data</p>
      </div>
    </aside>
  )
}
