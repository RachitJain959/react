import { createStore } from "redux";

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

function reducerAccount(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, balance: state.balance + action.payload };
		case "account/withdraw":
			return { ...state, balance: state.balance - action.payload };
		case "account/requestLoan":
			if (state.loan > 0) return;
			return { ...state, loan: action.payload };
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

const store = createStore(reducerAccount);

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
store.dispatch(payLoan);
``;
