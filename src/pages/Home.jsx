import React from "react";
import { Suspense } from 'react'
import { Link, useLoaderData, Await, defer } from 'react-router-dom'
import styles from '../css modules/Home.module.css';
import { getAllVans, getReviews } from '../firebase/firebase'
import Join from '../assets/images/joinUs.png'
import { BsStarFill } from "react-icons/bs"
import PulseLoader from "react-spinners/PulseLoader";
import { Toaster } from 'react-hot-toast';
import VanReviews from '../pages/Vans/VanReviews'

export function loader(){
    return defer( {vans: getAllVans(), allTestimonials: getReviews()} )
}

export default function Home() {
    const dataPromise = useLoaderData()

    function renderVanElements(vans){
        const vanElements = vans.map(van => (
                <div key={van.id} className={styles.vanTile}>
                    <Link to={`vans/${van.id}`}>
                        <img src={van.imageUrl}/>
                        <div className={styles.vanInfo}>
                        <h3>{van.name}</h3>
                        <p>${van.price}</p>
                        </div>
                        <span 
                        className={`van-type ${van.type} selected van-tiles-type`}>
                            {van.type}
                        </span>
                        <VanReviews vanId={van.id}/>
                    </Link>
                </div>
            )).slice(0,4)
            return (
                <section className={styles.vanList}>
                    {vanElements}
                    <Link to="vans" className={styles.seeMore}>See more</Link>
                </section>
            )
    }

    function renderTestimonialsElements(allTestimonials){
        const reviewsEl = allTestimonials.map(review => (
            <div key={review.id} className={styles.review}>
                <img src={review.img} className={styles.userImg}/>
                    <div className={styles.reviewContainer}>
                        <div className={styles.reviewStars}>
                        {[...Array(review.rating)].map((_, i) => (
                        <BsStarFill className={styles.reviewStar} key={i} />
                        ))}
                        </div>
                        <div className={styles.info}>
                        <p className={styles.name}>{review.name}</p>
                        <p className={styles.date}>{review.date}</p>
                        </div>
                        <p className={styles.text}>{review.text}</p>
                    </div>
                  
                </div> 
        )).slice(0, 7)
        return(
            <section className={styles.hostReviews}>
               {reviewsEl}
            </section>
        )
        }
    

    return (
        <section>
             <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className={styles.homeContainer}>
                <h1>Welcome to Van Life Adventures!</h1>
                <p>You've got the travel plans, and we've got the travel vans.</p>
                <Link to="vans">Explore Our Vans</Link>
            </div> 
            <div className={styles.featuredVans}>
                <h2>Featured Vans</h2>
                <Suspense fallback={
                 <div className={styles.NoVans}>
                 <div className={styles.loadingContainer}>
                 <PulseLoader color="#313E2D" />
                     </div>
             </div>
                }>
                    <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                    </Await>
                </Suspense>
            </div>
            <div className={styles.testimonials}>
            <h2>Testimonials From Our Adventurers</h2>
            <Suspense  fallback={
                <div className={styles.NoVans}>
                <div className={styles.loadingContainer}>
                <PulseLoader color="#313E2D" />
                    </div>
                 </div>
                }>
                    <Await resolve={dataPromise.allTestimonials}>
                        {renderTestimonialsElements}
                    </Await>
                </Suspense>
                </div>  
            <section className={styles.join}>
                <div>
                <img src={Join} />
                </div>

                <div className={styles.joinText}>
                   <span>Are you ready to embark on unforgettable adventures?</span>
                   <p>Join our vibrant community of adventurers <span className={styles.today}>today!</span></p>
                   <Link to="register">Join Us</Link>
                </div>
            </section>
        </section>
    );
}




