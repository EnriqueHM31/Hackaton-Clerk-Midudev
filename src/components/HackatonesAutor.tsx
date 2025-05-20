import HackatonesAuth from './HackatonesAuth';


export default function HackatonesAutor() {

    return (
        <div className="flex  items-center w-full h-full min-h-screen flex-col xl:max-w-laptop max-w-full  mx-auto">
            <h2
                className="w-full text-3xl font-bold bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary text-transparent py-4 px-2 xl:text-start text-center"
            >
                Tus Hackatones
            </h2>

            <HackatonesAuth />
        </div>
    );
}   