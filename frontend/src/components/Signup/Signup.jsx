import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion' 

const inputClasses = "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 placeholder:text-gray-400";

const Signup = () => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL 
    const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" })
    const [msg, setMsg] = useState()
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMsg("")
        try{
            const response = await fetch(`${BASEURL}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
            const data = await response.json()
            if(response.ok){
                setMsg("Account created. Redirecting to login...")
                setTimeout(() => {
                    nav("/login")
                }, 1200)
            } else {
                const errorMsg = data.username || data.email || data.password || data.non_field_errors || "Signup failed."
                setMsg(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg)
            }
        } catch (err) {
            console.error(err)
            setMsg("An error occurred. Please check your connection.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-125 p-10 md:p-14"
            >
                <div className="mb-10">
                    <h2 className="text-3xl font-bold mb-3 text-gray-900 tracking-tight">Create account</h2>
                    <p className="text-gray-500">Join us for exclusive access and faster checkout.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                        <motion.div whileFocus={{ scale: 1.01 }}>
                            <input type="text" name="username" placeholder="Username" className={inputClasses} onChange={handleChange} value={form.username} />
                        </motion.div>
                        <motion.div whileFocus={{ scale: 1.01 }}>
                            <input type="email" name="email" placeholder="Email address" className={inputClasses} onChange={handleChange} value={form.email} />
                        </motion.div>
                        <motion.div whileFocus={{ scale: 1.01 }}>
                            <input type="password" name="password" placeholder="Password" className={inputClasses} onChange={handleChange} value={form.password} />
                        </motion.div>
                        <motion.div whileFocus={{ scale: 1.01 }}>
                            <input type="password" name="password2" placeholder="Password Confirmation" className={inputClasses} onChange={handleChange} value={form.password2} />
                        </motion.div>
                    
                    <div className="text-xs text-gray-500 leading-relaxed">
                        By creating an account, you agree to our <Link to="/terms" className="underline hover:text-black">Terms</Link> and <Link to="/privacy" className="underline hover:text-black">Privacy Policy</Link>.
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-md mt-4 uppercase tracking-wider text-sm"
                    >
                        {loading ? "Processing..." : "Create Account"}
                    </motion.button>
                </form>

                <div className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-black font-bold hover:underline transition-all">
                        Sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default Signup