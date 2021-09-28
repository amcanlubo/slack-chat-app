const Form = ({classnames, children}) => {

    const submitForm = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={submitForm} className={classnames} action="/" method="GET">
            {children}
        </form>
    )
}

export default Form