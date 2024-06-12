import React, { useState }  from 'react';
import styles from '../../../css modules/Host/Settings/Account.module.css'
import { FaEdit } from "react-icons/fa";
import PasswordModal from './PasswordModal'
import DeleteModal from './DeleteModal'
import { MdDelete } from "react-icons/md";
import { Toaster } from 'react-hot-toast';

function Account() {
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);  
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);      

    const handlePasswordOpenModal = () => {
        setPasswordModalOpen(true);
    };

    const handlePasswordCloseModal = () => {
        setPasswordModalOpen(false);
    };

    const handleeDeleteOpenModal = () => {
        setDeleteModalOpen(true);
    };

    const  handleeDeleteCloseModal = () => {
        setDeleteModalOpen(false);
    };

    return (
        <div className={styles.modal}>
             <Toaster
                position="top-center"
                reverseOrder={false}
            />
           {passwordModalOpen && <PasswordModal onClose={handlePasswordCloseModal}/>}
           {deleteModalOpen && <DeleteModal onClose={handleeDeleteCloseModal}/>}
           <div className={styles.account}>
           <h1>Account Settings</h1>
           <div className={styles.password}>
           <h3>Password</h3>
           <FaEdit onClick={handlePasswordOpenModal} className={styles.editIcon}/>
           </div>
           <div className={styles.delete}>
           <h3>Delete your Van Life account </h3>
           <MdDelete className={styles.editIcon} onClick={handleeDeleteOpenModal}/>
           </div>
           </div>
        </div>
    );
}

export default Account;
