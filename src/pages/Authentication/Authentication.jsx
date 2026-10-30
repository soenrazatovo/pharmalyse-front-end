import "./Authentication.css"

function Authentication({_type}) {
    const [type, setType] = useState(_type);

    return ( 
        <>
            <h1>{type == "login" ? "Login" : "Sign up" }</h1>
        </>
    );
}

export default Authentication;