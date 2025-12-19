import { combineReducers, createStore } from "redux";

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

const initialStateCustomer = {
	fullName: "",
	nationalID: "",
	createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, balance: state.balance + action.payload };
		case "account/withdraw":
			return { ...state, balance: state.balance - action.payload };
		case "account/requestLoan":
			if (state.loan > 0) return;
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.loanPurpose,
				balance: state.balance + action.payload.amount,
			};
		case "account/payLoan":
			return {
				...state,
				loan: 0,
				balance: state.balance - state.loan,
				loanPurpose: "",
			};
		default:
			return state;
	}
}

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

function deposit(amount) {
	return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
	return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, loanPurpose) {
	return { type: "account/requestLoan", payload: { amount, loanPurpose } };
}
function payLoan() {
	return { type: "account/payLoan" };
}
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
