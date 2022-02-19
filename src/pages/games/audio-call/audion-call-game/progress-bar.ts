export function progressBar( width: number) {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    return progressBar.style.width = `${width}%`;
}
