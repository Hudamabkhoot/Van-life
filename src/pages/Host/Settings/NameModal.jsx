import React, {useContext} from 'react';
import styles from '../../../css modules/Host/Settings/SettingsModal.module.css'
import { HostContext } from '../../../components/HostContext'
import { AuthContext }  from '../../../components/AuthContext'

function NameModal() {
    const { authUser } = useContext(AuthContext);
    const { 
        newFirstName,
        setNewFirstName,
        newLastName,
        setNewLastName,
        handleNameSubmit,
        handleCloseNameModal
        } = useContext(HostContext);

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <button disabled={!authUser.displayName} className={styles.close} onClick={handleCloseNameModal}>&times;</button>
                <h2>Update Profile</h2>
                <form onSubmit={handleNameSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                        required
                    />
                     <input
                        type="text"
                        placeholder="Enter your last name"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.submitBtn}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default NameModal;
