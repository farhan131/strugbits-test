import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { useActionState } from 'react';

const Tabs = ({ allMeals }) => {
    const [activeTab, setActiveTab] = useState(1); // Initial active tab (1)

    const [selectedMeals, setSelectedMeals] = useState([])

    const toggleMealSelection = (meal) => {
        setSelectedMeals((prevMeals) => {
            // Check if the meal is already selected
            if (prevMeals.some((selectedMeal) => selectedMeal.id === meal.id)) {
                // If meal exists, remove it from the selectedMeals array
                return prevMeals.filter((selectedMeal) => selectedMeal.id !== meal.id);
            } else {
                // If meal doesn't exist, add it to the selectedMeals array
                return [...prevMeals, meal];
            }
        });
    };


    const [Week1Meals, setWeek1Meals] = useState([])
    const [Week2Meals, setWeek2Meals] = useState([])
    const [Week3Meals, setWeek3Meals] = useState([])
    const [Week4Meals, setWeek4Meals] = useState([])

    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        console.log(Week1Meals);

    }, [Week1Meals])

    return (
        <div className="mx-48 mt-10">
            <h2 className='mb-20 text-3xl font-bold'>Week Orders</h2>

            {/* Tab navigation */}
            <div className="flex border-b">
                <button
                    onClick={() => setActiveTab(1)}
                    className={`py-2 px-4 text-lg font-bold hover:text-blue-800 focus:outline-none w-full ${activeTab === 1 ? 'border-b-4 border-blue-800 text-blue-800' : 'text-gray-700'}`}
                >
                    All Meals
                </button>
                <button
                    onClick={() => setActiveTab(2)}
                    className={`py-2 px-4 text-lg font-bold  hover:text-blue-800 focus:outline-none w-full ${activeTab === 2 ? 'border-b-4 border-blue-800 text-blue-800' : 'text-gray-700'}`}
                >
                    Week 1
                </button>
                <button
                    onClick={() => setActiveTab(3)}
                    className={`py-2 px-4 text-lg font-bold  hover:text-blue-800 focus:outline-none w-full ${activeTab === 3 ? 'border-b-4 border-blue-800 text-blue-800' : 'text-gray-700'}`}
                >
                    Week 2
                </button>
                <button
                    onClick={() => setActiveTab(4)}
                    className={`py-2 px-4 text-lg font-bold  hover:text-blue-800 focus:outline-none w-full ${activeTab === 4 ? 'border-b-4 border-blue-800 text-blue-800' : 'text-gray-700'}`}
                >
                    Week 3
                </button>
                <button
                    onClick={() => setActiveTab(5)}
                    className={`me-36 py-2 px-4 text-lg font-bold  hover:text-blue-800 focus:outline-none w-full ${activeTab === 5 ? 'border-b-4 border-blue-800 text-blue-800' : 'text-gray-700'}`}
                >
                    Week 4
                </button>
                <button className='w-full bg-blue-900 rounded-lg text-white font-bold cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 ' disabled={selectedMeals.length < 1} onClick={() => setModalOpen(true)} >
                    Add Meal
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-20">
                {activeTab === 1 && (
                    <div className='flex flex-wrap px-10'>
                        {
                            allMeals ? allMeals.map((meal, i) => {
                                return <div className="w-1/3 mb-10">
                                    <div className={`p-6 border-2 hover:border-blue-600 rounded-2xl h-full hover:cursor-pointer ${selectedMeals.includes(meal) ? 'border-blue-600' : ''} ${(allMeals.length - 1) % 2 === 0 ? '' : 'me-10'} `} onClick={() => toggleMealSelection(meal)}
                                    >
                                        <div className='relative mb-6'>
                                            <img src={meal.image} className='rounded-2xl h-72 w-full object-cover' alt="" />
                                            <p className='absolute top-0 right-0 bg-black text-white mt-3 me-3 px-6 py-0 rounded font-semibold text-sm'>{meal.mealType[0]}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className='text-3xl font-bold mb-4'>
                                                {meal.name}
                                            </h3>
                                            <p className='mb-4'>
                                                {
                                                    meal.instructions.map(i => {
                                                        return i
                                                    })
                                                }
                                            </p>
                                            <div className='flex justify-between'>
                                                <p><span className='font-bold'>Cuisine: </span> {meal.cuisine}</p>
                                                <p className='flex'>
                                                    <span className='font-bold'> Rating: </span> <div className='me-2'>{meal.rating}</div>
                                                    <StarRating rating={meal.rating} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }) :
                                <div>not found</div>
                        }
                    </div>
                )}
                {activeTab === 2 && (
                    <div className="flex flex-wrap px-10">
                        {allMeals && allMeals.length > 0 ? (
                            allMeals
                                .filter((meal) => Week1Meals.includes(meal.id))
                                .map((meal, i) => (
                                    <div key={meal.id} className="w-1/3 mb-10">
                                        <div
                                            className={`p-6 border-2 rounded-2xl h-full ${(allMeals.length - 1) % 2 === 0 ? "" : "me-10"
                                                }`}
                                        >
                                            <div className="relative mb-6">
                                                <img
                                                    src={meal.image}
                                                    className="rounded-2xl h-72 w-full object-cover"
                                                    alt={meal.name || "Meal"}
                                                />
                                                <button
                                                    className="absolute top-0 left-0 mt-3 ms-3 text-xl p-2 bg-red-100 text-red-900 hover:bg-red-200"
                                                    onClick={() => {
                                                        setWeek1Meals((prev) =>
                                                            prev.filter((mealId) => mealId !== meal.id)
                                                        );
                                                    }}
                                                >
                                                    <svg
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        height="1em"
                                                        width="1em"
                                                    >
                                                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                        />
                                                    </svg>
                                                </button>
                                                <p className="absolute top-0 right-0 bg-black text-white mt-3 me-3 px-6 py-0 rounded font-semibold text-sm">
                                                    {meal.mealType[0]}
                                                </p>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-3xl font-bold mb-4">{meal.name}</h3>
                                                <p className="mb-4">
                                                    {meal.instructions &&
                                                        meal.instructions.map((instruction, idx) => (
                                                            <span key={idx}>{instruction}</span>
                                                        ))}
                                                </p>
                                                <div className="flex justify-between">
                                                    <p>
                                                        <span className="font-bold">Cuisine: </span> {meal.cuisine}
                                                    </p>
                                                    <p className="flex">
                                                        <span className="font-bold">Rating: </span>
                                                        <div className="me-2">{meal.rating}</div>
                                                        <StarRating rating={meal.rating} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div>Not found</div>
                        )}
                    </div>
                )}
                {activeTab === 3 && (
                   <div className="flex flex-wrap px-10">
                   {allMeals && allMeals.length > 0 ? (
                       allMeals
                           .filter((meal) => Week2Meals.includes(meal.id))
                           .map((meal, i) => (
                               <div key={meal.id} className="w-1/3 mb-10">
                                   <div
                                       className={`p-6 border-2 rounded-2xl h-full ${(allMeals.length - 1) % 2 === 0 ? "" : "me-10"
                                           }`}
                                   >
                                       <div className="relative mb-6">
                                           <img
                                               src={meal.image}
                                               className="rounded-2xl h-72 w-full object-cover"
                                               alt={meal.name || "Meal"}
                                           />
                                           <button
                                               className="absolute top-0 left-0 mt-3 ms-3 text-xl p-2 bg-red-100 text-red-900 hover:bg-red-200"
                                               onClick={() => {
                                                   setWeek2Meals((prev) =>
                                                       prev.filter((mealId) => mealId !== meal.id)
                                                   );
                                               }}
                                           >
                                               <svg
                                                   fill="currentColor"
                                                   viewBox="0 0 16 16"
                                                   height="1em"
                                                   width="1em"
                                               >
                                                   <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                                   <path
                                                       fillRule="evenodd"
                                                       d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                   />
                                               </svg>
                                           </button>
                                           <p className="absolute top-0 right-0 bg-black text-white mt-3 me-3 px-6 py-0 rounded font-semibold text-sm">
                                               {meal.mealType[0]}
                                           </p>
                                       </div>
                                       <div className="flex flex-col">
                                           <h3 className="text-3xl font-bold mb-4">{meal.name}</h3>
                                           <p className="mb-4">
                                               {meal.instructions &&
                                                   meal.instructions.map((instruction, idx) => (
                                                       <span key={idx}>{instruction}</span>
                                                   ))}
                                           </p>
                                           <div className="flex justify-between">
                                               <p>
                                                   <span className="font-bold">Cuisine: </span> {meal.cuisine}
                                               </p>
                                               <p className="flex">
                                                   <span className="font-bold">Rating: </span>
                                                   <div className="me-2">{meal.rating}</div>
                                                   <StarRating rating={meal.rating} />
                                               </p>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           ))
                   ) : (
                       <div>Not found</div>
                   )}
               </div>
                )}
                {activeTab === 4 && (
                    <div className="flex flex-wrap px-10">
                    {allMeals && allMeals.length > 0 ? (
                        allMeals
                            .filter((meal) => Week3Meals.includes(meal.id))
                            .map((meal, i) => (
                                <div key={meal.id} className="w-1/3 mb-10">
                                    <div
                                        className={`p-6 border-2 rounded-2xl h-full ${(allMeals.length - 1) % 2 === 0 ? "" : "me-10"
                                            }`}
                                    >
                                        <div className="relative mb-6">
                                            <img
                                                src={meal.image}
                                                className="rounded-2xl h-72 w-full object-cover"
                                                alt={meal.name || "Meal"}
                                            />
                                            <button
                                                className="absolute top-0 left-0 mt-3 ms-3 text-xl p-2 bg-red-100 text-red-900 hover:bg-red-200"
                                                onClick={() => {
                                                    setWeek3Meals((prev) =>
                                                        prev.filter((mealId) => mealId !== meal.id)
                                                    );
                                                }}
                                            >
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    height="1em"
                                                    width="1em"
                                                >
                                                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                    />
                                                </svg>
                                            </button>
                                            <p className="absolute top-0 right-0 bg-black text-white mt-3 me-3 px-6 py-0 rounded font-semibold text-sm">
                                                {meal.mealType[0]}
                                            </p>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-3xl font-bold mb-4">{meal.name}</h3>
                                            <p className="mb-4">
                                                {meal.instructions &&
                                                    meal.instructions.map((instruction, idx) => (
                                                        <span key={idx}>{instruction}</span>
                                                    ))}
                                            </p>
                                            <div className="flex justify-between">
                                                <p>
                                                    <span className="font-bold">Cuisine: </span> {meal.cuisine}
                                                </p>
                                                <p className="flex">
                                                    <span className="font-bold">Rating: </span>
                                                    <div className="me-2">{meal.rating}</div>
                                                    <StarRating rating={meal.rating} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div>Not found</div>
                    )}
                </div>
                )}

                {activeTab === 5 && (
                    <div className="flex flex-wrap px-10">
                    {allMeals && allMeals.length > 0 ? (
                        allMeals
                            .filter((meal) => Week4Meals.includes(meal.id))
                            .map((meal, i) => (
                                <div key={meal.id} className="w-1/3 mb-10">
                                    <div
                                        className={`p-6 border-2 rounded-2xl h-full ${(allMeals.length - 1) % 2 === 0 ? "" : "me-10"
                                            }`}
                                    >
                                        <div className="relative mb-6">
                                            <img
                                                src={meal.image}
                                                className="rounded-2xl h-72 w-full object-cover"
                                                alt={meal.name || "Meal"}
                                            />
                                            <button
                                                className="absolute top-0 left-0 mt-3 ms-3 text-xl p-2 bg-red-100 text-red-900 hover:bg-red-200"
                                                onClick={() => {
                                                    setWeek4Meals((prev) =>
                                                        prev.filter((mealId) => mealId !== meal.id)
                                                    );
                                                }}
                                            >
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    height="1em"
                                                    width="1em"
                                                >
                                                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                    />
                                                </svg>
                                            </button>
                                            <p className="absolute top-0 right-0 bg-black text-white mt-3 me-3 px-6 py-0 rounded font-semibold text-sm">
                                                {meal.mealType[0]}
                                            </p>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-3xl font-bold mb-4">{meal.name}</h3>
                                            <p className="mb-4">
                                                {meal.instructions &&
                                                    meal.instructions.map((instruction, idx) => (
                                                        <span key={idx}>{instruction}</span>
                                                    ))}
                                            </p>
                                            <div className="flex justify-between">
                                                <p>
                                                    <span className="font-bold">Cuisine: </span> {meal.cuisine}
                                                </p>
                                                <p className="flex">
                                                    <span className="font-bold">Rating: </span>
                                                    <div className="me-2">{meal.rating}</div>
                                                    <StarRating rating={meal.rating} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div>Not found</div>
                    )}
                </div>
                )}
            </div>

            <div id="myModal" className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ${modalOpen ? '' : 'hidden'}`}>
                <div class="bg-white rounded-lg shadow-lg w-1/3 p-10">
                    <div class="flex items-center justify-center">
                        <h2 class="text-2xl font-bold">Select Week</h2>
                        {/* <button id="closeModal" class="text-xl text-gray-600 hover:text-gray-800">&times;</button> */}
                    </div>
                    <div className="flex justify-between my-10 mx-8">
                        <button
                            className={`hover:bg-blue-100 px-6 py-2 text-xl font-semibold rounded-lg ${Week1Meals.some(meal => selectedMeals.some(selected => selected.id === meal)) ? 'bg-blue-100' : ''}`}
                            onClick={() => {
                                const updatedMeals = Week1Meals.some(meal => selectedMeals.some(selected => selected.id === meal))
                                    ? Week1Meals.filter(meal => !selectedMeals.some(selected => selected.id === meal))
                                    : [...Week1Meals, ...selectedMeals.map(meal => meal.id)];

                                setWeek1Meals(updatedMeals);
                            }}
                        >
                            Week 1
                        </button>

                        <button
                            className={`hover:bg-blue-100 px-6 py-2 text-xl font-semibold rounded-lg ${Week2Meals.some(meal => selectedMeals.some(selected => selected.id === meal)) ? 'bg-blue-100' : ''}`}
                            onClick={() => {
                                const updatedMeals = Week2Meals.some(meal => selectedMeals.some(selected => selected.id === meal))
                                    ? Week2Meals.filter(meal => !selectedMeals.some(selected => selected.id === meal))
                                    : [...Week2Meals, ...selectedMeals.map(meal => meal.id)];

                                setWeek2Meals(updatedMeals);
                            }}
                        >
                            Week 2
                        </button>

                        <button
                            className={`hover:bg-blue-100 px-6 py-2 text-xl font-semibold rounded-lg ${Week3Meals.some(meal => selectedMeals.some(selected => selected.id === meal)) ? 'bg-blue-100' : ''}`}
                            onClick={() => {
                                const updatedMeals = Week3Meals.some(meal => selectedMeals.some(selected => selected.id === meal))
                                    ? Week3Meals.filter(meal => !selectedMeals.some(selected => selected.id === meal))
                                    : [...Week3Meals, ...selectedMeals.map(meal => meal.id)];

                                setWeek3Meals(updatedMeals);
                            }}
                        >
                            Week 3
                        </button>

                        <button
                            className={`hover:bg-blue-100 px-6 py-2 text-xl font-semibold rounded-lg ${Week4Meals.some(meal => selectedMeals.some(selected => selected.id === meal)) ? 'bg-blue-100' : ''}`}
                            onClick={() => {
                                const updatedMeals = Week4Meals.some(meal => selectedMeals.some(selected => selected.id === meal))
                                    ? Week4Meals.filter(meal => !selectedMeals.some(selected => selected.id === meal))
                                    : [...Week4Meals, ...selectedMeals.map(meal => meal.id)];

                                setWeek4Meals(updatedMeals);
                            }}
                        >
                            Week 4
                        </button>
                    </div>

                    <div class="mt-4 flex justify-center">
                        <button id="closeModalButton" className="bg-blue-700 text-white font-bold px-16 py-2 rounded hover:bg-blue-600" onClick={e => {
                            setModalOpen(false)
                            setSelectedMeals([])
                        }}>Save</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Tabs;
