import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTransactions, updateUserImg, changeUserPassword, logOutUser, deleteAccount  } from '../firebase/firebase'
import { useNavigate } from "react-router-dom"
import { updateUserName} from '../firebase/firebase'
import { removeUser, updateUser } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast'; 
import { AuthContext } from '../components/AuthContext'

// Create the context
export const HostContext = createContext();

// Provider component
export const HostProvider = ({ children }) => { 
    const { isReloading, setIsReloading } = useContext(AuthContext)
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [imgSubmitted, setImgSubmitted] = useState(false);
    const [nameModalOpen, setNameModalOpen] = useState(false);    
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [last30DaysTransactions, setLast30DaysTransactions] = useState([]);
    const [last30DaysIncome, setLast30DaysIncome] = useState(0);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        if (nameSubmitted){
            setNameModalOpen(false);
        }
    }, [nameSubmitted]);

    const handleCloseNameModal = () => {
            setNameModalOpen(false);
    };

    const handleOpenNameModal = () => {
        setNameModalOpen(true);
    };

    const handleOpenImageModal = () => {
        setImageModalOpen(true);
    };

    const handleCloseImageModal = () => {
        setImageModalOpen(false);
    };


    const handleNameSubmit = async (e) => {
        e.preventDefault();
        
        const userName = await updateUserName(newFirstName, newLastName);
        if (userName) {
            dispatch(updateUser({ displayName: `${newFirstName} ${newLastName}` }))
            setNameSubmitted(true);
            setNewFirstName('');
            setNewLastName('');
            handleCloseNameModal(); 
            setIsReloading(true);
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }
        
    };

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        
        const success = await updateUserImg(imageUrl)
        if (success) {
            dispatch(updateUser({ photoURL: imageUrl }))
            setImgSubmitted(true)
            handleCloseNameModal(); 
            setIsReloading(true);
            setTimeout(() => {
                window.location.reload();
            }, 5000);
            handleCloseImageModal()
        } 
    };


    const handleLogOut = async () => {
        logOutUser()
        navigate('/login')
        dispatch(removeUser());
        toast.success('Password  updated successfully!');
    }


    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await changeUserPassword(oldPassword, newPassword, confirmPassword);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            handleLogOut();
        } catch (error) {
            toast.error('changing password failed');
        }

    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault()
            try {
                await toast.promise(
                    deleteAccount(deletePassword),
                    {
                        loading: 'Deleting account...',
                        success: 'Account deleted successfully!',
                        error: 'Error deleting account',
                    },
                    {
                        icon: '🗑️',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        }
                    }
                );
                dispatch(removeUser());
                navigate('/');
            } catch (error) {
                toast.error('deleting account failed. Please try again later.');
            }
        }
    
    useEffect(() => {
        async function fetchTransactions() {
            try {
                const dataArr = await getTransactions();
                setTransactions(dataArr);
            } catch (error) {
            }
        }
        fetchTransactions();
    }, []);


    useEffect(() => {
        async function fetch30DaysTransactions() {
            try {
                const dataArr = await getTransactions();
                const transactionSummary = dataArr
                    .map(item => ({ ...item, date: new Date(item.date) }))
                    .filter(item => new Date() - item.date <= 30 * 24 * 60 * 60 * 1000);
                setLast30DaysTransactions(transactionSummary);
                const income = transactionSummary.reduce((total, transaction) => total + transaction.amount, 0);
                setLast30DaysIncome(income);
            } catch (error) {
                toast.error('Error fetching transactions')
                throw error;
            }
        }
        fetch30DaysTransactions();
    }, []);    
    

    return (
        <HostContext.Provider value={{
            newFirstName,
            setNewFirstName,
            newLastName,
            setNewLastName,
            nameModalOpen, 
            setNameModalOpen,
            imageModalOpen, 
            handleCloseNameModal, 
            handleOpenNameModal, 
            handleOpenImageModal, 
            handleCloseImageModal,
            setImageModalOpen,
            handleNameSubmit,
            nameSubmitted, 
            setNameSubmitted,
            nameSubmitted,
            imgSubmitted,
            imageUpload, 
            setImageUpload,
            imageUrl, 
            setImageUrl,
            handleImageSubmit,
            isReloading,
            oldPassword, 
            setOldPassword,
            newPassword, 
            setNewPassword,
            confirmPassword, 
            setConfirmPassword,
            handleChangePassword,
            deletePassword, 
            setDeletePassword,
            handleDeleteSubmit,
            transactions,
            last30DaysTransactions,
            last30DaysIncome
        }}>
            {children}
        </HostContext.Provider>
    );
}
