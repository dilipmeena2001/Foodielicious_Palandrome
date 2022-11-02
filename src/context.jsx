import React, { useContext, useEffect, useState } from "react"
import axios from "axios"

const AppContext = React.createContext()

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

const getFavouritesFromLocalStorage = ()=>{
    let favourites = localStorage.getItem("favourites");

    favourites = ((favourites)?JSON.parse(localStorage.getItem("favourites")):[])
    return favourites
}

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage());

    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const { data } = await axios(url);

            if (data.meals) {
                setMeals(data.meals)

            }
            else {
                setMeals([])
            }
        }
        catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const selectMeal = (idMeal, favouriteMeal) => {
        let meal;
        if(favouriteMeal){
            meal = favourites.find((meal) => meal.idMeal === idMeal);    
        }
        else{
            meal = meals.find((meal) => meal.idMeal === idMeal);
        }
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavourites = (idMeal) => {
        const alreadyFavourites = favourites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavourites) return
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const updatedFavourites = [...favourites, meal]
        setFavourites(updatedFavourites)
        localStorage.setItem("favourites",JSON.stringify(updatedFavourites))
    }

    const removeFromFavourites = (idMeal) => {
        const updatedFavourites = favourites.filter((meal) => meal.idMeal !== idMeal)
        setFavourites(updatedFavourites)
        localStorage.setItem("favourites",JSON.stringify(updatedFavourites))
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])
    return (
        <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, closeModal, addToFavourites, removeFromFavourites, favourites }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return (useContext(AppContext))
}

export { AppProvider, AppContext, useGlobalContext }