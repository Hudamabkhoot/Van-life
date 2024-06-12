import React, {useContext} from 'react';
import styles from '../../../css modules/Host/Settings/SettingsModal.module.css'
import { HostContext } from '../../../components/HostContext'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../firebase/firebase'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast'; 

function ImgModal() {
    const {
        imageUpload,
        setImageUpload,
        imageUrl,
        setImageUrl,
        handleImageSubmit,
        handleCloseImageModal
        } = useContext(HostContext);


            const uploadFile = async () => {
                if (imageUpload == null) {
                    toast.error('Please select an image to upload.')
                    return;
                }
            
                try {
                    const imageRef = ref(storage, `images/${'userImage' + uuidv4()}`);
                    const snapshot = await uploadBytes(imageRef, imageUpload);
                    const url = await getDownloadURL(snapshot.ref);
                    setImageUrl(url); 
                    toast.success('image uploaded successfully');

                } catch(error) {
                    toast.error('failed to upload image')
                }
            };
    
            return (
                    <div className={styles.modal}>
                        <div className={styles.content}>
                            <button className={styles.close} onClick={handleCloseImageModal}>&times;</button>
                            <h2>Change Profile Picture</h2>
                            <form onSubmit={handleImageSubmit} encType='multipart/form-data'>
                                <label htmlFor='uploadFile'>Upload Your Image</label>
                                <input type='file' name='uploadFile' accept=".jpg, .jpeg, .png" onChange={(event) => {
                                    setImageUpload(event.target.files[0]);
                                }} />
                                <button type='button' onClick={uploadFile} className={styles.submitBtn}>Upload Image</button>
                                <input type='hidden' name='imageurl'
                                    value={imageUrl} />
                                {imageUrl &&
                                    <button type='submit' className={styles.submitBtn}>
                                        Save profile picture
                                    </button>}
                            </form>
                        </div>
                    </div>
                )
        }
export default ImgModal;
