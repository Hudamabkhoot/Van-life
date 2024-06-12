import React, {useContext} from 'react';
import styles from '../../../css modules/Host/Settings/SettingsModal.module.css'
import { HostContext } from '../../../components/HostContext'


function DeleteModal({onClose, disabled}) {
    const { deletePassword, 
            setDeletePassword,
            handleDeleteSubmit
            } = useContext(HostContext);

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <button disabled={disabled} className={styles.close} onClick={onClose}>&times;</button>
                <h2>Enter Your Password</h2>
                <form onSubmit={handleDeleteSubmit}>
                <input
                        type="password"
                        placeholder="Enter your password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                    />
                    <button type="submit" className={styles.submitBtn}>Delete</button>
                </form>
            </div>
        </div>
    );
}

export default DeleteModal;
