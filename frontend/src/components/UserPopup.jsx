import pb from '../pocketbase/pocketbase.js';
import { useNavigate } from 'react-router-dom';

function UserPopup({ isOpen, onClose }) {
    const navigate = useNavigate();
    const user = pb.authStore.model;

    const handleLogout = () => {
        pb.authStore.clear();
        navigate('/login');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
            onClick={onClose}  // Close popup when clicking outside
        >
            <div
                className="bg-white text-black rounded shadow-lg w-80 p-4"
                onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside
            >
                <div className="border-b pb-2 mb-2">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Username:</strong> {user?.username}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default UserPopup;
