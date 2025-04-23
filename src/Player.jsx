 import { useState } from "react"
export default function Player ({initialName, symbol, isActive, onChangeName}){
    const[playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick(){
        setIsEditing((editing)=> !editing)
        if(isEditing){
            onChangeName(symbol,playerName)
        }
        
    } 
    function handleChnage(event){
    setPlayerName(event.target.value)
    }
    let initialPlayerName = <span className="player-name">{playerName}</span>;
    if(isEditing){
        initialPlayerName = <input type="text" required value={playerName} onChange={handleChnage} />;
    }
   
    return (
    <li className={isActive ? 'active' : undefined}>
<span className="player">
{initialPlayerName}
<span className="player-symbol">{symbol}</span>
<button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
</span>
</li>)
}
