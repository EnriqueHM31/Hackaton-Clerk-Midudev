import HackatonesAuth from './HackatonesAuth';


export default function HackatonesAutor() {

    return (
        <div className="flex  items-center w-full h-full min-h-screen flex-col max-w-laptop mx-auto">
            <h2
                className="w-full text-start text-3xl font-bold bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary text-transparent py-4 px-2"
            >
                Tus Hackatones
            </h2>

            <HackatonesAuth />
        </div>
    );
}   