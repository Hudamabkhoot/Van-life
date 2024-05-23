import React, { useState,useEffect } from "react"
import styles from '../../css modules/Reviews.module.css'
import { BsStarFill } from "react-icons/bs"
import StarRatingsChart from "../../components/StarRatingsChart";
import { getReviews } from '../../firebase'

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

  useEffect(() => {
      async function fetchReviews() {
          try {
              const dataArr = await getReviews();
              setReviews(dataArr);
          } catch (error) {
            console.error("Error fetching transactions:", error);
            throw error;
          }
      }
      fetchReviews();
  }, []);

  console.log(reviews)


     return(
        <section className={styles.hostReviews}>
            <div className={styles.topText}>
                    <h2>Your reviews</h2>
                    <p>
                        Last <span>30 days</span>
                    </p>
                </div>
                <StarRatingsChart
                    reviews={reviews}
                    width={500}
                    height={200}
                />
                <div>{
               reviews.map(review => (
                <div key={review.id} className={styles.review}>
                        <div>
                            {[...Array(review.rating)].map((_, i) => (
                            <BsStarFill className={styles.reviewStar} key={i} />
                            ))}
                            <div className={styles.info}>
                            <p className={styles.name}>{review.name}</p>
                            <p className={styles.date}>{review.date}</p>
                            </div>
                            <p>{review.text}</p>
                        </div>
                    </div> 
                ))}
                </div>
                
        </section>
    )
    }


    /*

*/
