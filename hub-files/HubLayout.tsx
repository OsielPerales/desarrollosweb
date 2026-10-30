import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, FileText, Users, Settings, Megaphone, Radar,
    LogOut, Globe, Menu, X, ChevronLeft, BarChart2, MessageSquare,
} from 'lucide-react'
import { auth } from '../lib/firebase'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'

const navItems = [
    { path: '/hub',              label: 'Pipeline CRM',  icon: LayoutDashboard },
    { path: '/hub/cotizaciones', label: 'Cotizaciones',  icon: FileText        },
    { path: '/hub/clientes',     label: 'Contactos',     icon: Users           },
    { path: '/hub/inbox',        label: 'Inbox',         icon: MessageSquare   },
    { path: '/hub/prospector',   label: 'Prospector',    icon: Radar           },
    { path: '/hub/campanas',     label: 'Campañas',      icon: Megaphone       },
    { path: '/hub/analitica',    label: 'Analítica',     icon: BarChart2       },
    { path: '/hub/config',       label: 'Configuración', icon: Settings        },
]

export function HubLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            if (!currentUser) {
                navigate('/hub/login')
            }
        })
        return () => unsubscribe()
    }, [navigate])

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            navigate('/hub/login')
        } catch (error) {
            console.error("Error al cerrar sesión", error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex bg-cream text-graphite">

            {/* ── Sidebar ── */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-graphite/8 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Logo */}
                <div className="p-4 border-b border-graphite/8 flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <span className="font-serif text-sm text-graphite leading-none block">HUB Cognitivo</span>
                        <span className="text-[10px] text-graphite/40 font-mono">Desarrollos Elaborados</span>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive
                                    ? 'bg-orange/10 text-orange font-medium'
                                    : 'text-graphite/60 hover:bg-graphite/5 hover:text-graphite'}`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="p-2 border-t border-graphite/8 space-y-0.5">
                    <div className="px-3 py-2 text-xs text-graphite/40 font-mono mb-2 truncate" title={user?.email || ''}>
                        {user?.email}
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500/70 hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                    </button>
                    <a
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-graphite/50 hover:bg-graphite/5 hover:text-graphite transition-all"
                    >
                        <Globe className="w-4 h-4" />
                        Sitio principal
                    </a>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ── Main ── */}
            <div className="flex-1 lg:ml-60">
                {/* Top bar */}
                <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-md border-b border-graphite/5 h-14 flex items-center px-4 lg:px-8 gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-graphite/5 transition-colors"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <a href="/" className="hidden lg:flex items-center gap-1 text-xs text-graphite/40 hover:text-graphite transition-colors">
                        <ChevronLeft className="w-3 h-3" />
                        Volver a inicio
                    </a>
                    <div className="ml-auto text-xs text-graphite/40 font-mono">
                        {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
