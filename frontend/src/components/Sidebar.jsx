import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    HiOutlineHome, HiOutlineDocumentText, HiOutlinePlusCircle,
    HiOutlineUsers, HiOutlineTag, HiOutlineChartBar,
    HiOutlineChatBubbleLeftRight, HiOutlineXMark, HiOutlineClipboardDocumentList,
    HiOutlineAcademicCap
} from 'react-icons/hi2'

const studentLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { to: '/complaints/new', label: 'Submit Complaint', icon: HiOutlinePlusCircle },
    { to: '/complaints', label: 'My Complaints', icon: HiOutlineDocumentText },
    { to: '/chatbot', label: 'AI Assistant', icon: HiOutlineChatBubbleLeftRight },
]

const staffLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { to: '/complaints/assigned', label: 'Assigned Complaints', icon: HiOutlineClipboardDocumentList },
    { to: '/complaints/all', label: 'All Complaints', icon: HiOutlineDocumentText },
]

const adminLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { to: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
    { to: '/complaints/all', label: 'All Complaints', icon: HiOutlineDocumentText },
    { to: '/users', label: 'Manage Users', icon: HiOutlineUsers },
    { to: '/categories', label: 'Categories', icon: HiOutlineTag },
    { to: '/knowledge', label: 'Knowledge Base', icon: HiOutlineAcademicCap },
]

export default function Sidebar({ open, onClose }) {
    const { user } = useAuth()

    const links = user?.role === 'admin' ? adminLinks
        : user?.role === 'category_staff' ? staffLinks
            : studentLinks

    const roleLabel = user?.role === 'admin' ? 'Administrator'
        : user?.role === 'category_staff' ? 'Category Staff'
            : 'Student'

    const roleColor = user?.role === 'admin' ? 'bg-red-500 shadow-red-500/50'
        : user?.role === 'category_staff' ? 'bg-amber-500 shadow-amber-500/50'
            : 'bg-primary-500 shadow-primary-500/50'

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-72 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl border-r border-slate-200/50 dark:border-white/5
                flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${open ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="h-20 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-glow">
                            <span className="text-white font-display font-bold text-lg">AS</span>
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                            ASTU Smart
                        </span>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <HiOutlineXMark className="w-6 h-6" />
                    </button>
                </div>

                {/* User info */}
                <div className="px-6 py-4 mx-4 mb-4 mt-2 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shadow-sm">
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate text-slate-900 dark:text-white tracking-wide">{user?.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`w-2 h-2 rounded-full shadow-sm ${roleColor}`} />
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{roleLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 scrollbar-styled">
                    <div className="px-4 mb-3">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Main Menu</p>
                    </div>
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 dark:bg-primary-500 rounded-r-full" />}
                                    <link.icon className={`w-6 h-6 flex-shrink-0 transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white'}`} />
                                    {link.label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-6 py-6 mt-auto">
                    <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-500/5 rounded-xl border border-primary-100/50 dark:border-primary-500/10 cursor-pointer hover:bg-primary-100/50 dark:hover:bg-primary-500/10 transition-colors">
                        <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
                            <HiOutlineChatBubbleLeftRight className="w-6 h-6" />
                            <span className="text-sm font-bold">Help Center</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
