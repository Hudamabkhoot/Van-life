import React, {Suspense} from 'react'
import { Link, defer, useLoaderData, Await } from 'react-router-dom'
import styles from '../../css modules/Dashboard.module.css'
import { getHostVans, getHostReviews, deleteVan, getTransactions } from '../../firebase'
import { BsStarFill } from "react-icons/bs"
import Van from '../../assets/images/van.svg'
import Verified from '../../assets/images/verified.svg'
import Pending from '../../assets/images/pending.svg'

export function loader(){
    return defer( { vans:getHostVans(), transactions: getTransactions(), reviews: getHostReviews() } )
}

export default function Dashboard(){
    const loaderData = useLoaderData()

    function renderHost(transactions){
        let last30DaysIncome = 0

        const last30DaysTransactions = transactions
            .map(item => ({ ...item, date: new Date(item.date) }))
            .filter(item => new Date() - item.date <= 30 * 24 * 60 * 60 * 1000);
            last30DaysIncome = last30DaysTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        
        return( 
            <section className={styles.dashboardEarnings}>
            <div className={styles.info}>
                    <h2>Welcome!</h2>
                    <p>Income in last <span>30 days</span></p>
                    <h2>$ {last30DaysIncome}</h2>
                </div>
                <Link 
                to="income"
                className={styles.details}
                >Details</Link>
              </section>
        )
    }


    function renderVanElements(vans){
        const hostVanEls = vans.map(van => {
            let url = '/host/vans/'+ van.id
            
            function removeVan(vanId){
                vanId = van.id
                alert('Are you sure you want to delete this van? This cannot be undone.')
                try {
                    deleteVan(vanId)
                } catch(err){
                    return {
                        error: err.message
                    }
                }finally {
                    alert('This van has been deleted')
                  }
            }
            return(
          
                <div key={van.id} className={styles.vanSingleConatiner}>
                    <Link to={url}>
                        <div className={styles.vanSingle}>
                        <img src={van.imageUrl} alt={van.name} className={styles.vanSingleImg}/>
                        <div>
                            <div className={styles.title}>
                            <h3>{van.name}</h3>
                            {van.approved ? 
                            <img src={Verified} className={styles.verified}/> 
                            : 
                            <p className={styles.pending}>
                                 <img src={Pending} className={styles.pendingImg}/>
                                Pending
                                </p>}
                            </div>
                            <p>${van.price} /day</p>
                        </div>
                        </div>
                    </Link>
                    <div className={styles.btnContainer}>      
                     <button onClick={removeVan} className={styles.deleteBtn}>delete
                    </button>
                    </div>
                </div>
            
            )
            }
        )
        return(
            <section className={styles.vansList}>
                <div>{hostVanEls}</div>
            </section>
        )
    }


    function renderReviews(reviews){
        const reviewsEl = reviews.map(review => (
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
        )).slice(0, 3)
        return(
            <section className={styles.vansList}>
                <div>{reviewsEl}</div>
            </section>
        )
    }


    function renderNoReviews(reviews) {
        if (reviews.length === 0) {
            return (
                    <div className={styles.getStartedContainer}>
                <Link
                    to="addvan"
                    className={styles.addbtn}
                    >
                        <img src={Van}  alt="Van img" />
                        Get started</Link>
                 </div>
            );
        }
    }
    return(
        <section>
            <div className={styles.addbtnContainer}>
                <Link
                    to="addvan"
                    className={styles.addbtn}
                    >
                        <img src={Van}  alt="Van img" />
                        Add new van</Link>
                 </div>
            <Suspense fallback={<h2>Welcome!</h2>}>
                <Await resolve={loaderData.transactions}>
                    {renderHost}
                </Await>
            </Suspense>
            <section className={styles.hostReviews}>
            <h2>Your Reviews</h2>
            <Suspense fallback={<h2>Loading reviews...</h2>}>
                <Await resolve={loaderData.reviews}>
                    {renderReviews}
                </Await>
            </Suspense>
            </section>
            <section  className={styles.seeMoreContainer}>
            <Link
                    to="reviews"
                >
                    <button
                    className={styles.seeMore}>
                        See more
                    </button>
                </Link>
            </section>

            <section className={styles.dashboardVans}>
                <div className={styles.top}>
                    <h2>Your listed vans</h2>
                </div>
                <Suspense  fallback={<h2>Loading vans...</h2>}>
                    <Await resolve={loaderData.vans}>
                        {renderVanElements}
                    </Await>
                </Suspense>
                <Suspense  fallback={<h2>Loading vans...</h2>}>
                    <Await resolve={loaderData.vans}>
                        {renderNoReviews}
                    </Await>
                </Suspense>
            </section>
        </section>
        
    )
}