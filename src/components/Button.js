const Button = ({type, children, onclick, classnames}) => {
    return (
        <button type={type} className={classnames} onClick={() => onclick()}>
            {children}
        </button>
    )
}

export default Button
