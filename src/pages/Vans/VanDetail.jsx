import React, { Suspense } from 'react'
import { Link, useLocation, defer, Await, useLoaderData, Form, useParams  } from 'react-router-dom'
import styles from '../../css modules/VanDetail.module.css'
import { getVan, getReviewsByVanId, addReview } from '../../firebase'
import { BsStarFill } from "react-icons/bs"

export function loader( {params} ){
  return defer( { 
    van: getVan(params.id),
    reviews: getReviewsByVanId(params.id)},
     )}


export default function VanDetail(){
  const { id } = useParams()
  const location = useLocation()
  const dataPromise = useLoaderData()
  const type = location.state?.type || 'all';
  const search = location.state?.search || "";

  const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const today = new Date().toLocaleDateString('en-US', options);
      const date = today;
      const name = 'huda';
      const rating = parseInt(formData.get('rating'), 10);
      const text = formData.get('review');
      const vanId = id;
      try {
          await addReview(date, name, rating, text, vanId);
          alert('Your review has been added!');
          // Redirect to appropriate page after successful review addition
      } catch (error) {
          console.error('Error adding review:', error);
          // Handle error (e.g., display error message)
      }
  };

    return(
        <section className={styles.vanDetailContainer}> 
         <Link to={`..${search}`}
          className={styles.backButton}
          relative='path'>&larr; <span> Back to all {type} vans </span> </Link>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.van}>
              {(van) => (
                  <div className={styles.vanDetail}>
                    <img src={van.imageUrl}/>
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                      <h2>{van.name}</h2>
                      <p className={styles.vanPrice}>${van.price}/day</p>
                      <p>{van.description}</p>
                    <Link to='' className={styles.linkButton}>Rent this van</Link>
                  </div>
              )}
            </Await>
          </Suspense>
                <div>
                    <h2>Reviews:</h2>
                    <Form 
                      method='post' 
                      onSubmit={handleSubmit}
                      className={styles.reviewForm}
                      >
                      <textarea
                      name="review"
                      type='text'
                      placeholder='Van Description'
                      />
                    <select name='rating'>
                    <option value=''>--Rate your experience--</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    </select>
                    <button type='submit'>
                      Add Your Review</button>
                    </Form>
                    </div>
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
        </section>
    )

}


