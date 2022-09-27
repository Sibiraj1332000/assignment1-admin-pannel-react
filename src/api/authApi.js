import axios from "axios";

export const apiCallLogin = ({userName,password})=>{
    console.log("hoi : ",userName,password);
     axios.post("http://localhost:3001/admin/login",{userName,password})
    .then(data=>{
        console.log("gggg: ",data.data);
        return data.data
    })
}