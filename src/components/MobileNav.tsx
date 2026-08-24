import { Link, useLocation } from 'react-router-dom'
import { Home, Layers, Briefcase, Building2, Mail } from 'lucide-react'

/* Mirrors the desktop header: capabilities, work, industries, contact. */
const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Capabilities', href: '/capabilities', icon: Layers },
  { name: 'Work', href: '/work', icon: Briefcase },
  { name: 'Industries', href: '/industries', icon: Building2 },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export default function MobileNav() {
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white shadow-lg rounded-t-[20px] border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                active
                  ? 'text-[#0050a9]'
                  : 'text-gray-500 hover:text-[#0050a9]'
              }`}
            >
              <item.icon
                className={`w-5 h-5 mb-1 ${
                  active ? 'stroke-[2.5]' : 'stroke-[1.5]'
                }`}
              />
              <span
                className={`text-xs ${
                  active ? 'font-semibold' : 'font-medium'
                }`}
              >
                {item.name}
              </span>
              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#0050a9]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
