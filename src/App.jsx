import { useEffect, useState } from 'react'
import './App.css'
import Tabs from './Tabs'
import MealPlanner from './MealPlanner'
import axios from 'axios'

function App() {
  const [allMeals, setAllMeals] = useState()
  useEffect(() => {
    axios.get('https://dummyjson.com/recipes')
      .then(response => {
        setAllMeals(response.data.recipes); // Assuming API returns an array of recipes
      })
      .catch(error => {
        console.error("Error fetching meals:", error);
      });
  }, []);

  return (
    <>
      <div className="relative">
        <div className="relative bg-[url('https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?t=st=1734717769~exp=1734721369~hmac=16c9f2f8eb1987b1f602e754ccede0e48242a02f5812052e3ba6741bb564ca96&w=826')] bg-cover bg-center h-64 flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-white opacity-70"></div>
          <h1 className='text-4xl mb-2 font-bold text-slate-800 z-10'>Optimized Your Meal</h1>
          <p className='z-10'>
            Select Meal to Add in Week. You will be able to edit. Modify and change Meal Weeks.
          </p>
        </div>
        <div>
          <Tabs allMeals={allMeals} />
        </div>
      </div>
    </>
  )
}

export default App
