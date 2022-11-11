import { ToastController } from "@ionic/angular";

export function copyText(copy: CopyText) {
    const el = document.createElement("textarea");
    el.value = copy.text;
    el.setAttribute("readonly", "");
    document.body.appendChild(el);

    el.select();
    try {
        const successful = document.execCommand("copy");
        if (successful) {
            document.body.removeChild(el);
            copy.toastController?.create({
                color: "success",
                message: copy.message,
                position: "bottom",
                duration: 3000
            }).then(toast => toast.present());
        }
    } catch (err) {}
}

type CopyText = {
    message: string;
    text: string;
    toastController?: ToastController
}