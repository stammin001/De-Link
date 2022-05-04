import { useRef } from "react";
import Card from "./ui/Card";
import classes from "./form.module.css";

function Form(props) {
    // const nameInputRef = useRef();
    // const profilePictureInputRef = useRef();
    // const professionInputRef = useRef();
    // const educationInputRef = useRef();

    const urlInputRef = useRef();
    const pathInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        // const name = nameInputRef.current.value;
        // const profilePicture = profilePictureInputRef.current.value;
        // const profession = professionInputRef.current.value;
        // const education = educationInputRef.current.value;
        const url = urlInputRef.current.value;
        const path = pathInputRef.current.value;

        const userData = {
            // name: name,
            // profilePicture: profilePicture,
            // profession: profession,
            // education: education,
            url: url,
            path: path,
        };

        // console.log(userData);
        props.setUrl(userData.url);
        props.setPath(userData.path);

        // props.onFillForm(userData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="url">_url</label>
                    <input type="text" required id="url" ref={urlInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="path">_path</label>
                    <input type="text" required id="path" ref={pathInputRef} />
                </div>
                {/* <div className={classes.control}>
                    <label htmlFor="image">Placeholder</label>
                    <input
                        type="url"
                        required
                        id="image"
                        ref={profilePictureInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="profession">Placeholder</label>
                    <input
                        type="text"
                        required
                        id="profession"
                        ref={professionInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="education">Placeholder</label>
                    <textarea
                        id="education"
                        required
                        rows="5"
                        ref={educationInputRef}
                    ></textarea>
                </div> */}
                <div className={classes.actions}>
                    <button>Save Data</button>
                </div>{" "}
            </form>
        </Card>
    );
}

export default Form;
