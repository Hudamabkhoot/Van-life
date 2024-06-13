import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../../css modules/Host/HostVans.module.css';
import { getHostVans, deleteVan } from "../../firebase/firebase";
import { AuthContext } from '../../components/AuthContext';
import { FaShuttleVan } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";
import { Toaster } from 'react-hot-toast';

export default function HostVans() {
    const [vans, setVans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authUser } = useContext(AuthContext);
    const id = authUser.uid
    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    const fetchVans = async () => {
        try {
            const vansData = await getHostVans(id);
            setVans(vansData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching van data:", error);
            setIsLoading(false);
        }
    };

    const removeVan = async (vanId) => {
        try {
            alert('Are you sure you want to delete this van? This cannot be undone.');
            await deleteVan(vanId);
            
            navigate('/host');
        } catch(err) {
            console.error("Error deleting van:", err);
        }
    };

    useEffect(() => {
        fetchVans();
    }, []);
    
    return (
        <section>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            
            <section className={styles.dashboardVans}>
                <div className={styles.top}>
                    <h1>Your listed vans</h1>
                </div>
                <div className={styles.vansList}>
                    {isLoading ? (
                        <div className={styles.NoVans}>
                            <div className={styles.loadingContainer}>
                                <PulseLoader color="#313E2D" />
                            </div>
                        </div>
                    ) : (
                        vans.length === 0 ? (
                            <div className={styles.NoDashboardVans}>
                                <Link to="../addvan" className={styles.NoDashboardVansBtn}>
                                    <FaShuttleVan className={styles.vanIcon} alt="Van img" /> 
                                    Get started!
                                </Link>
                            </div>
                        ) : (
                            vans.map((van) => (
                                <Link to={`/host/vans/${van.id}`} key={van.id}>
                                    <div className={styles.vanSingleConatiner}>
                                        <div className={styles.vanSingle}>
                                            <img src={van.imageUrl} alt={van.name} className={styles.vanSingleImg}/>
                                            <div className={styles.vanInfo}>
                                                <h4>{van.name}</h4>
                                                <div className={styles.btnContainer}>      
                                                    <MdDelete onClick={() => removeVan(van.id)} className={styles.delete}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    )}
                </div>
            </section>
        </section>
    );
}
