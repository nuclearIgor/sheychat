
const Loader = () => {
    return (
        // <div className={'flex justify-center items-center h-screen w-screen'}>
        <div className={'flex justify-center items-center bg-black opacity-70 absolute inset-0'}>
            {/*<div className={'spinner-border border-gray-500 animate-spin inline-block w-8 h-8 border-4 rounded-full'} role={'status'}>*/}
            <div className={'h-10 w-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin'}>
                {/*<span className={'text-4xl text-white'}>. </span>*/}
            </div>
        </div>
    );
};

export default Loader;