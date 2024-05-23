import React, { useState } from 'react'
import { Form, useActionData, redirect } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import styles from '../../css modules/AddHostVan.module.css'
import { addVan, storage } from '../../firebase'
import Van from "../../assets/images/add-img.jpg"
import { v4 as uuidv4 } from 'uuid';


export async function action({ request }) {
    const formData = await request.formData()
    const vanName = formData.get('name')
    const vanPrice = formData.get('price')
    const vanType = formData.get('type')
    const vanDescription = formData.get('description')
    const vanImg = formData.get('imageurl')
    try {
        await addVan(vanName, vanPrice, vanType, vanDescription, vanImg)
        console.log('van added')
        return redirect('/host')
    } catch (err) {
        return {
            error: err.message
        }
    }
}

export default function AddHostVan() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const data = useActionData()

    const uploadFile = async () => {
        if (imageUpload == null) {
            setError('Please select an image to upload.');
            return;
        }
    
        try {
            const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            setImageUrl(url); 
            console.log(url)
            alert('Upload successful. Click the Add Van button to finish adding your van.');
        } catch(error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            {data?.error &&
                <p>{data.error}</p>
            }
            {error &&
                <p>{error}</p>
            }
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
                    <option value=''>--Select a van type--</option>
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


/*

    const uploadFile = () => {
        if (imageUpload == null) {
            setError('Please select an image to upload.')
            return
        }
        const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`)
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                console.log(snapshot.ref)
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        setImageUrl(url)
                        alert('Upload successful. Click the Add Van button to finish adding your van.')
                    })
                    .catch(error => setError(error.message))
            })
            .catch(error => setError(error.message)) 
    }


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
                    <option value=''>--Select a van type--</option>
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
                {imageUrl !== null && <button type='submit'
                >Add Your Van</button>}
            </Form>

*/