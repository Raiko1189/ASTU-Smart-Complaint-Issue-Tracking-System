import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { LoadingSkeleton, StatusBadge, PageHeader } from '../components/UI'
import {
    HiOutlineDocumentText, HiOutlineClock, HiOutlineCheckCircle,
    HiOutlinePlusCircle, HiOutlineExclamationCircle, HiOutlineArrowRight
} from 'react-icons/hi2'

function StudentDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ['myComplaints'],
        queryFn: () => api.get('/complaints/my?limit=5').then(r => r.data.data),
    })

    if (isLoading) return <LoadingSkeleton count={3} />

    const complaints = data?.complaints || []
    const total = data?.pagination?.total || 0
    const open = complaints.filter(c => c.status === 'Open').length
    const inProgress = complaints.filter(c => c.status === 'In Progress').length
    const resolved = complaints.filter(c => c.status === 'Resolved').length

    return (
        <>
            <PageHeader title="Overview" subtitle="Track and manage your complaints effectively" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard icon={HiOutlineDocumentText} label="Total Submitted" value={total} color="primary" delay="0ms" />
                <StatCard icon={HiOutlineExclamationCircle} label="Awaiting Action" value={open} color="blue" delay="100ms" />
                <StatCard icon={HiOutlineClock} label="In Progress" value={inProgress} color="amber" delay="200ms" />
                <StatCard icon={HiOutlineCheckCircle} label="Resolved" value={resolved} color="emerald" delay="300ms" />
            </div>

            <div className="flex items-center justify-between mb-6 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Recent Feedback</h2>
                <Link to="/complaints/new" className="btn-primary flex items-center gap-2 text-sm shadow-glow">
                    <HiOutlinePlusCircle className="w-5 h-5" />
                    <span>New Complaint</span>
                </Link>
            </div>

            {complaints.length === 0 ? (
                <div className="card p-12 text-center animate-slide-up border-dashed" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiOutlineDocumentText className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-700 dark:text-slate-300 mb-2">No history found</h3>
                    <p className="text-slate-500 font-medium">You haven't submitted any complaints yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {complaints.map((complaint, index) => (
                        <Link key={complaint._id} to={`/complaints/${complaint._id}`} className="card-hover block p-5 sm:p-6 group animate-slide-up" style={{ animationDelay: `${500 + index * 100}ms`, animationFillMode: 'both' }}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0 pr-4 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-slate-200 dark:bg-white/10 group-hover:bg-primary-500 transition-colors"></div>
                                    <div className="pl-4">
                                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white truncate mb-1">{complaint.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mb-3 font-medium">{complaint.description}</p>
                                        <div className="flex flex-wrap items-center gap-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 uppercase tracking-wider">{complaint.category?.name}</span>
                                            <span className="inline-flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pl-4 sm:pl-0">
                                    <StatusBadge status={complaint.status} />
                                    <HiOutlineArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}

function StaffDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ['assignedComplaints'],
        queryFn: () => api.get('/complaints/assigned?limit=10').then(r => r.data.data),
    })

    if (isLoading) return <LoadingSkeleton count={3} />

    const complaints = data?.complaints || []
    const total = data?.pagination?.total || 0

    return (
        <>
            <PageHeader title="Staff Area" subtitle="Manage and resolve your assigned complaints" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <StatCard icon={HiOutlineDocumentText} label="Assigned to Me" value={total} color="primary" delay="0ms" />
                <StatCard icon={HiOutlineClock} label="In Progress" value={complaints.filter(c => c.status === 'In Progress').length} color="amber" delay="100ms" />
                <StatCard icon={HiOutlineCheckCircle} label="Resolved" value={complaints.filter(c => c.status === 'Resolved').length} color="emerald" delay="200ms" />
            </div>

            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>Assigned Complaints</h2>

            {complaints.length === 0 ? (
                <div className="card p-12 text-center animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiOutlineCheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-700 dark:text-slate-300 mb-2">All caught up!</h3>
                    <p className="text-slate-500 font-medium">No complaints are currently assigned to you.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {complaints.map((complaint, index) => (
                        <Link key={complaint._id} to={`/complaints/${complaint._id}`} className="card-hover block p-5 sm:p-6 group animate-slide-up" style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: 'both' }}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0 pr-4 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-slate-200 dark:bg-white/10 group-hover:bg-primary-500 transition-colors"></div>
                                    <div className="pl-4">
                                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white truncate mb-1">{complaint.title}</h3>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Reported by: <span className="text-slate-900 dark:text-slate-200">{complaint.studentId?.name}</span></p>
                                        <div className="flex flex-wrap items-center gap-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 uppercase tracking-wider">{complaint.category?.name}</span>
                                            <span className="inline-flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pl-4 sm:pl-0">
                                    <StatusBadge status={complaint.status} />
                                    <HiOutlineArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}

function AdminDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ['analytics'],
        queryFn: () => api.get('/analytics').then(r => r.data.data),
    })

    if (isLoading) return <LoadingSkeleton count={4} />

    return (
        <>
            <PageHeader title="Command Center" subtitle="Complete system overview and health metrics" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard icon={HiOutlineDocumentText} label="Total Volume" value={data?.totalComplaints || 0} color="primary" delay="0ms" />
                <StatCard icon={HiOutlineExclamationCircle} label="Awaiting Action" value={data?.open || 0} color="blue" delay="100ms" />
                <StatCard icon={HiOutlineClock} label="Being Processed" value={data?.inProgress || 0} color="amber" delay="200ms" />
                <StatCard icon={HiOutlineCheckCircle} label="Resolution Rate" value={`${data?.resolutionRate || 0}%`} color="emerald" delay="300ms" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card p-8 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                        <Link to="/complaints/all" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors group border border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary-100 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 rounded-xl flex items-center justify-center">
                                    <HiOutlineDocumentText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">View Inbox</p>
                                    <p className="text-xs text-slate-500 font-medium">Browse all complaints</p>
                                </div>
                            </div>
                            <HiOutlineArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
                        </Link>

                        <Link to="/analytics" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors group border border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                                    <HiOutlineCheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">Analytics</p>
                                    <p className="text-xs text-slate-500 font-medium">Explore system data</p>
                                </div>
                            </div>
                            <HiOutlineArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                        </Link>

                        <Link to="/users" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors group border border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 rounded-xl flex items-center justify-center">
                                    <HiOutlineClock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">Access Control</p>
                                    <p className="text-xs text-slate-500 font-medium">Manage permissions</p>
                                </div>
                            </div>
                            <HiOutlineArrowRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transition-colors" />
                        </Link>
                    </div>
                </div>

                <div className="card p-8 animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6">Recent Activity Highlights</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-lg">{data?.recentCount || 0}</p>
                                <p className="text-sm text-slate-500 font-medium">New complaints generated this week, requiring attention.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-lg">{data?.resolved || 0}</p>
                                <p className="text-sm text-slate-500 font-medium">Total issues successfully resolved across all departments.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-lg">{data?.resolutionRate || 0}%</p>
                                <p className="text-sm text-slate-500 font-medium">Platform-wide average resolution efficiency rate.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function StatCard({ icon: Icon, label, value, color, delay }) {
    const colorClasses = {
        primary: 'bg-primary-500 text-white shadow-primary-500/30',
        blue: 'bg-blue-500 text-white shadow-blue-500/30',
        amber: 'bg-amber-500 text-white shadow-amber-500/30',
        emerald: 'bg-emerald-500 text-white shadow-emerald-500/30',
    }

    const iconColors = {
        primary: 'text-primary-100',
        blue: 'text-blue-100',
        amber: 'text-amber-100',
        emerald: 'text-emerald-100',
    }

    return (
        <div className="card p-6 relative overflow-hidden group animate-slide-up" style={{ animationDelay: delay, animationFillMode: 'both' }}>
            {/* Background design element */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500 ${colorClasses[color]}`}></div>

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${colorClasses[color]}`}>
                    <Icon className={`w-6 h-6 ${iconColors[color]}`} />
                </div>
            </div>
            <div className="relative z-10">
                <p className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-1">{value}</p>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">{label}</p>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const { user } = useAuth()

    if (user?.role === 'admin') return <AdminDashboard />
    if (user?.role === 'category_staff') return <StaffDashboard />
    return <StudentDashboard />
}
