const refresh = async () => {
    console.log('Refresh function called');
    console.log(new Date().toISOString());
    return '1';
  };
  
  export default refresh;