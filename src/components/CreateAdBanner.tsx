import { MagnifyingGlassPlus } from "@phosphor-icons/react";

import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner(){
    return(
        <div className='pt-1 bg-eSports-text-gradient self-stretch rounded-lg overflow-hidden mt-8'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white block'>Didn't you find your duo?</strong>
            <span className='text-zinc-400 block'>Publish a post to find new players!</span>
          </div>
          <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded-md flex items-center gap-3'>
            <MagnifyingGlassPlus size={24}/>
            Publish a new post
          </Dialog.Trigger>
        </div>
      </div>
    )
}