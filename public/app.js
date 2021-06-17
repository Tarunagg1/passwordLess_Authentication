const login_form = document.getElementById('login-form');
const codeinput = document.getElementById('codeinput')

const BASE_URL = "http://localhost:5000";

let mobilenumber;
let isotpDelivered = false;

login_form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    mobilenumber = parseInt(document.getElementById('number').value);
    if(isNaN(mobilenumber)){
        alert("INvalid number")
    }else{
        /// precess
        if(isotpDelivered){
            const code = document.getElementById("code").value;
            const response = await verifyOtp(mobilenumber,code);
            if(response.verification_check.status === "approved"){
                alert("Approved")
            }
            return;
        }
        const resp = await sendVerificationCode(mobilenumber);
        if(resp.status === "pending"){
            codeinput.parentElement.classList.remove('hidden');
            isotpDelivered = true;
        }
    }
})

async function sendVerificationCode(number){
    const resp = await axios.post(`${BASE_URL}/send-verification`,{number:mobilenumber})
    if(resp.status === 200){
        return resp.data.verification
    }else{
        return resp.data
    }
}



async function verifyOtp(number,code){
    const resp = await axios.post(`${BASE_URL}/verify-otp`,{number,code})
    if(resp.status === 200){
        return resp.data
    }else{
        return resp.data
    }
}
