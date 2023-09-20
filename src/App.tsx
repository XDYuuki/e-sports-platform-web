//Using https://github.com/phosphor-icons/react
import logoImg from './assets/logo-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';

import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from '@phosphor-icons/react';
import { Input } from './components/Form/input';

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(()=>{

    fetch("http://localhost:3000/games")
    .then((response) => response.json())
    .then((data) => {
      setGames(data)
    })
    .catch(err => console.log("Error:", err));

  },[]);
  
  return( 

    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="logo-image" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Your <span className=' text-transparent bg-clip-text bg-eSports-text-gradient'>duo</span> is here.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">

        {
          games.map(game =>{
            return(
              <GameBanner 
                key={game.id}
                bannerUrl={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads} 
              />
            )
          })
        }
      </div>


      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content 
              className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[520px] shadow-lg shadow-black/25"
            >
              <Dialog.Title className="text-3xl font-black">Publish a new post</Dialog.Title>

                <form className="mt-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="game" className="font-semibold">Choose a game</label>
                    <Input 
                      id="game" 
                      placeholder="Select a game you want to play"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                      <label htmlFor="name">Your name (or nickname)</label>
                      <Input type="text" id="name" placeholder="How you like to be called?"/>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="yearsPlaying">How long do you play?</label>
                      <Input type="number" id="yearsPlaying" placeholder="It is ok to be ZERO"/>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="discord">What is your Discord tag?</label>
                      <Input type="text" id="discord" placeholder="User#0000"/>
                    </div>
                  </div>


                  <div className="flex gap-6">

                    <div  className="flex flex-col gap-2">
                        <label htmlFor="weekdays">When do you usualy play?</label>
                        
                        <div className="grid grid-cols-4 gap-1">
                          <button 
                            title="Sunday"
                            className="w-8 h-8 rounded bg-zinc-900"
                          >
                            S 
                          </button>
                          <button 
                            title="Monday"
                            className="w-8 h-8 rounded bg-zinc-900"
                          >
                            M
                          </button>
                          <button 
                            title="Tuesday"
                            className="w-8 h-8 rounded bg-zinc-900"
                          >
                            T
                          </button>
                          <button 
                            title="Wednesday"
                            className="w-8 h-8 rounded bg-zinc-900"
                          >
                            W
                          </button>
                          <button 
                            title="Thursday"
                            className="w-8 h-8 rounded bg-zinc-900"
                          >
                            T
                          </button>
                          <button 
                            title="Friday"
                            className="w-8 h-8 rounded bg-zinc-900"
                          >
                            F
                          </button>
                          <button 
                            title="Saturday"
                            className="w-8 h-8 rounded bg-zinc-900"
                          >
                            S
                          </button>                          
                        </div>
                    </div>


                 
                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="hourStart">What time in the day?</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="time" id="hourStart" placeholder="From"/>
                        <Input type="time" id="hourEnd" placeholder="To"/>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex gap-2 text-sm text-white">
                    <Input type="checkbox"/>
                    Usualy I connect to the voice chat
                  </div>
              
                  <footer className="mt-4 flex justify-end gap-4">
                    <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:g-zinc-600">Cancel</Dialog.Close>
                    <button 
                      type="submit"
                      className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                    >
                      <GameController className="w-6 h-6"/>
                      Find duo
                    </button>
                  </footer>

                </form>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}

export default App;
