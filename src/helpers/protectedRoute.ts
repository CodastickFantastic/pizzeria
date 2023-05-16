import { Redirect } from "next"

export default function ProtectedRoute({token}){
    if(!token){
        return <Redirect to="/login" />
    }

}