const protect ={

    tokenBased:()=>{
        const token = localStorage.getItem('token');
        if(!token){
            return false;
        }
        return true;
    }
}


export default protect;
