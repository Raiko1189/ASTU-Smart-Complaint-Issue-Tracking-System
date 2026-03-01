import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { register, user } = useAuth()
    const navigate = useNavigate()

    if (user) {
        navigate('/dashboard', { replace: true })
        return null
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password !== form.confirmPassword) {
            return toast.error('Passwords do not match')
        }
        setLoading(true)
        try {
            await register(form.name, form.email, form.password)
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-50 dark:bg-dark-bg">
            {/* Animated Premium Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] bg-primary-200/50 dark:bg-primary-900/20 animate-pulse-slow"></div>
                <div className="absolute top-[40%] text-right -right-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] bg-accent-200/50 dark:bg-accent-900/20 animate-float"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="text-center mb-10 animate-slide-up">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-glow">
                            <span className="font-display font-bold text-xl">AS</span>
                        </div>
                        <span className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">ASTU Smart</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Create your account</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">Join the next-generation campus platform</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-[2rem] shadow-2xl animate-slide-up space-y-5 border border-white/40 dark:border-white/10" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                    <div className="space-y-1">
                        <label className="label">Full Name</label>
                        <div className="relative">
                            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input name="name" value={form.name} onChange={handleChange} className="input-field pl-11" placeholder="Enter your full name" required />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="label">Email Address</label>
                        <div className="relative">
                            <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field pl-11" placeholder="Enter your email" required />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="label">Password</label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} className="input-field pl-11 pr-11" placeholder="Min 6 characters" required minLength={6} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="label">Confirm Password</label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="input-field pl-11" placeholder="Repeat your password" required />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full mt-4 h-12 text-lg">
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : 'Create Account'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 font-medium animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors">Sign in here</Link>
                </p>
            </div>
        </div>
    )
}
