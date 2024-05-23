import React, { Suspense } from 'react'
import { defer, Await, useLoaderData } from 'react-router-dom'
import styles from '../../css modules/Reviews.module.css'
import { useOutletContext } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getReviewsByVanId } from '../../firebase'

export function loader( {params} ){
    return defer( { reviews: getReviewsByVanId(params.id)})
}

export default function HostVanInfo() {
    const { currentVan } = useOutletContext()
    const dataPromise = useLoaderData()

    return (
        <section className="host-van-detail-info">
            <h4>Name: <span>{currentVan.name}</span></h4>
            <h4>Category: <span>{currentVan.type}</span></h4>
            <h4>Description: <span>{currentVan.description}</span></h4>
            <h4>Visibility: <span>Public</span></h4>
            <div>
                <h2>{currentVan.name} Reviews</h2>
                <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={dataPromise.reviews}>
                    {(reviews) => (
                    <div>
                        {reviews.map((review) => (
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
                )}
                </Await>
            </Suspense>  
            </div>
        </section>
    )
}