const generateOTP = async ()=>{
    try{
        return (otp=`${Math.floor(1000000 + Math.random() * 9000)}`);
    }catch (err) {
        throw error;
    }
};

module.exports=generateOTP;