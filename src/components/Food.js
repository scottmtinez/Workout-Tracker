import React, { useState, useEffect } from 'react';
import './Food.css';

const Food = () => {
    //States
        const [user, setUser] = useState(null);
        const [query, setQuery] = useState("");
        const [nutritionData, setNutritionData] = useState([]);
    
      // Retrieve user data from localStorage when the component mounts
        useEffect(() => {
          const storedUser = localStorage.getItem('user');
    
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log('User data retrieved from localStorage:', storedUser); // For Testing
          }
        }, []); // Runs only once when the component mounts

      // Fetch Nutrition Data
        const handleSearch = async () => {
          if (!query) return;
          const data = await fetchNutritionData(query);
          if (data) setNutritionData(data);
        };

      // Fetch Nutrition Data Function
        const fetchNutritionData = async (query) => {
          try {
            const response = await fetch(`http://localhost:5000/api/nutrition?query=${encodeURIComponent(query)}`);
        
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
        
            return await response.json();
          } catch (error) {
            console.error("Error fetching nutrition data:", error);
            return null;
          }
        };
        

    return (
        <div className='Food-container'>
            <div className='Food-container'>
                {/*Food / Calorie Tracker Page - Coming Soon...*/}
                <h2>Calorie & Nutrition Tracker</h2>
                <input
                  type="text"
                  placeholder="Enter food items (e.g., 1 apple, 2 eggs)"
                  value={query}
                  className='Food-input-box'
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className='Food-input-btn' onClick={handleSearch}>Get Nutrition Info</button>

                {nutritionData.length > 0 && (
                  <div>
                    <ul>
                      {nutritionData.map((item, index) => (
                        <li key={index}>
                          <h3 className='Food-name-title'>{item.name}</h3>
                          <p>{item.calories} kcal</p>
                          <p>{item.protein_g}g Protein</p>
                          <p>{item.fat_total_g}g Fat</p>
                          <p>{item.carbohydrates_total_g}g Carbs</p>
                          <p>{item.serving_size_g}g Serving Size</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
        </div>
    );
}

export default Food;
