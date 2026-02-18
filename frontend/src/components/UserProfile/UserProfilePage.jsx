import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Edit2, Save, Plus, X, Trash2 } from 'lucide-react';
import { useSearchParams } from "react-router-dom"
import { authFetch } from '../../utils/auth';

const UserProfilePage = () => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [searchParams] = useSearchParams()
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile')
    const [loading, setLoading] = useState(true)
    

    // User Info State
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: ''
    });
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    // Orders State
    const [orders, setOrders] = useState([]);

    // Fetch user info on mount
    useEffect(() => {
        fetchUserInfo();
        fetchUserOrders();
    }, []);

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const res = await authFetch(`${BASEURL}/api/user/info/`);
            const data = await res.json();
            setUserInfo(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user info:', err);
            setLoading(false);
        }
    };

    const fetchUserOrders = async () => {
        try {
            const res = await authFetch(`${BASEURL}/api/user/orders/`);
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const res = await authFetch(`${BASEURL}/api/user/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name,
                    phone: userInfo.phone,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setUserInfo(data.user);
                setIsEditingProfile(false);
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Error updating profile');
        }
    };

    const getStatusColor = (status) => {
        const statusLower = status.toLowerCase();
        const colors = {
            'pending': 'bg-orange-100 text-orange-700',
            'confirmed': 'bg-blue-100 text-blue-700',
            'processing': 'bg-purple-100 text-purple-700',
            'shipped': 'bg-teal-100 text-teal-700',
            'delivered': 'bg-green-100 text-green-700',
            'cancelled': 'bg-red-100 text-red-700',
        };
        return colors[statusLower] || 'bg-gray-100 text-gray-700';
    };

    const formatCurrency = (amount) => {
        return `₦${parseFloat(amount).toLocaleString()}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Account</h1>
                    <p className="text-gray-500">{userInfo.email}</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-4 px-2 font-medium transition-colors ${
                            activeTab === 'profile'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-500 hover:text-black'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            Profile
                        </div>
                    </button>

                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`pb-4 px-2 font-medium transition-colors ${
                            activeTab === 'orders'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-500 hover:text-black'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <Package size={18} />
                            Orders ({orders.length})
                        </div>
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        {/* Profile Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Profile Information</h2>
                                <button
                                    onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
                                    className="flex items-center gap-2 text-sm font-medium text-black hover:text-gray-600 transition-colors"
                                >
                                    {isEditingProfile ? (
                                        <>
                                            <Save size={16} /> Save
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 size={16} /> Edit
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={userInfo.username}
                                        disabled
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={userInfo.first_name}
                                            onChange={(e) => setUserInfo({ ...userInfo, first_name: e.target.value })}
                                            disabled={!isEditingProfile}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={userInfo.last_name}
                                            onChange={(e) => setUserInfo({ ...userInfo, last_name: e.target.value })}
                                            disabled={!isEditingProfile}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={userInfo.email}
                                        disabled
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={userInfo.phone}
                                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                        disabled={!isEditingProfile}
                                        placeholder="Enter your phone number"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        {orders.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 mb-4">No orders yet</p>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    {/* Order Header */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-gray-200 mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Order {order.id}</h3>
                                            <p className="text-sm text-gray-500">
                                                Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="mt-2 md:mt-0 flex items-center gap-4">
                                            <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            <span className="font-bold text-lg">{formatCurrency(order.total)}</span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center py-3 border-b border-gray-100 last:border-0">
                                                {/* Product Image */}
                                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex shrink-0">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <Package size={24} />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                                                    <div className="text-sm text-gray-500 mt-1 space-y-0.5">
                                                        {item.color && <p>Color: {item.color}</p>}
                                                        {item.size && <p>Size: {item.size}</p>}
                                                        <p>Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">
                                                        {formatCurrency(item.price)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Total: {formatCurrency(parseFloat(item.price) * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Delivery Info */}
                                    {order.delivery_info && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <h4 className="font-medium text-sm text-gray-700 mb-2">Delivery Information</h4>
                                            <div className="text-sm text-gray-600">
                                                <p>{order.delivery_info.name}</p>
                                                <p>{order.delivery_info.phone}</p>
                                                <p>{order.delivery_info.address}</p>
                                                <p>{order.delivery_info.city}, {order.delivery_info.state}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Order Actions */}
                                    <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                                        {order.order_status === 'delivered' && (
                                            <button
                                                onClick={() => window.location.href = '/'}
                                                className="flex-1 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                                            >
                                                Buy Again
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;