import React from 'react'
import { useGlobalContext } from '../context'

const Favourites = () => {
  const {favourites,selectMeal,removeFromFavourites} = useGlobalContext()
  return (
    <section className='favourites'>
        <div className='favourites-content'>
          <h5>Favourites</h5>
          <div className='favourites-container'>
            {favourites.map((item)=>{
              const {idMeal,strMeal:title, strMealThumb: image} = item;

              return <div key={idMeal} className="favourites-item">
                <img src={image} alt={title} className="favourites-img img" onClick={()=>{selectMeal(idMeal,true)}}/>
                <button className='remove-btn' onClick={()=>{removeFromFavourites(idMeal)}}>remove</button>

              </div>
            })}
          </div>
        </div>
      </section>
  )
}

export default Favourites