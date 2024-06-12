import React, { useState, useEffect } from 'react';
import styles from '../../../css modules/Host/Settings/SettingsModal.module.css'
import { toast } from 'react-hot-toast'; 

function RentModal({ onClose }) {
    const [rentalDetails, setRentalDetails] = useState({
        startDate: '',
        endDate: '',
        passengers: '',
      });
    const today = new Date().toISOString().split('T')[0];

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRentalDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      };
    
      useEffect(() => {
        if (rentalDetails.startDate > rentalDetails.endDate) {
          setRentalDetails((prevDetails) => ({
            ...prevDetails,
            endDate: rentalDetails.startDate,
          }));
        }
      }, [rentalDetails.startDate]);
    
      useEffect(() => {
        if (rentalDetails.endDate < rentalDetails.startDate) {
          setRentalDetails((prevDetails) => ({
            ...prevDetails,
            startDate: rentalDetails.endDate,
          }));
        }
      }, [rentalDetails.endDate]);

      const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Booking submitted!');
        onClose();
      };
    
            return (
                    <div className={styles.modal}>
                        <div className={styles.content}>
                            <button className={styles.close} onClick={onClose}>&times;</button>
                            <h2>Contact Host</h2>
                            <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="startDate">Start Date:</label>
                            <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={rentalDetails.startDate}
                            onChange={handleInputChange}
                            min={today} 
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate">End Date:</label>
                            <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={rentalDetails.endDate}
                            onChange={handleInputChange}
                            min={today} 
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="passengers">Number of Passengers:</label>
                            <input
                            type="number"
                            id="passengers"
                            name="passengers"
                            value={rentalDetails.passengers}
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Submit</button>
                        </form>
                        </div>
                    </div>
                )
        }
export default RentModal;
