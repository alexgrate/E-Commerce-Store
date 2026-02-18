import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { saveToken } from '../../utils/auth'

const inputClasses = "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 placeholder:text-gray-400";


const Login = () => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL 
    const [form, setForm] = useState({ username: "", password: "" })
    const [msg, setMsg] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        setMsg("")
        try{
            const response = await fetch(`${BASEURL}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
            const data = await response.json()
            if(response.ok){
                saveToken(data)
                setMsg("Login successful! Redirecting...")
                setTimeout(() => {
                    navigate("/")
                }, 800)
            } else {
                setMsg(data.detail || "Login failed. Please try again.")
            }
        } catch (error) {
            setMsg("An error occurred. Please try again.")
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4 pt-32">
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-125 p-10 md:p-14"
            > 
                <div className="mb-10">
                    {msg && <p className='mt-3 text-sm'>{msg}</p>}
                    <h2 className="text-3xl font-bold mb-3 text-gray-900 tracking-tight">Welcome back</h2>
                    <p className="text-gray-500">Please enter your details to sign in.</p>
                </div>

                

                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div whileFocus={{ scale: 1.01 }}>
                        <input 
                            type="username" 
                            name='username'
                            required
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </motion.div>
                    
                    <motion.div whileFocus={{ scale: 1.01 }}>
                        <input 
                            type="password" 
                            name='password'
                            required
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </motion.div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                    
                    <motion.button 
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-md mt-4 uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Signing in...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </motion.button>
                </form>

                <div className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-black font-bold hover:underline transition-all">
                        Create account
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default Login