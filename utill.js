export const getFormattedDate =(targetDate) =>{
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() +1;
    let date = targetDate.getDate();
    if(month<10) month = `0${month}`;
    if(date<10) date = `0${date}`;
    return `${year}-${month}-${date}`;    
}

export const getDateDif=(targetDate)=>{
    const today = new Date();
    const date = new Date(targetDate)
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}