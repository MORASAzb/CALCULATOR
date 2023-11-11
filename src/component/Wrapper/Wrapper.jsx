

const Wrapper = ({ children }) => {
    return (
        <div className="w-[460px] h-[80vh] flex  flex-col items-center
         place-content-center p-2.5 border-none rounded-xl 
        my-[60px] bg-gradient-to-r from-pink-300 to-violet-400
         max-[300px]:w-[250px] ">
            {children}

        </div>
    )
}

export default Wrapper