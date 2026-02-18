import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const PaymentVerifyPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [status, setStatus] = useState("Verifying your payment...")

    useEffect(() => {
        const orderId = searchParams.get('order_id')
        if (orderId) {
            setStatus("Payment successful! Redirecting to your orders...")
            setTimeout(() => {
                navigate("/account?tab=orders")
            }, 2000)
        } else {
            setStatus("Something went wrong. Redirecting...")
            setTimeout(() => navigate("/"), 2000)
        }
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <p className="text-lg font-medium">{status}</p>
        </div>
    )
}

export default PaymentVerifyPage