import { useReducer } from "react";
import GovernmentContext from "./government-context"

const defaultData = {
    ministers: []
};
const governmentReducer = (state, actions) => {

    if(actions.type === 'ADD'){
      let updatedMinisters = state.ministers.concat(actions.minister);
      return{
          ministers: updatedMinisters
      }
    }else if(actions.type === 'REMOVE'){
        let updatedMinisters =  state.ministers.filter(minister => minister.id !== actions.id);
        return{
            ministers :updatedMinisters
        }
    }
    return defaultData;

}

const GovernmentProvider = (props) => {
    const[state, dispatch] = useReducer(governmentReducer, defaultData)

    function onAddMinister(minister){
        alert('click')
        console.log(minister)
        dispatch({type: 'ADD', minister:minister } );
    }

    function onRemoveMinister(id){
        dispatch({type: 'REMOVE', id: id});
    }

    const ctx = {
        ministers: state.ministers,
        addMinister: onAddMinister,
        removeMinister: onRemoveMinister
    }


    return(<GovernmentContext.Provider value={ctx}>{props.children}</GovernmentContext.Provider>)
}
export default GovernmentProvider