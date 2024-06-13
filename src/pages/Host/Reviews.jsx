import React, { useEffect, useState, useContext } from 'react';
import styles from '../../css modules/Host/Reviews.module.css';
import { BsStarFill } from 'react-icons/bs';
import StarRatingsChart from '../../components/StarRatingsChart';
import { getHostReviews } from '../../firebase/firebase';
import { AuthContext } from '../../components/AuthContext';
import { MdOutlineRateReview } from 'react-icons/md';
import PulseLoader from 'react-spinners/PulseLoader';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useContext(AuthContext);
  const id = authUser.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsData = await getHostReviews(id);
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <section>
      {loading ? (
        <div className={styles.NoVans}>
          <div className={styles.loadingContainer}>
            <PulseLoader color="#313E2D" />
          </div>
        </div>
      ) : (
        <section className={styles.hostReviews}>
          {reviews.length === 0 ? (
            <div className={styles.NoReviews}>
              <h2 className={styles.NoReviewsText}>
                <MdOutlineRateReview alt="No reviews img" />
                No reviews yet!
              </h2>
            </div>
          ) : (
            <div>
              <div className={styles.topText}>
                <h1>Your reviews</h1>
                <p>
                  Last <span>30 days</span>
                </p>
              </div>
              <StarRatingsChart reviews={reviews} width={500} height={200} />
              <div>
                {reviews.map((review) => (
                  <div key={review.id} className={styles.review}>
                    <div>
                      <div className={styles.info}>
                        <img src={review.userImg} className={styles.userImg} />
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
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </section>
  );
}
