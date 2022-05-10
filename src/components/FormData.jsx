import { useRef } from "react";
import Card from "./ui/Card";
import classes from "./form.module.css";

export default function FormData(props) {
    const idInputRef = useRef();
    const universityInputRef = useRef();
    const degreeInputRef = useRef();
    const resultInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        console.log("Into submitHandler");
        const userData = {
            id: idInputRef.current.value,
            university: universityInputRef.current.value,
            degree: degreeInputRef.current.value,
        };

        props.setId(userData.id);
        props.setUniversity(userData.university);
        props.setDegree(userData.degree);
        let input = "id=" + userData.id + (userData.university !== '' ? "&university=" + userData.university : '')
            + (userData.degree !== '' ? "&degree=" + userData.degree : '');
        props.setInput(input);

        console.log("Input = ", input);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="id">DID</label>
                    <input type="text" required id="id" ref={idInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="university">University</label>
                    <input type="text" id="university" ref={universityInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="degree">Degree</label>
                    <input type="text" id="degree" ref={degreeInputRef}/>
                </div> 
                <div className={classes.control}>
                    <label htmlFor="result">Result</label>
                    <label id="result" ref={resultInputRef}/>
                </div> 
                <div className={classes.actions}>
                    <button>Save Data</button>
                </div>       
            </form>
        </Card>
    );
}
