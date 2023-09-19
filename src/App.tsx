//Using https://github.com/phosphor-icons/react
import logoImg from './assets/logo-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';

import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from '@phosphor-icons/react';

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
              className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25"
            >
              <Dialog.Title className="text-3xl font-black">Publish a new post</Dialog.Title>

              <Dialog.Content>
                Testando o Modal
              </Dialog.Content>
                <form>
                  <div>
                    <label htmlFor="game">Choose a game</label>
                    <input type="text" id="game" placeholder="Select a game you want to play"/>
                  </div>

                  <div>
                      <label htmlFor="name">Your name (or nickname)</label>
                      <input type="text" id="name" placeholder="How you like to be called?"/>
                  </div>

                  <div>
                    <div>
                      <label htmlFor="yearsPlaying">How long do you play?</label>
                      <input type="number" id="yearsPlaying" placeholder="It is ok to be ZERO"/>
                    </div>
                    <div>
                      <label htmlFor="discord">What is your Discord tag?</label>
                      <input type="text" id="discord" placeholder="User#0000"/>
                    </div>
                  </div>


                  <div>

                    <div>
                        <label htmlFor="weekdays">When do you usualy play?</label>
                        {/* <input type="text" id="discord" placeholder="User#0000"/> */}
                    </div>
                    
                    <div>
                      <label htmlFor="hourStart">What time in the day?</label>
                      <div>
                        <input type="time" id="hourStart" placeholder="From"/>
                        <input type="time" id="hourEnd" placeholder="To"/>
                      </div>
                    </div>

                    <div>
                      <input type="checkbox"/>
                      Usualy I connect to the voice chat
                    </div>
                
                    <footer>
                      <button>Cancel</button>
                      <button type="submit">
                        <GameController />
                        Find duo
                      </button>
                    </footer>
                  </div>

                </form>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}

export default App;
