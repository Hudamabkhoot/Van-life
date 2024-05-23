import React, { Suspense } from 'react'
import { Link, useLocation, defer, Await, useLoaderData, useActionData, Form  } from 'react-router-dom'
import styles from '../../css modules/VanDetail.module.css'
import { getVan } from '../../firebase'

export function loader( {params} ){
  return defer( { van: getVan(params.id) })
}

export default function VanDetail(){
    const location = useLocation()
    const dataPromise = useLoaderData()
    const data = useActionData()

    const type = location.state?.type || 'all';
    const search = location.state?.search || "";

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
                    <div>
                    <h2>{van.name} Reviews:</h2>
                    <Form method='post'>
                      <textarea
                      name="review"
                      type='text'
                      placeholder='Van Description'
                      />
                    <input
                    name="rating"
                    type='text'
                    placeholder='Rating'
                    />
                    <button type='submit'>
                      Add Your Van</button>
                    </Form>
                    </div>
                  </div>
              )}
            </Await>
          </Suspense>
        </section>
    )

}