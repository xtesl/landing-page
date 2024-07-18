
function checkDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    const currentDay = days[now.getDay()];
  
    if (currentDay === "Monday" || currentDay === "Thursday") {
      return true;
    } else {
      console.log("No specific action required today.");
      return false;
      
    }
  }