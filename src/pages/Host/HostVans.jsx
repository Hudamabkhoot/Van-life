import React, { Suspense }  from "react"
import { Link, Await, defer, useLoaderData  } from "react-router-dom"
import styles from '../../css modules/HostVans.module.css'
import { getHostVans, deleteVan } from "../../firebase"


export function loader(){
    return defer( {vans: getHostVans()} )
}

export default function HostVans() {
    const dataPromise = useLoaderData()

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
                        <div className="host-van-info">
                            <h3>{van.name}</h3>
                            <p>${van.price}/day</p>
                        </div>
                        </div>
                    </Link>
                    <div className={styles.btnContainer}>      
                     <button onClick={removeVan} className={styles.btn}>delete
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

    return (
        <section>
            <h1 className={styles.vansTitle}>Your listed vans</h1>
            
            <div className={styles.vansList}>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </Suspense>
            </div>
        </section>
    )
}