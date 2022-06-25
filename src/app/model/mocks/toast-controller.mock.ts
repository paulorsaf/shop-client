export class ToastControllerMock {
    isPresented = false;
    create() {
        return {
            present: () => {
                this.isPresented = true;
            }
        };
    }
};
