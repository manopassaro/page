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


    const [task, setTask] = useState({
        task_id: "",
    });



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




    async function deleteTask(id) {
        const response = await services.deleteById(id);
        window.location.reload(true);
    }



    return (
        <div id="tool">
        <h1 id="title">Lista de afazeres</h1>
        
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
            <div className="cards" key={index}>  
                <h3 className="task">{task.task}</h3>
                <div>
                    <button
                    className="buttons"
                    ><span className="material-symbols-outlined">
                        edit
                    </span>    
                    </button>
                    
                    <button
                    className="buttons"
                    id={task.id}
                    onClick={() => deleteTask(task.id)}
                    ><span className="material-symbols-outlined">
                        done
                    </span>
                </button>
                </div>
            </div>
            )    
        )}
            
        </div>
    )
}

