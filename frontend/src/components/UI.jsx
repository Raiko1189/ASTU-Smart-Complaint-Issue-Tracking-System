export function LoadingSkeleton({ count = 3, type = 'card' }) {
    if (type === 'table') {
        return (
            <div className="space-y-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="flex gap-6 p-5 card items-center">
                        <div className="skeleton h-5 w-1/4 rounded-lg" />
                        <div className="skeleton h-5 w-1/3 rounded-lg" />
                        <div className="skeleton h-5 w-1/6 rounded-lg" />
                        <div className="skeleton h-5 w-1/6 rounded-lg" />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="card p-8 space-y-6">
                    <div className="skeleton h-6 w-3/4 rounded-lg" />
                    <div className="skeleton h-4 w-full rounded-md" />
                    <div className="skeleton h-4 w-2/3 rounded-md" />
                    <div className="flex justify-between pt-4 mt-auto">
                        <div className="skeleton h-8 w-24 rounded-full" />
                        <div className="skeleton h-5 w-20 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function StatusBadge({ status }) {
    const className = status === 'Resolved' ? 'status-resolved'
        : status === 'In Progress' ? 'status-in-progress'
            : status === 'Pending Student Verification' ? 'status-pending-verification'
                : 'status-open'

    return <span className={className}>{status}</span>
}

export function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-3xl border border-white/40 dark:border-white/5 animate-slide-up">
            {Icon && <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Icon className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>}
            <h3 className="text-xl font-display font-bold text-slate-800 dark:text-slate-200 mb-2 tracking-tight">{title}</h3>
            {description && <p className="text-base text-slate-500 dark:text-slate-400 mb-8 max-w-sm font-light leading-relaxed">{description}</p>}
            {action}
        </div>
    )
}

export function PageHeader({ title, subtitle, action }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 mt-2">
            <div className="animate-slide-up">
                <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
                {subtitle && <p className="text-base text-slate-500 dark:text-slate-400 mt-2 font-medium">{subtitle}</p>}
            </div>
            {action && <div className="animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>{action}</div>}
        </div>
    )
}
