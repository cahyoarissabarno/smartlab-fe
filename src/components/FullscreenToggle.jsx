import React, { useState } from 'react'

function FullscreenToggle() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreenToggle = () => {
        if (!isFullscreen) {
        // Memasuki mode layar penuh
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        } else {
        // Keluar dari mode layar penuh
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        }

        setIsFullscreen(!isFullscreen);
    }

    return (
        <div className="fixed bottom-4 right-4">
            <button 
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition ease-in-out duration-650" 
                onClick={handleFullscreenToggle}
            >
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
        </div>
    )
}

export default FullscreenToggle