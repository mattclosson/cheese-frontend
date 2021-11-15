import {useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";

const Show = (props) => {
  // grab the navigate function
  const navigate = useNavigate()
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id;
  // grab cheese from props
  const cheese = props.cheese;
  // create state for form
  const [editForm, setEditForm] = useState({})
  // useEffect to set state to the existing cheese, when the data is available
  useEffect(() => {
      if(props.cheese){
          const oneCheese = cheese.find((c) => c._id === id);
          setEditForm(oneCheese)
      }
  }, [props.cheese])
  if (props.cheese) {
    // grab the target cheese from the cheese array
    const oneCheese = cheese.find((c) => c._id === id);
    
    // handleChange function for form
    const handleChange = (event) => {
        // create a copy of the state
        const newState = {...editForm}
        // update the newState
        newState[event.target.name] = event.target.value
        // update the state
        setEditForm(newState)
    }

    // handleSubmit for form
    const handleSubmit = (event) => {
        // prevent the refresh
        event.preventDefault()
        // pass the form data to updateCheese
        props.updateCheese(editForm, oneCheese._id)
        // redirect cheese back to index
        navigate("/")
    }

    const removeCheese = () => {
        props.deleteCheese(oneCheese._id)
        navigate("/")
    }


    return (
      <div className="cheese">
        <h1>{oneCheese.name}</h1>
        <h2>{oneCheese.countryOfOrigin}</h2>
        <img src={oneCheese.image} alt={oneCheese.name} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.countryOfOrigin}
            name="countryOfOrigin"
            placeholder="Country Of Origin"
            onChange={handleChange}
          />
          <input type="submit" value="Update Cheese" />
        </form>
        <button onClick={removeCheese}>DELETE CHEESE</button>
      </div>
    ) 
  } else {
    return <h1>No Cheese</h1>;
  }
};

export default Show;