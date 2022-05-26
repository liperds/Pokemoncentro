// Aqui devemos criar nosso contexto e nosso provider.
import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const FormularioContext = createContext();

const initialState = {
  treinador: {
    nome: "",
    sobrenome: "",
    email: "",
  },
  pokemon: {
    nomePokemon: "",
    tipoPokemon: "",
    elementoPokemon: "",
    alturaPokemon: 0,
    idadePokemon: 0,
  },
};

/**
 * Função redutora para o HOOK useReduce com o estado do formulário que atualiza o estado com base na ação.
 *
 * @author Felipe Rodrigues De Melo
 * @param {initialState} state
 * @param {{
 *   type: string,
 *   payload: {
 *    [string]: string,
 * }} action
 *
 * @returns {state}
 */


const reducer = (state, action) => {
  switch (action.type) {
    case "ATUALIZAR_TREINADOR":
      return {
        ...state,
        treinador: {
          ...state.treinador,
          [action.payload.key]: action.payload.value,
        },
      };
    case "ATUALIZAR_POKEMON":
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
};
const FormularioContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleReducer = (type, values) => {
    dispatch({type: type, payload: values});
  }

  return (
    <FormularioContext.Provider value={{ state, handleReducer }}>
      {children}
    </FormularioContext.Provider>
  );
};

FormularioContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};



export default FormularioContextProvider;

