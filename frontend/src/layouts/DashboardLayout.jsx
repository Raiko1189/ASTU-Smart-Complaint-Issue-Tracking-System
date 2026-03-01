import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useState } from 'react'

export default function DashboardLayout() {
    const { user, loading } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0a0a0a] font-sans selection:bg-primary-500/30">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden relative z-0">
                {/* Subtle background glow for the main content area */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary-400/5 dark:bg-primary-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen -z-10 translate-x-1/3 -translate-y-1/3"></div>

                <Topbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 scrollbar-styled relative z-10">
                    <div className="max-w-7xl mx-auto animate-slide-up pb-20">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
