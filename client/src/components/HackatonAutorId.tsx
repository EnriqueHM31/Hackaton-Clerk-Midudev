import SettingsHack from './SettingsHack';
import Participantes from './ParticipantesHack';
import { useParams } from 'react-router-dom';

export default function HackatonAutorId() {

    const id = useParams<{ id: string }>().id;
    return (
        <div className="flex flex-col justify-between items-center w-full">
            <section className="gap-6 text-white w-full max-w-[1200px] mx-auto z-50 bg-black my-10">
                <div className="flex flex-col items-start justify-center w-full gap-12 mb-12 min-h-dvh bg-black ">
                    <div className="flex-1 w-full">
                        <SettingsHack id={id as string} />
                    </div>
                    <div className="flex-2 h-full bg-black w-full">
                        <h2
                            className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary font-bold w-full text-center"
                        >
                            Participantes
                        </h2>

                        <Participantes idHack={id as string} />
                    </div>
                </div>
            </section>
        </div>
    );
}