import { useState } from "react";
import Card from "../UI/Card";
import styles from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {

    //input olarak girilen verileri state olarak tanimladik
    const[enteredName, setEnteredName]=useState('');
    const[enteredAge, setEnteredAge]=useState('')
    // error mesaj kismini state ettik
    const[error, setError]=useState();

    const addUserHandler=(evt)=>{
        evt.preventDefault();
        // Validation
        if(enteredName.trim().length===0 || enteredAge.trim().length===0){
        //error nesne olarak tanimladik
        setError({
            title:'Invalid input',
            message:'Please enter valid name or age (non-empty values)'
        })    
            return;
        }
        if(+enteredAge<1){
            setError({
                title:'Invalid age',
                message:'Please enter valid age (age > 0)'
            })  
            return;
        }
//enteredAge in basina + koyarak string ile gelen ifadeyi
// int olarak gorduk 
        props.onAddUsers(enteredName, enteredAge)
        setEnteredAge('')
        setEnteredName('')
    }

    //onChange prop ile girilen inputlari alip statelerimiz degistirdik
    const nameChangeHandler=(evt)=>{
        setEnteredName(evt.target.value)
    }

    const ageChangeHandler=(evt)=>{
        setEnteredAge(evt.target.value)
    }

    const errorHandler=()=>{
        setError(null)
    }

    //errormodal i bir condition a bagladik error varsa gozukecek
    return (
    <div>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
    <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' onChange={nameChangeHandler} value={enteredName} />
            <label htmlFor='age'>Age (Years)</label>
            <input id='age' type='number'onChange={ageChangeHandler} value={enteredAge} /> 
            <Button type='submit'>Add User</Button>
        </form>
    </Card>
    </div>
    )
}
//imputlara value olarak tanimladigimiz stateleri vermezsek
// submit ettigimizde input fieldler sifirlanmaz
export default AddUser