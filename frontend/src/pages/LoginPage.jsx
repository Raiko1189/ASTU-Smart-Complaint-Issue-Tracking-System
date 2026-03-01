import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { login, user } = useAuth()
    const navigate = useNavigate()

    if (user) {
        navigate('/dashboard', { replace: true })
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        const apiUrl = import.meta.env.VITE_API_URL || ''
        window.location.href = `${apiUrl}/api/auth/google`
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-dark-bg">
            {/* Animated Premium Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] bg-primary-200/50 dark:bg-primary-900/20 animate-pulse-slow"></div>
                <div className="absolute top-[40%] text-right -right-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] bg-accent-200/50 dark:bg-accent-900/20 animate-float"></div>
            </div>

            <div className="relative z-10 w-full max-w-[1000px] flex rounded-[2rem] overflow-hidden glass-panel shadow-2xl animate-slide-up m-4 border border-white/40 dark:border-white/10">

                {/* Left side - Branding Showcase */}
                <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between bg-white/40 dark:bg-black/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent"></div>
                    <div className="relative z-10 flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-glow">
                            <span className="font-display font-bold text-xl">AS</span>
                        </div>
                        <span className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">ASTU Smart</span>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-6 leading-[1.15] tracking-tight">
                            Elevate your campus experience.
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 font-light">
                            A world-class platform to submit, track, and resolve complaints instantly. Powered by advanced AI.
                        </p>
                        <div className="flex gap-4">
                            <div className="glass-panel px-5 py-4 rounded-2xl flex-1 text-center bg-white/60 dark:bg-white/5">
                                <p className="text-3xl font-display font-bold text-primary-600 dark:text-primary-400">24/7</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-2">AI Support</p>
                            </div>
                            <div className="glass-panel px-5 py-4 rounded-2xl flex-1 text-center bg-white/60 dark:bg-white/5">
                                <p className="text-3xl font-display font-bold text-accent-600 dark:text-accent-400">Sync</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-2">Real-time</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="flex-1 p-8 lg:p-14 bg-white/80 dark:bg-dark-card/90 backdrop-blur-2xl flex flex-col justify-center relative">
                    <div className="text-center mb-10">
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-glow">
                                <span className="font-display font-bold text-xl">AS</span>
                            </div>
                            <span className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">ASTU Smart</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Welcome back</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="label">Email Address</label>
                            <div className="relative">
                                <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-11"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="label mb-0">Password</label>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-11 pr-11"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                                >
                                    {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 h-12 text-lg">
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium">
                                <span className="px-4 bg-white dark:bg-[#18181b] text-slate-500 rounded-full">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 font-medium text-slate-700 dark:text-slate-300 group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
