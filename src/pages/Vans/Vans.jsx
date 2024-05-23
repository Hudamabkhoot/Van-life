import React from 'react'
import { Suspense } from 'react'
import { Link, useSearchParams, useLoaderData, Await, defer } from 'react-router-dom'
import styles from '../../css modules/Van.module.css'
import { getAllVans } from '../../firebase'

export function loader(){
    return defer( {vans: getAllVans()} )
}

export default function Vans(){

    const [ searchParams, setSearchParams ] = useSearchParams()
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get('type')

    function handleFilterChange(key,value){
        setSearchParams(prevParams => {
            if(value === null){
                prevParams.delete(key)
            } else {
                prevParams.set(key,value)
            }
            return prevParams
        })
    }

    
    function renderVanElements(vans){
        const filteredVans = typeFilter ? vans.filter(van => van.type.toLowerCase() === typeFilter) : vans

        const vanElements = filteredVans.map(van => (
                <div key={van.id} className={styles.vanTile}>
                    <Link to={van.id} 
                        state={{ 
                            search: `?${searchParams.toString()}`,
                            type: typeFilter
                        }}>
                        <img src={van.imageUrl}/>
                        <div className="van-info">
                        <h2>{van.name}</h2>
                        <p>${van.price}<span>/day</span></p>
                        </div>
                        <span 
                        className={`van-type ${van.type} selected`}>
                            {van.type}
                        </span>
                    </Link>
                </div>
            ))
            return (
                <>
                <section className={styles.vanListFilterButtons}>
                    <button 
                        onClick={() => handleFilterChange('type', 'simple')} 
                        className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>
                        Simple
                    </button>
                    <button 
                        onClick={() => handleFilterChange('type', 'rugged')} 
                        className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>
                        Rugged
                    </button>
                    <button 
                        onClick={() => handleFilterChange('type', 'luxury')} 
                        className={ `van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>
                        Luxury
                    </button>
                    {
                        typeFilter 
                        ? 
                        <button 
                        className="van-type clear-filters"
                        onClick={() => handleFilterChange('type', null)}>
                            Clear Filters
                        </button>
                        : null
                    }    
                </section>
                <section className={styles.vanList}>
                    {vanElements}
                </section>
                </>
            )
    }

     return(
        <section className={styles.vanListContainer}>
            <h1>Explore our van options</h1>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={dataPromise.vans}>
                {renderVanElements}
                </Await>
            </Suspense>
        </section>
    )
}


