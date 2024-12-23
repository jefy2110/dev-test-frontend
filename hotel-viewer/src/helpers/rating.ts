const ratingMap = [
    { min: 4.6, description: 'Excellent', color: '#4c75af' },  
    { min: 4, description: 'Great', color: '#4CAF50' },        
    { min: 3, description: 'Good', color: '#FF9800' },        
    { min: 2, description: 'Fair', color: '#F44336' },                 
  ];
  
  export const getRatingDetails = (rating: number) => {
    const match = ratingMap.find((item) => rating >= item.min);
    return match ? match : { description: 'Unknown', color: '#9E9E9E' }; 
  };