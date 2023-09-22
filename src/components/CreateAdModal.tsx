import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

import { Check, GameController } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Input } from "./Form/input";

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekdays] = useState<string[]>([]);
    const [useVoiceChat, setUseVoiceChat] = useState(false);

    useEffect(() => {
        axios("http://localhost:3000/games")
            .then((response) => {
                setGames(response.data);
            })
            .catch((err) => console.log("Error:", err));
    }, []);

    async function handleCreateAd(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        //validation

        if (!data.name) {
            return;
        }

        console.log("Data To send:", {
            weekDays: weekDays,
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            gameId: data.game,
        });

        try {
            await axios.post(`http://localhost:3000/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays,
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChat,
            });

            alert("New post successfully created!");
        } catch (err) {
            console.log(err);
            alert("Error to create the post.");
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[520px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black">
                    Publish a new post
                </Dialog.Title>

                <form
                    onSubmit={handleCreateAd}
                    className="mt-8 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">
                            Choose a game
                        </label>
                        <select
                            id="game"
                            name="game"
                            className="py-3 px-4 rounded text-sm bg-zinc-900 placeholder:text-zinc-500 appearance-none"
                            defaultValue=""
                        >
                            <option disabled>
                                Select a game you want to play
                            </option>

                            {games.map((game) => {
                                return (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Your name (or nickname)</label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="How you like to be called?"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">
                                How long do you play?
                            </label>
                            <Input
                                type="number"
                                id="yearsPlaying"
                                name="yearsPlaying"
                                placeholder="It is ok to be ZERO"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">
                                What is your Discord tag?
                            </label>
                            <Input
                                type="text"
                                id="discord"
                                name="discord"
                                placeholder="User#0000"
                            />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekdays">
                                When do you usualy play?
                            </label>

                            <ToggleGroup.Root
                                type="multiple"
                                className="grid grid-cols-4 gap-1"
                                onValueChange={setWeekdays}
                                value={weekDays}
                            >
                                <ToggleGroup.Item
                                    value="0"
                                    title="Sunday"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("0")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="1"
                                    title="Monday"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("1")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    M
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="2"
                                    title="Tuesday"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("2")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="3"
                                    title="Wednesday"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("3")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    W
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="4"
                                    title="Thursday"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("4")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="5"
                                    title="Friday"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("5")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    F
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="6"
                                    title="Saturday"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("6")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">
                                What time in the day?
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    type="time"
                                    id="hourStart"
                                    name="hourStart"
                                    placeholder="From"
                                />
                                <Input
                                    type="time"
                                    id="hourEnd"
                                    name="hourEnd"
                                    placeholder="To"
                                />
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm text-white">
                        <Checkbox.Root
                            onCheckedChange={(checked) => {
                                checked
                                    ? setUseVoiceChat(true)
                                    : setUseVoiceChat(false);
                            }}
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Usualy I connect to the voice chat
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:g-zinc-600">
                            Cancel
                        </Dialog.Close>
                        <button
                            type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            <GameController className="w-6 h-6" />
                            Find duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}
