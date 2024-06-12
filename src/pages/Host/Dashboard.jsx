import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css modules/Host/Dashboard.module.css';
import { getHostVans, getHostReviews } from '../../firebase/firebase';
import { BsStarFill } from 'react-icons/bs';
import { MdOutlineRateReview } from 'react-icons/md';
import { FaShuttleVan } from 'react-icons/fa';
import Verified from '../../assets/images/verified.svg';
import Pending from '../../assets/images/pending.svg';
import { HostContext } from '../../components/HostContext';
import { AuthContext } from '../../components/AuthContext';
import NameModal from '../Host/Settings/NameModal';
import BarLoader from 'react-spinners/BarLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast'; 

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [vans, setVans] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { last30DaysIncome } = useContext(HostContext);
  const { authUser, isReloading } = useContext(AuthContext);
  const { nameModalOpen, setNameModalOpen } = useContext(HostContext);
  const id = authUser.uid;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vansData = await getHostVans(id);
        const reviewsData = await getHostReviews(id);
        setVans(vansData);
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (authUser && !authUser.displayName) {
      setNameModalOpen(true);
    }
  }, [authUser]);

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
    <section>
      <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 10000 }} />
      {nameModalOpen && <NameModal />}
      {isReloading && (
        <div className={styles.loadingOverlay}>
          <BarLoader color="#ff8c38" />
        </div>
      )}
      <div className={styles.addbtnContainer}>
        <Link to="addvan" className={styles.addbtn}>
          <FaShuttleVan className={styles.vanIcon} alt="Van img" />
          Add new van
        </Link>
      </div>
      <section className={styles.dashboardEarnings}>
        <div className={styles.info}>
          <h2>Welcome {authUser.displayName}!</h2>
          <p>
            Income in last <span>30 days</span>
          </p>
          <h2>$ {last30DaysIncome}</h2>
        </div>
        <Link to="income" className={styles.details}>
          Details
        </Link>
      </section>
      <section className={styles.hostReviews}>
        <h2>Your Reviews</h2>
        <div className={styles.vanReviews}>
          {loading ? (
            <div className={styles.loadingContainer}>
            <PulseLoader color="#313E2D" />
            </div>
          ) : (
            reviews.length === 0 ? (
              <div className={styles.NoDashboardReviews}>
                <h3 className={styles.NoDashboardReviewsText}>
                  <MdOutlineRateReview alt="No reviews img" />
                  No reviews yet!
                </h3>
              </div>
            ) : (
              reviews.slice(0, 3).map((review) => (
                <div key={review.id} className={styles.review}>
                  <div>
                    <div className={styles.info}>
                      <img src={review.userImg}  className={styles.userImg} />
                      <div>
                        {[...Array(review.rating)].map((_, i) => (
                          <BsStarFill className={styles.reviewStar} key={i} />
                        ))}
                        <p className={styles.name}>{review.name}</p>
                        <p className={styles.date}>{review.date}</p>
                      </div>
                    </div>
                    <p className={styles.text}>{review.text}</p>
                  </div>
                </div>
              ))
            )
          )}
        </div>
        <Link to="reviews" className={styles.seeMoreContainer}>
          {reviews.length !== 0 && <button className={styles.seeMore}>See more</button>}
        </Link>
      </section>
      <section className={styles.dashboardVans}>
        <div className={styles.top}>
          <h2>Your listed vans</h2>
        </div>
        <div className={styles.vansList}>
          {loading ? (
             <div className={styles.NoVans}>
             <div className={styles.loadingContainer}>
                 <PulseLoader color="#313E2D" />
             </div>
         </div>
          ) : (
            vans.length === 0 ? (
              <div className={styles.NoDashboardVans}>
                <Link to="addvan" className={styles.NoDashboardVansBtn}>
                  <FaShuttleVan className={styles.vanIcon} alt="Van img" />
                  Get started!
                </Link>
              </div>
            ) : (
              vans.map((van) => (
                <Link to={`/host/vans/${van.id}`} key={van.id}>
                  <div className={styles.vanSingleConatiner}>
                    <div className={styles.vanSingle}>
                      <img src={van.imageUrl} alt={van.name} className={styles.vanSingleImg} />
                      <div className={styles.textContainer}>
                        <div className={styles.title}>
                          <h3>{van.name}</h3>
                          {van.approved ? (
                            <img src={Verified} className={styles.verified} alt="Verified" />
                          ) : (
                            <p className={styles.pending}>
                              <img src={Pending} className={styles.pendingImg} alt="Pending" />
                              Pending
                            </p>
                          )}
                        </div>
                        <p>${van.price} /day</p>
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
