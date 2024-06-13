import React, { Suspense, useEffect } from 'react'
import { defer, Await, useLoaderData } from 'react-router-dom'
import styles from '../../css modules/Host/HostVanInfo.module.css'
import { useOutletContext } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getReviewsByVanId } from '../../firebase/firebase'
import { MdOutlineRateReview } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";

export function loader({ params }) {
    return defer({ reviews: getReviewsByVanId(params.id) })
}

export default function HostVanInfo() {
    const { currentVan } = useOutletContext()
    const dataPromise = useLoaderData()
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    function renderReviewsElements(reviews){ 
        if (reviews.length === 0) {
            return (
                <div className={styles.NoDashboardReviews}>
                <h3
                    to="addvan"
                    className={styles.NoDashboardReviewsText}
                    >
                        <MdOutlineRateReview alt="No reviews img" />
                       No reviews yet!</h3>
            </div>  
            );
        }

        const reviewsEl = reviews.map(review => (
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
        return(
            <section className={styles.hostReviews}>
                 <div className={styles.topText}>
                    <h2>{currentVan.name} Reviews</h2>
                </div>
                {reviewsEl}
            </section>
        )
        }



    return (
        <section className={styles.detailInfo}>
            <h4>Name: <span>{currentVan.name}</span></h4>
            <h4>Category: <span>{currentVan.type}</span></h4>
            <div  className={styles.description}>
            <h4>Description:</h4><span>{currentVan.description}</span>
            </div>
            <h4>Visibility: <span>Public</span></h4>

            <div>
                <Suspense fallback={ 
                <div className={styles.NoVans}>
                <div className={styles.loadingContainer}>
                <PulseLoader color="#313E2D" />
                    </div>
                </div>
            }>
                    <Await resolve={dataPromise.reviews}>
                       {renderReviewsElements}
                    </Await>
                </Suspense>
            </div>
        </section>
    )
}
