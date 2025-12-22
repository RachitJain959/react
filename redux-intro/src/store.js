import { combineReducers, createStore } from "redux";

const initialStateCustomer = {
	fullName: "",
	nationalID: "",
	createdAt: "",
};

function customerReducer(state = initialStateCustomer, action) {
	switch (action.type) {
		case "customer/createCustomer":
			return {
				...state,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};
		case "customer/updateCustomer":
			return { ...state, fullName: action.payload.fullName };
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});
const store = createStore(rootReducer);

store.dispatch(deposit(500));
store.dispatch(withdraw(500));
store.dispatch(requestLoan(5000, "Buy car"));
store.dispatch(payLoan());

function createCustomer(fullName, nationalID) {
	return {
		type: "customer/createCustomer",
		payload: { fullName, nationalID, createdAt: new Date().toISOString() },
	};
}

function updateCustomer(fullName) {
	return { type: "customer/updateCustomer", payload: fullName };
}

console.log(store.getState());
