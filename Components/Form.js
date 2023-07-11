import useRestaurant from "@/Hooks/useRestaurant";
import { formatCreditCardNumber, formatExpirationDate, formatCVC} from "@/helpers";
import Error from "./Error";


export default function Form() {
  const {setState, state, handleFormSubmit, boolean } = useRestaurant();

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
  
    if (name === "number") {
      setState((prev) => ({
        ...prev,
        [name]: formatCreditCardNumber(value)
      }));
    } else if (name === "expiry") {
      setState((prev) => ({
        ...prev,
        [name]: formatExpirationDate(value)
      }));
    } else if (name === "cvc") {
      setState((prev) => ({
        ...prev,
        [name]: formatCVC(value)
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
    
  return (
    <form className="mt-10" onSubmit={handleFormSubmit}>
        {boolean ? '' : <Error/>}
      <div className="w-full mb-4">
        <input
          type="text"
          autoComplete="off"
          name="name"
          className="w-full py-3 px-4 rounded-xl outline-none border text-black"
          placeholder="Nombre"
          maxLength="22"
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          value={state.name}
        />
      </div>
      <div className="w-full mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="tel"
          pattern="\d{3,4}"
          name="cvc"
          className="w-full py-3 px-4 rounded-xl outline-none border text-black"
          placeholder="CVC"
          maxLength="3"
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          value={state.cvc}
        />
        <input
          type="tel"
          pattern="\d\d/\d\d"
          name="expiry"
          className="w-full py-3 px-4 rounded-xl outline-none border text-black"
          placeholder="Fecha de expiración"
          maxLength="5"
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          value={state.expiry}
        />
      </div>
      <div className="w-full mb-4">
        <input
          type="tel"
          pattern="[\d ]{16,22}"
          name="number"
          className="w-full py-3 px-4 rounded-xl outline-none border text-black"
          placeholder="Número de Tarjeta"
          maxLength="19"
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          value={state.number}
        />
      </div>
      <div className="w-full">
        <button  type="submit" className= "bg-cyan-600 text-white w-full py-3 px-4 rounded-full hover:bg-cyan-700 transition-colors">
          Pagar
        </button>
      </div>
    </form>
  );
}
