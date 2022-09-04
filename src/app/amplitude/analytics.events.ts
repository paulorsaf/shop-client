import { logEvent } from "@redux-beacon/amplitude";
import { EventsMap } from "redux-beacon";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "src/app/store/login/login.actions";
import { register, registerFail, registerSuccess } from "../store/register/register.actions";
import { addProduct, closeShoppingCart, decreaseProduct, makePurchaseByMoney, makePurchaseByPix, makePurchaseFail, makePurchaseSuccess, openShoppingCart, removeProduct, setDeliveryAddress, setDeliveryPrice } from "../store/shopping-cart/shopping-cart.actions";
import { loginUserByToken, loginUserByTokenFail, loginUserByTokenSuccess, logout, logoutFail, logoutSuccess } from "../store/user/user.actions";

const event = logEvent((action, prevState, nextState) => {
    return {
        type: action.type,
        properties: action.payload
    };
});
const payloadlessEvent = logEvent((action, prevState, nextState) => {
    return {
        type: action.type
    };
});

export const analyticsEventsMap: EventsMap = {
    [addProduct.type]: payloadlessEvent,
    [decreaseProduct.type]: payloadlessEvent,
    [removeProduct.type]: payloadlessEvent,
    [openShoppingCart.type]: payloadlessEvent,
    [closeShoppingCart.type]: payloadlessEvent,
    [setDeliveryAddress.type]: payloadlessEvent,
    [setDeliveryPrice.type]: payloadlessEvent,
    [makePurchaseByPix.type]: payloadlessEvent,
    [makePurchaseByMoney.type]: payloadlessEvent,
    [makePurchaseSuccess.type]: payloadlessEvent,
    [makePurchaseFail.type]: payloadlessEvent,
    [login.type]: payloadlessEvent,
    [loginSuccess.type]: payloadlessEvent,
    [loginFail.type]: payloadlessEvent,
    [recoverPassword.type]: payloadlessEvent,
    [recoverPasswordSuccess.type]: payloadlessEvent,
    [recoverPasswordFail.type]: payloadlessEvent,
    [register.type]: payloadlessEvent,
    [registerSuccess.type]: payloadlessEvent,
    [registerFail.type]: payloadlessEvent,
    [loginUserByToken.type]: payloadlessEvent,
    [loginUserByTokenSuccess.type]: payloadlessEvent,
    [loginUserByTokenFail.type]: payloadlessEvent,
    [logout.type]: payloadlessEvent,
    [logoutSuccess.type]: payloadlessEvent,
    [logoutFail.type]: payloadlessEvent,
};