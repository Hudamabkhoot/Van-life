import React, {useContext} from 'react';
import styles from '../../../css modules/Host/Settings/SettingsModal.module.css'
import { HostContext } from '../../../components/HostContext'


function PasswordModal({onClose}) {
    const {
        oldPassword, 
        setOldPassword,
        newPassword, 
        setNewPassword,
        confirmPassword, 
        setConfirmPassword,
        handleChangePassword,
        } = useContext(HostContext);


    return (
        <div className={styles.modal}>
            <div className={styles.content}>
            <button className={styles.close} onClick={onClose} >&times;</button>
            <h2>Change Profile Picture</h2>
            <form onSubmit={handleChangePassword} className={styles.accountForm}>
                <div className={styles.input}>
                    <label>Old Password:</label>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className={styles.input}>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className={styles.input}>
                    <label>Confirm New Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className={styles.submitBtn}>Change Password</button>
            </form>
            </div>
        </div>
    );
}

export default PasswordModal;
