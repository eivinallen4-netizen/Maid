'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    items: [
      { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
      { label: 'Leads', href: '/admin/leads' },
      { label: 'Schedule', href: '/admin/schedule' },
      { label: 'Users', href: '/admin/users' },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-[#1a4d3e] border-r border-[#0d2818] flex flex-col shrink-0 h-screen">
      <div className="p-4 border-b border-[#0d2818]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ff6b35] rounded-lg flex items-center justify-center text-white shadow-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
              <polyline points="13 2 13 9 20 9" />
              <path d="M9 13h6M9 17h6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Mountain Springs</div>
            <div className="text-xs text-gray-300">Premium Cleaning</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {navItems.map((group, idx) => (
          <ul key={idx} className="space-y-2">
            {group.items.map((item) => {
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-gray-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex-1">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        ))}
      </nav>

      <div className="p-4 border-t border-[#0d2818]">
        <div className="text-xs text-gray-300 space-y-0.5">
          <div className="font-medium">Las Vegas, NV</div>
          <div className="text-gray-400">Premium Cleaning Service</div>
        </div>
      </div>
    </aside>
  )
}
