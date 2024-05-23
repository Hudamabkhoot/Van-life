import React, { Suspense } from 'react'
import { defer, Await, useLoaderData } from 'react-router-dom'
import { Link, NavLink, Outlet } from 'react-router-dom'
import styles from '../../css modules/HostVanDetail.module.css'
import { getVan } from '../../firebase'

export function loader( {params} ){
    return defer( { van: getVan(params.id)})
}

export default function HostVanDetail(){

    const dataPromise = useLoaderData()

    function renderHostVanDetail(currentVan){
        const activeStyles = {
            fontWeight: 'bold',
            textDecoration: 'underline',
            color: '#161616',
         }
        
        return(
                <div key={currentVan.id} width={150} className={styles.hostVanDetailContainer}>
                    
                    <div className={styles.hostVanDetail}>
                        <img src={currentVan.imageUrl}></img>
                        <div className={styles.hostVanDetailInfo}>
                        <i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i> 
                            <h3>{currentVan.name}</h3>
                            <p>${currentVan.price} /day</p>
                        </div>
                    </div>
                
                    <div>
                        <nav className={styles.hostVanDetailNav}>
                            <NavLink to='.' end style={({isActive}) => isActive ? activeStyles : null }>Details</NavLink>
                            <NavLink to='pricing' style={({isActive}) => isActive ? activeStyles : null }>Pricing</NavLink>
                            <NavLink to='photos' style={({isActive}) => isActive ? activeStyles : null }>Photos</NavLink>
                        </nav>
                        <Outlet context={ {currentVan} }/>
                    </div>
                </div>
        )
    }

    return(
        <section>
            <Link to='..'
            className={styles.backButton}
            relative='path'>&larr; <span>Back to all vans</span></Link>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={dataPromise.van}>
                    {renderHostVanDetail}
                </Await>
            </Suspense>
        </section>
       
    )
}