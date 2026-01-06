import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit(state, action) {
			state.balance = state.balance + action.payload;
		},

		withdraw(state, action) {
			state.balance = state.balance - action.payload;
		},

		requestLoan(state, action) {
			if (state.loan > 0) return;
			state.loan = action.payload.amount;
			state.loanPurpose = action.payload.loanPurpose;
			state.balance = state.balance + action.payload.amount;
		},

		payLoan(state, action) {
			state.loan = 0;
			state.loanPurpose = "";
			state.balance = state.balance - state.loan;
		},
	},
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

console.log(accountSlice);

// export default function accountReducer(state = initialState, action) {
// 	switch (action.type) {
// 		case "account/deposit":
// 			return { ...state, balance: state.balance + action.payload };
// 		case "account/withdraw":
// 			return { ...state, balance: state.balance - action.payload };
// 		case "account/requestLoan":
// 			if (state.loan > 0) return;
// 			return {
// 				...state,
// 				loan: action.payload.amount,
// 				loanPurpose: action.payload.loanPurpose,
// 				balance: state.balance + action.payload.amount,
// 			};
// 		case "account/payLoan":
// 			return {
// 				...state,
// 				loan: 0,
// 				balance: state.balance - state.loan,
// 				loanPurpose: "",
// 			};
// 		default:
// 			return state;
// 	}
// }

// export function deposit(amount, currency) {
// 	// this will return an object which tells redux to dispatch immediately
// 	if (currency === "USD") return { type: "account/deposit", payload: amount };

// 	// if a function is returned to dispatch, redux knows it has a side effect(api call) so this will be redirected to middleware. Dispatch is not executed immediately
// 	return async function (dispatch, getState) {
// 		const res = await fetch(
// 			`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`,
// 		);

// 		const data = await res.json();
// 		const converted = data.rates.USD;
// 		dispatch({ type: "account/deposit", payload: converted });
// 	};
// }

// export function withdraw(amount) {
// 	return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, loanPurpose) {
// 	return { type: "account/requestLoan", payload: { amount, loanPurpose } };
// }

// export function payLoan() {
// 	return { type: "account/payLoan" };
// }
