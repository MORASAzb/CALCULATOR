
const Screen = props => {
    return (
        < div className='h-[100px] w-full mb-5 px-5 border-solid border-2 border-white
    rounded-xl flex align-center justify-end text-white  '
            mode='single' max={80} >
            {props.value}
        </div>
    )
}

export default Screen