import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api/axios'
import { LoadingSkeleton, StatusBadge, PageHeader, EmptyState } from '../components/UI'
import { HiOutlineDocumentText } from 'react-icons/hi2'

export default function AllComplaintsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.get('status') || ''

    const { data, isLoading } = useQuery({
        queryKey: ['allComplaints', status],
        queryFn: () => api.get(`/complaints/all?status=${status}&limit=50`).then(r => r.data.data),
    })

    if (isLoading) return <LoadingSkeleton count={5} type="table" />

    const complaints = data?.complaints || []

    return (
        <>
            <PageHeader title="Complaints Directory" subtitle={`Managing ${data?.pagination?.total || 0} active records`} />

            <div className="flex gap-3 mb-8 flex-wrap animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                {['', 'Open', 'In Progress', 'Pending Student Verification', 'Resolved'].map((s) => (
                    <button
                        key={s}
                        onClick={() => s ? setSearchParams({ status: s }) : setSearchParams({})}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm ${status === s
                            ? 'bg-primary-600 text-white shadow-primary-500/30 -translate-y-0.5'
                            : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 hover:-translate-y-0.5 border border-slate-200 dark:border-white/5'
                            }`}
                    >
                        {s || 'All Records'}
                    </button>
                ))}
            </div>

            {complaints.length === 0 ? (
                <EmptyState icon={HiOutlineDocumentText} title="No records found" description="Try adjusting your filters or status selection." />
            ) : (
                <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                    <div className="overflow-x-auto scrollbar-styled">
                        <table className="w-full text-sm whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50/80 dark:bg-white/[0.02]">
                                    <th className="text-left py-4 px-6 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Title</th>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Category</th>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Student</th>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Status</th>
                                    <th className="text-right py-4 px-6 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {complaints.map(c => (
                                    <tr key={c._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-4 px-6">
                                            <Link to={`/complaints/${c._id}`} className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{c.title}</Link>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">{c.category?.name}</span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">{c.studentId?.name}</td>
                                        <td className="py-4 px-6"><StatusBadge status={c.status} /></td>
                                        <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-medium text-right">{new Date(c.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}
