import { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        show: false,
        title: '',
        message: '',
        variant: 'success',
    });

    const showToast = useCallback(({ title, message, variant = 'success' }) => {
        setToast({
            show: true,
            title,
            message,
            variant,
        });
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, show: false }));
    }, []);

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            <ToastContainer className="toast-container position-fixed top-0 end-0 p-3">
                <Toast
                    show={toast.show}
                    onClose={hideToast}
                    className={`toast colored-toast text-fixed-white bg-${toast.variant}`}
                    delay={3000}
                    autohide
                >
                    <Toast.Header className={`toast-header text-fixed-white bg-${toast.variant}`}>
                        <strong className="me-auto">{toast.title}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {Array.isArray(toast.message) ? (
                            <ul className="mb-0">
                                {toast.message.map((msg, index) => (
                                    <li key={index}>{msg}</li>
                                ))}
                            </ul>
                        ) : (
                            toast.message
                        )}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
