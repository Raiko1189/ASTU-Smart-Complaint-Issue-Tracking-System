import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { HiOutlineBars3, HiOutlineSun, HiOutlineMoon, HiOutlineArrowRightOnRectangle, HiOutlineBell } from 'react-icons/hi2'

export default function Topbar({ onMenuClick }) {
    const { user, logout } = useAuth()
    const { darkMode, toggleDarkMode } = useTheme()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const roleBadge = user?.role === 'admin'
        ? <span className="inline-flex ml-3 items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30">ADMIN PORTAL</span>
        : user?.role === 'category_staff'
            ? <span className="inline-flex ml-3 items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">STAFF PORTAL</span>
            : <span className="inline-flex ml-3 items-center px-2 py-0.5 rounded text-xs font-bold bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-400 border border-primary-200 dark:border-primary-500/30">STUDENT PORTAL</span>

    return (
        <header className="h-20 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                >
                    <HiOutlineBars3 className="w-6 h-6" />
                </button>
                <div className="hidden sm:block">
                    <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center">
                        Dashboard Overview {roleBadge}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">Welcome back, {user?.name?.split(' ')[0]}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-all relative group"
                    title="Notifications"
                >
                    <HiOutlineBell className="w-5 h-5 group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
                    {user?.role !== 'admin' && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0a0a]"></span>}
                </button>

                <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>

                <button
                    onClick={toggleDarkMode}
                    className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {darkMode ? (
                        <HiOutlineSun className="w-5 h-5 text-amber-500" />
                    ) : (
                        <HiOutlineMoon className="w-5 h-5" />
                    )}
                </button>

                <button
                    onClick={handleLogout}
                    className="p-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors ml-1"
                    title="Logout"
                >
                    <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                </button>
            </div>
        </header>
    )
}
