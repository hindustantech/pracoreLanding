import React, { useState, useRef, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
type Step = 'mobile' | 'otp' | 'confirm'

const DeleteAccount = () => {
    const [step, setStep] = useState<Step>('mobile')
    const [mobile, setMobile] = useState('')
    const [otp, setOtp] = useState(['', '', '', ''])          // 4-digit OTP
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(0)
    const [error, setError] = useState('')
    const [shake, setShake] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const otpRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>
        if (timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000)
        }
        return () => clearInterval(interval)
    }, [timer])

    const triggerShake = () => {
        setShake(true)
        setTimeout(() => setShake(false), 600)
    }

    const handleSendOtp = () => {
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number.')
            triggerShake()
            return
        }
        setError('')
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep('otp')
            setTimer(30)
            setTimeout(() => otpRefs.current[0]?.focus(), 100)
        }, 1500)
    }

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return
        const updated = [...otp]
        updated[index] = value
        setOtp(updated)
        if (value && index < 3) otpRefs.current[index + 1]?.focus()
    }

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus()
        }
    }

    const handleVerifyOtp = () => {
        const entered = otp.join('')
        if (entered.length < 4) {
            setError('Please enter the complete 4-digit OTP.')
            triggerShake()
            return
        }
        setError('')
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if (entered === '1234') {
                setStep('confirm')
            } else {
                setError('Incorrect OTP. Please try again.')
                triggerShake()
                setOtp(['', '', '', ''])
                otpRefs.current[0]?.focus()
            }
        }, 1500)
    }

    const handleDelete = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setShowPopup(true)
        }, 2000)
    }

    const handleResend = () => {
        setTimer(30)
        setOtp(['', '', '', ''])
        setError('')
        setTimeout(() => otpRefs.current[0]?.focus(), 100)
    }

    const stepLabel = (s: Step) =>
        ({ mobile: 'Mobile', otp: 'Verify OTP', confirm: 'Delete' })[s]

    const steps: Step[] = ['mobile', 'otp', 'confirm']

    const deletionDate = new Date()
    deletionDate.setDate(deletionDate.getDate() + 90)
    const formattedDate = deletionDate.toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    })

    return (
        <>
        <Navbar />
            <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-10 font-['Sora',sans-serif]">
                <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100%  { transform: translateX(0); }
          20%,60%  { transform: translateX(-6px); }
          40%,80%  { transform: translateX(6px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.82) translateY(24px); }
          70%  { transform: scale(1.04) translateY(-3px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes countPop {
          0%   { opacity: 0; transform: scale(0.4); }
          80%  { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ringDraw {
          from { stroke-dashoffset: 226; }
          to   { stroke-dashoffset: 0; }
        }
        .animate-fade-up   { animation: fadeUp 0.45s ease both; }
        .animate-shake     { animation: shake 0.5s ease; }
        .animate-spin-icon { animation: spin 0.8s linear infinite; }
        .animate-pop-in    { animation: popIn 0.42s cubic-bezier(0.34,1.56,0.64,1) both; }
        .animate-backdrop  { animation: backdropIn 0.25s ease both; }
        .animate-count-pop { animation: countPop 0.5s 0.25s cubic-bezier(0.34,1.56,0.64,1) both; }
        .animate-ring      { animation: ringDraw 0.7s 0.1s ease forwards; stroke-dasharray: 226; stroke-dashoffset: 226; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>

                {/* ══════════════════════════════════════
          SUCCESS POPUP MODAL
      ══════════════════════════════════════ */}
                {showPopup && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-backdrop"
                        style={{ backgroundColor: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)' }}
                    >
                        <div className="w-full max-w-sm bg-[#161616] border border-zinc-700/60 rounded-3xl p-8 shadow-2xl animate-pop-in text-center">

                            {/* Animated ring + icon */}
                            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-5">
                                <svg className="absolute inset-0 w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                                    <circle cx="48" cy="48" r="42" fill="none" stroke="#27272a" strokeWidth="4" />
                                    <circle cx="48" cy="48" r="42" fill="none" stroke="#ef4444" strokeWidth="4"
                                        strokeLinecap="round" className="animate-ring" />
                                </svg>
                                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-white mb-1 tracking-tight">Deletion Scheduled</h2>
                            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                                Your account deletion request has been submitted.
                            </p>

                            {/* 90-day countdown highlight */}
                            <div className="bg-[#1c1c1c] border border-zinc-700/50 rounded-2xl px-6 py-5 mb-5">
                                <div className="animate-count-pop">
                                    <span className="text-6xl font-bold text-red-400 leading-none">90</span>
                                    <span className="text-xl font-semibold text-red-400/60 ml-1.5">days</span>
                                </div>
                                <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">
                                    Your account will be{' '}
                                    <span className="text-white font-semibold">permanently deleted</span> on
                                </p>
                                <div className="mt-1 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1">
                                    <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                    <span className="text-red-300 text-xs font-semibold">{formattedDate}</span>
                                </div>
                            </div>

                            {/* Info bullets */}
                            <div className="text-left space-y-3 mb-6">
                                {[
                                    { icon: '↩', color: 'text-amber-400', text: 'You can cancel anytime within 90 days by logging back in.' },
                                    { icon: '🔒', color: 'text-zinc-400', text: 'Your account is immediately locked and inaccessible.' },
                                    { icon: '✓', color: 'text-green-400', text: 'All data permanently erased after the 90-day window.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className={`text-sm flex-shrink-0 mt-0.5 ${item.color}`}>{item.icon}</span>
                                        <p className="text-xs text-zinc-400 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Requested from badge */}
                            <div className="flex items-center justify-center gap-2 bg-zinc-800/60 rounded-xl px-4 py-2.5 mb-6">
                                <svg className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
                                </svg>
                                <span className="text-xs text-zinc-400">Requested from</span>
                                <span className="text-xs text-white font-semibold">+91 {mobile}</span>
                            </div>

                            <button
                                onClick={() => setShowPopup(false)}
                                className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-sm font-medium transition-all duration-200 active:scale-[0.98]"
                            >
                                Got it, close
                            </button>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════
          MAIN PAGE
      ══════════════════════════════════════ */}
                <div className="w-full max-w-md">

                    {/* Header */}
                    <div className="mb-8 text-center animate-fade-up">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5">
                            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Delete Account</h1>
                        <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">
                            This action is permanent and cannot be undone.
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-8 animate-fade-up" style={{ animationDelay: '0.05s' }}>
                        {steps.map((s, i) => {
                            const done = steps.indexOf(step) > i
                            const active = step === s
                            return (
                                <React.Fragment key={s}>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
                    ${done ? 'bg-red-500 text-white' : active ? 'bg-red-500/20 border border-red-500 text-red-400' : 'bg-zinc-800 border border-zinc-700 text-zinc-500'}`}>
                                            {done ? (
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            ) : i + 1}
                                        </div>
                                        <span className={`text-[10px] font-medium ${active ? 'text-red-400' : done ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                            {stepLabel(s)}
                                        </span>
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className={`h-px w-10 mb-3 transition-all duration-500 ${done ? 'bg-red-500' : 'bg-zinc-700'}`} />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>

                    {/* Card */}
                    <div
                        className={`bg-[#161616] border border-zinc-800 rounded-2xl p-7 shadow-2xl animate-fade-up ${shake ? 'animate-shake' : ''}`}
                        style={{ animationDelay: '0.1s' }}
                    >

                        {/* ── STEP 1: MOBILE ── */}
                        {step === 'mobile' && (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-widest">
                                        Registered Mobile Number
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center px-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-400 text-sm font-medium select-none">
                                            +91
                                        </div>
                                        <input
                                            type="number"
                                            value={mobile}
                                            onChange={e => { setMobile(e.target.value.slice(0, 10)); setError('') }}
                                            placeholder="Enter your mobile number"
                                            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 transition-all"
                                        />
                                    </div>
                                    {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                                </div>

                                <p className="text-xs text-zinc-500 leading-relaxed bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/50">
                                    We'll send a one-time password to verify your identity before deleting your account.
                                </p>

                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <><svg className="w-4 h-4 animate-spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeOpacity=".3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>Sending OTP…</>
                                    ) : 'Send OTP'}
                                </button>
                            </div>
                        )}

                        {/* ── STEP 2: 4-DIGIT OTP ── */}
                        {step === 'otp' && (
                            <div className="space-y-5">
                                <div className="text-center">
                                    <p className="text-sm text-zinc-400">OTP sent to <span className="text-white font-medium">+91 {mobile}</span></p>
                                    <button
                                        onClick={() => { setStep('mobile'); setOtp(['', '', '', '']); setError('') }}
                                        className="text-xs text-red-400 hover:text-red-300 mt-1 underline underline-offset-2"
                                    >
                                        Change number
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-4 uppercase tracking-widest text-center">
                                        Enter 4-Digit OTP
                                    </label>

                                    {/* 4 large OTP boxes */}
                                    <div className="flex justify-center gap-4">
                                        {otp.map((digit, i) => (
                                            <input
                                                key={i}
                                                ref={el => { otpRefs.current[i] = el }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={e => handleOtpChange(i, e.target.value)}
                                                onKeyDown={e => handleOtpKeyDown(i, e)}
                                                className="text-center text-2xl font-bold bg-zinc-800 border-2 border-zinc-700 rounded-2xl text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-150 caret-red-400"
                                                style={{ width: '3.75rem', height: '4.25rem' }}
                                            />
                                        ))}
                                    </div>

                                    {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}
                                </div>

                                <div className="text-center text-xs text-zinc-500">
                                    {timer > 0 ? (
                                        <>Resend OTP in <span className="text-white font-medium">{timer}s</span></>
                                    ) : (
                                        <button onClick={handleResend} className="text-red-400 hover:text-red-300 underline underline-offset-2">
                                            Resend OTP
                                        </button>
                                    )}
                                </div>

                                <p className="text-[10px] text-zinc-600 text-center">
                                    Demo: use <span className="text-zinc-500 font-mono tracking-[0.3em]">1234</span> as OTP
                                </p>

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <><svg className="w-4 h-4 animate-spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeOpacity=".3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>Verifying…</>
                                    ) : 'Verify OTP'}
                                </button>
                            </div>
                        )}

                        {/* ── STEP 3: CONFIRM DELETE ── */}
                        {step === 'confirm' && (
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    <span className="text-green-400 text-xs font-medium">Identity verified successfully</span>
                                </div>

                                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 space-y-2">
                                    <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">What you'll lose</p>
                                    {[
                                        'All personal data and account history',
                                        'Saved preferences and settings',
                                        'Active subscriptions and benefits',
                                        'Account permanently erased after 90 days',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                            <span className="text-xs text-zinc-400">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* 90-day recovery notice */}
                                <div className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
                                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p className="text-xs text-amber-300/80 leading-relaxed">
                                        Account remains recoverable for{' '}
                                        <span className="font-semibold text-amber-300">90 days</span> before permanent deletion.
                                    </p>
                                </div>

                                <button
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-900/30"
                                >
                                    {loading ? (
                                        <><svg className="w-4 h-4 animate-spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeOpacity=".3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>Deleting Account…</>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            Permanently Delete Account
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => setStep('mobile')}
                                    className="w-full py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white text-sm font-medium transition-all duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <p className="text-center text-[11px] text-zinc-600 mt-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        Need help?{' '}
                        <a href="#" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
            <Footer/>
        </>
    )
} 

export default DeleteAccount