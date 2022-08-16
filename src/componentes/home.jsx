import { useState, useEffect } from "react";
import { services } from "../helpers/server";



export function Page () {


    const [all, setAll] = useState([]);

    async function readAll() {
        const list = await services.getAll();
        setAll(list);
    }
    useEffect(() => {
        readAll();
    }, []);



    const [newList, setNewList] = useState({ });

    async function Create(list) {
        const novaList = services.create(list);
        window.location.reload(true);
    }
    const handleCriar = (event) => {
        setNewList({
            ...newList,
            [event.target.name]: event.target.value,
        });
    };
    const handleList = () => {
        const creatList = { ...newList };
        Create(creatList);
        setNewList({});
    };



    return (
        <div id="tool">
        <h1>Lista de afazeres</h1>
        
        <div className="create">
        <input 
        name="task"
        type="text" 
        id="input" 
        onChange={handleCriar}
        value={newList.task}
        ></input>
        <button 
        id="button"
        onClick={handleList}
        >+</button>
        </div>

        {all.map((task, index) => (
            <div className="tasks" key={index}>  
                <h3 className="card">{task.task}</h3>
                <button
                className="done"
                id={task.id}
                ><span class="material-symbols-outlined">
                    done
                </span>
                </button>
            </div>
            )    
        )}
            
        </div>
    )
}

