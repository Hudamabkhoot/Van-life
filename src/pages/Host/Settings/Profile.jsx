import React, { useContext, useState, useEffect } from 'react';
import styles from '../../../css modules/Host/Settings/Profile.module.css'
import { HostContext } from '../../../components/HostContext'
import { FaEdit } from "react-icons/fa";
import { AuthContext }  from '../../../components/AuthContext'
import DefaultUserImg from '../../../assets/images/DefaultUserImg.svg'
import NameModal from './NameModal'
import ImgModal from './ImgModal'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast'; 
import BarLoader from "react-spinners/BarLoader";

function Profile() {
    const { authUser, isReloading } = useContext(AuthContext)
    const { 
        nameModalOpen, 
        imageModalOpen,
        handleOpenNameModal, 
        handleOpenImageModal
    } = useContext(HostContext);
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = new Date(authUser.creationTime).toLocaleDateString('en-US', options);    
   
    useEffect(() => {
        if (isReloading) {
            toast.promise(
                new Promise((resolve) => setTimeout(resolve, 4000)),
                {
                    loading: 'Updating your profile...', 
                    success: 'profile updated successfully!', 
                    error: 'Failed to update profile', 
                }
            );
        }
    }, [isReloading]);
    
        return (
            
        <div className={styles.modal}>
            {nameModalOpen && 
                <NameModal />
            }
             {imageModalOpen && 
             <ImgModal />
            }
         {isReloading 
         && (
         <div className={styles.loadingOverlay}>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                   <BarLoader color="#ff8c38" />
            </div>    
            )}
            <div className={styles.content}>
            <section className={styles.hostInfoContainer}>
                    <h1>Your Profile</h1>
                <div className={styles.name}>
                    <img src={authUser.photoURL == null ? DefaultUserImg : authUser.photoURL} className={styles.userImg} onClick={handleOpenImageModal}/>
                    { !imageModalOpen ? <FaEdit onClick={handleOpenImageModal} className={styles.editImgIcon}/> : ''}
                    <div  className={styles.infoContainer} >
                    {authUser.displayName !== null &&
                    <div className={styles.info}>
                    <h2>{authUser.displayName}</h2>
                    <FaEdit onClick={handleOpenNameModal} className={styles.editIcon}/>
                    </div>}
                    <div className={styles.info}>
                    <h4>Email:</h4>
                    <p>{authUser.email}</p>
                    </div>
                    <div className={styles.info}>
                    <h4>Member since:</h4>
                    <p>{formattedDate}</p>
                    </div>
                    </div>
                </div>
                <div className={styles.email}>
                </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;
