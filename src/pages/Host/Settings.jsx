import React, { useState } from 'react';
import { getAuth, updateProfile } from "firebase/auth";

function Setting() {
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const auth = getAuth();
        try {
            await updateProfile(auth.currentUser, { displayName });
            setDisplayName('');
            setError('');
            alert('Display name updated successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Update Display Name</h2>
            <h3>{displayName}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your new display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Setting;
