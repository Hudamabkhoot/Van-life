import React, { useEffect, useState } from 'react';
import { getReviewsByVanId } from '../../firebase/firebase'; 
import styles from '../../css modules/Vans/Van.module.css'
import { BsStarFill, BsStar } from 'react-icons/bs'; 

const VanReviews = ({ vanId }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await getReviewsByVanId(vanId);
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings / reviews.length;
        setAverageRating(averageRating);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  }, [vanId]);

  return (
    <div className={styles.VanReviews}>
       {averageRating > 0 ? [...Array(5)].map((_, i) => (
        <React.Fragment key={i}>
          {i < Math.round(averageRating) ? <BsStarFill className={styles.reviewStar} /> : <BsStar className={styles.reviewStar} />}
        </React.Fragment>
      )) : <p className={styles.VanReviewsNew}>new to van life</p>}
    </div>
  );
};

export default VanReviews;
