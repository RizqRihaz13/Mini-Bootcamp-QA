import { APIDemosPage } from "../pageobjects/apidemos.page";

export class APIDemosActions {

    async waitForAppBtn() {
        await APIDemosPage.appBtn().waitForDisplayed({
            timeout: 5000
        });
    }

    async clickAppBtn() {
        await APIDemosPage.appBtn().click();
    }

    async clickAlertDialogsBtn() {
        await APIDemosPage.alertDialogsBtn().click();
    }

    async clickTextEntryDialogBtn() {
        await APIDemosPage.textEntryDialogBtn().click();
    }

    async fillUsernameField(username: string) {
        await APIDemosPage.usernameField().setValue(username);
    }

    async fillPasswordField(password: string) {
        await APIDemosPage.passwordField().setValue(password);
    }

    async getUsernameFieldValue() {
        return await APIDemosPage.usernameField().getAttribute("text");
    }

    async getPasswordFieldValue() {
        return await APIDemosPage.passwordField().getText();
    }
}