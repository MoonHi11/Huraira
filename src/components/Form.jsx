function Form(){
    function handleSubmit(){

    }
    return(
        <>
            <form action={handleSubmit()} className="message-form">
                <input type="text" placeholder="Ask and i shall help" />
                <button>send</button>
            </form>
        </>
    )
}
export default Form