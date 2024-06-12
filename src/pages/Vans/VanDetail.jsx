import React, { Suspense, useContext, useEffect } from 'react'
import { Link, useLocation, defer, Await, useLoaderData, Form, useParams  } from 'react-router-dom'
import styles from '../../css modules/Vans/VanDetail.module.css'
import { getVan, getReviewsByVanId, addReview } from '../../firebase/firebase'
import { BsStarFill } from "react-icons/bs"
import { IoChevronBackOutline } from "react-icons/io5";
import { AuthContext }  from '../../components/AuthContext'
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-hot-toast'; 
import RentModal from '../Host/Settings/RentModal';
import { Toaster } from 'react-hot-toast';
import BarLoader from "react-spinners/BarLoader";
import { MdOutlineRateReview } from "react-icons/md";
import VanReviews from '../Vans/VanReviews'

export function loader( {params} ){
  return defer( { 
    van: getVan(params.id),
    reviews: getReviewsByVanId(params.id)},
     )}


export default function VanDetail(){
  const { id } = useParams()
  const location = useLocation()
  const loaderData = useLoaderData()
  const type = location.state?.type || 'all';
  const search = location.state?.search || "";
  const { 
        authUser, 
        isReloading, 
        setIsReloading, 
        showRentModal, 
        handleShowRentModal,
        handleCloseRentModal
      } = useContext( AuthContext )
  const vanId = id;
  const userImg = authUser ? authUser.photoURL : '';
  const name = authUser ? authUser.displayName : '';
  const hostId =  authUser ? authUser.uid : '';

  const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const options = {year: 'numeric', month: 'long', day: 'numeric' };
      const day = new Date().toLocaleDateString('en-US', options);
      const rating = parseInt(formData.get('rating'), 10);
      const text = formData.get('review');
     
      try {
          await addReview(day, name, rating, text, vanId, userImg, hostId);
          setIsReloading(true);
        setTimeout(() => {
            setIsReloading(false);
            window.location.reload();
        }, 5000); 
      } catch (error) {
        setIsReloading(false);
      }
  };

  useEffect(() => {
    if (isReloading) {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 4000)),
            {
              loading: 'Adding review...',
              success: 'Review added successfully!',
              error: 'Error adding review',
            }
        );
    }
}, [isReloading]);

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

    return(
        <section className={styles.vanDetailContainer}> 
         <Toaster
                position="top-center"
                reverseOrder={false}
                containerStyle={{
                  zIndex: 10000
              }}
            />
           {showRentModal && <RentModal onClose={handleCloseRentModal} />}
         <Link to={`..${search}`}
          className={styles.backButton}
          relative='path'><IoChevronBackOutline className={styles.backIcon}/><span>Back to all {type} vans </span> </Link>
          <Suspense fallback={
            <div className={styles.loadingContainer}>
                     <PulseLoader color="#313E2D" />
            </div>

          }>
            <Await resolve={loaderData.van}>
              {(van) => (
                  <div className={styles.vanDetail}>
                    <img src={van.imageUrl}/>
                    <div className={styles.vanDetailInfo}>
                      <i className={`van-type ${van.type} selected`}>
                          {van.type}
                      </i>
                      <div className={styles.vanRating}>
                        <h2>{van.name}</h2>
                        <VanReviews vanId={van.id}/>
                      </div>
                      <p className={styles.vanPrice}>${van.price}/day</p>
                      <p>{van.description}</p>
                    <button  onClick={handleShowRentModal} className={styles.linkButton}>Rent this van</button>
                    </div>
                  </div>
              )}
            </Await>
          </Suspense>
            {isReloading 
                  && (
                  <div className={styles.loadingOverlay}>
                            <BarLoader color="#ff8c38" />
                      </div>    
                      )}
                {!authUser && (
                  <div className={styles.NoReviews}>
                     <div   className={styles.NoReviewsTextTop}>
                        <h3 className={styles.reviewsIconContainer}> <MdOutlineRateReview alt="No reviews img" className={styles.reviewsIcon}/> Log in or  Sign up</h3>
                        <p>to view other users' reviews and leave your own!</p>
                     </div>
                        <div   className={styles.NoReviewsTextBottom}>
                        <Link to="/login" className={styles.linkButtonBottom}>Join Us</Link>
                        </div>
              </div>  
                )}
                {authUser && 
                <div   className={styles.reviewContainer}>
                    <h2>Rate your experience</h2>
                    <Form 
                      method='post' 
                      onSubmit={handleSubmit}
                      className={styles.reviewForm}
                      >
                      <textarea
                      name="review"
                      type='text'
                      placeholder='Tell us about your experince'
                      minLength="150" maxLength="900" 
                      />
                    <select name='rating'>
                    <option value='5'>5</option>
                    <option value='4'>4</option>
                    <option value='3'>3</option>
                    <option value='2'>2</option>
                    <option value='1'>1</option>
                    </select>
                    <button type='submit'>
                      Add Your Review</button>
                    </Form>
                    </div>  
                    } 
                     {authUser && 
                    <Suspense fallback={
                      <div className={styles.loadingContainer}>
                          <PulseLoader color="#313E2D" />
                      </div>

                    }>
                    <Await resolve={loaderData.reviews}>
                    {(reviews) => (
                      <div className={styles.vanReviews}>
                        {reviews.map((review) => (
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
                        ))}
                      </div>
                    )}
                  </Await>
                </Suspense>
}
        </section>
    )

}


