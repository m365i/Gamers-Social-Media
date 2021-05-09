
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <> 
            <p> Welcome home!</p>
            <br />
            <Link to="/login">Login</Link>
            <br />
            <Link to="/signup">Sign up</Link>
            <br />
            <Link to="/members">Members Only</Link>
        </>
    )
}