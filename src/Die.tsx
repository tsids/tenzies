import "./App.css"

export default function Die(props: any) {

    let bg = props.isHeld ? "bg-green-400" : "bg-white"

    return (
        <div 
        className={`rounded-sm shadow-md w-16 h-16 flex justify-center items-center cursor-pointer text-2xl ${bg}`}
        onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}