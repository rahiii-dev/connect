import sphereIcon from '/sphere.svg';

const Logo = () => {
    return (
        <div className='flex items-center gap-2 transition-all duration-300 ease-out transform hover:scale-105 hover:gap-0.5 cursor-pointer'>
            <img
                className='w-8 md:w-10'
                src={sphereIcon}
                alt="connect-icon"
            />
            <h1
                className="text-blue-accent text-lg md:text-xl font-extrabold transition-colors duration-300 ease-out hover:text-blue-500"
            >
                Connect
            </h1>
        </div>
    );
}

export default Logo;
