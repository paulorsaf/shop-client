export class LoadingControllerMock {
    isDismissed = false;
    isPresented = false;
    create() {
        return Promise.resolve({
            present: () => {
                this.isPresented = true;
            },
            onWillDismiss: () => {
                this.isDismissed = true;
                return Promise.resolve();
            }
        });
    }
    dismiss() {
        this.isDismissed = true;
    }
};
