import { APIDemosActions } from "../actions/apidemos.action";

const apiDemosAction = new APIDemosActions();

describe("ApiDemos", () => {

    it("Verify input name and password", async () => {

        const username = "rizq";
        const password = "rizq123";

        // navigate menu
        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.clickAlertDialogsBtn();
        await apiDemosAction.clickTextEntryDialogBtn();

        // input value
        await apiDemosAction.fillUsernameField(username);
        await apiDemosAction.fillPasswordField(password);

        // verify value
        await expect(
            await apiDemosAction.getUsernameFieldValue()
        ).toBe(username);

        await expect(
            await apiDemosAction.getPasswordFieldValue()
        ).not.toBe("");

    });

});