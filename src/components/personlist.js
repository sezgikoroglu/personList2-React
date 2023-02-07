import Modal from "./modal"
import { useState,useEffect} from "react"

const initialPerson={
    name:"",
    age:"",
    job:"",
    income:"",
    id:""
}

function PersonList(){

    const[data,setData]=useState(initialPerson)
    const[personList,setPersonList]=useState(JSON.parse(localStorage.getItem("person-list")) || [])
    const[showModal,setShowModal]=useState(false)
    const[showDeleteModal,setShowDeleteModal]=useState(false)

    useEffect(()=>{
        localStorage.setItem("person-list",JSON.stringify(personList))
    },[personList])

    const handleList=()=>{

        if(!(data.name === "" || data.age === "" || data.price === "" || data.job === "")) {

         

            if (data.id===""){
                setPersonList([...personList,{
                    ...data,
                    id:personList.length,
                }])
            }

            else{

                // let _list=personList;
                // _list[data.id]=data;
               
                let _list=[...personList];
                _list[data.id]=data;
                setPersonList(_list)

            }
           
            setShowModal(false)
                            }
        }

    const addPerson=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value})
        }


    const deleteItem=()=>{
        const index=data.id
        setPersonList([...personList.slice(0,index),...personList.slice(index+1)])
        setShowDeleteModal(false)
    }
    return(

        <>
        <div className={showModal||showDeleteModal ? "mainDiv transparan" : " mainDiv " }>
            <div className="container">
                <ul className="ul-header">
                    <li>Name</li>
                    <li>Age</li>
                    <li>Job</li>
                    <li>Income</li>
                    <li>Actions</li>
                </ul>

            { 
                personList.map((item,index)=>(
                    <ul key={index} className="ul-body" >
                        <li>{item.name}</li>
                        <li>{item.age}</li>
                        <li>{item.job}</li>
                        <li>{item.income}</li>
                        <li className="action-buttons">
                            <button id={index} onClick={()=>{
                                                        setShowModal(true); setData({...item,id:index})}}>
                            <img src="images/edit-new-icon-22.png" alt="" /></button>
                                                        
                            <button onClick={()=>{setShowDeleteModal(true); setData({...item,id:index})}} ><img src="images/trah.png" alt="" /></button>
                        </li>
                    </ul>
                ))
            }

            </div>

            <button className="add-btn" onClick={()=>{setShowModal(true); setData(initialPerson)}}>Add a new person</button>
           
            {/* <Modal/> */}
          
        </div>
            
            {
                showModal && 
                <Modal closeModal={setShowModal}>
                    
                        <h2>add a new person</h2>
                       
                        <input name="name"    onChange={(addPerson)} value={data.name}  placeholder="name.." />
                        <input name="age"     onChange={(addPerson)} value={data.age}  placeholder="age...." />
                        <input name="job"     onChange={(addPerson)} value={data.job}  placeholder="job.." />
                        <input name="income"  onChange={(addPerson)} value={data.income}  placeholder="income.." />
                        <div className="modal-footer">
                            <button onClick={handleList}>Save</button>
                            <button onClick={()=>setShowModal(false)}>Close</button>
                        </div>
                      
                   
                </Modal>
            }
            {
                showDeleteModal && 
                <Modal closeModal={setShowDeleteModal}>
                        <div className="delete-modal">
                            <p>Are you sure you want to delete this person?</p>
                            <div className="buttons">
                                <button onClick={deleteItem}>Yes</button>
                                <button onClick={()=>setShowModal(false)}>No</button>
                            </div>    
                        </div>               
                </Modal>
            }
        
        </>
    )
}

export default PersonList