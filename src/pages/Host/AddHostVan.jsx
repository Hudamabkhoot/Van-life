import React, { useState } from 'react'
import { Form, useActionData, redirect } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import styles from '../../css modules/Host/AddHostVan.module.css'
import { addVan, storage } from '../../firebase/firebase'
import Van from "../../assets/images/add-img.jpg"
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast'; 
import { Toaster } from 'react-hot-toast';

export async function action({ request }) {
    const formData = await request.formData()
    const vanName = formData.get('name');
    const vanPrice = formData.get('price');
    const vanType = formData.get('type');
    const vanDescription = formData.get('description');
    const vanImg = formData.get('imageurl')
    try {
        await addVan(vanName, vanPrice, vanType, vanDescription, vanImg)
        return redirect('/host')
    } catch (err) {
    }
}

export default function AddHostVan() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const data = useActionData()

    const uploadFile = async () => {
        if (imageUpload == null) {
            toast.error('Please select an image to upload.')
            return;
        }
        const loadingToast = toast.loading('Uploading image...');
    
        try {
            const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            setImageUrl(url); 
            toast.dismiss(loadingToast);
            toast.success('image uploaded successfully!')
        } catch(error) {
            toast.dismiss(loadingToast);
            toast.error('image upload failed')
        }
    };

    return (
        <div className={styles.container}>
             <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <img src={Van} className={styles.containerImg}/>
            <Form method='post' className={styles.addForm} encType='multipart/form-data'>
                <input
                    name="name"
                    type='text'
                    placeholder='Van Name'
                />
                <input
                    name="price"
                    type='number'
                    placeholder='Price'
                />
                <textarea
                    name="description"
                    type='text'
                    placeholder='Van Description'
                />
                <select name='type'>
                    <option value=''>Select a van type</option>
                    <option value='rugged'>Rugged</option>
                    <option value='simple'>Simple</option>
                    <option value='luxury'>Luxury</option>
                </select>
                <label htmlFor='uploadFile'>Upload Van Image</label>
                <input type='file' name='uploadFile' accept=".jpg, .jpeg, .png" onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }} />
                <button type='button' onClick={uploadFile}>Upload Image</button>
                <input type='hidden' name='imageurl' 
                value={imageUrl}/>
                {imageUrl && <button type='submit'
                >Add Your Van</button>}
            </Form>
        </div>
    )
}
