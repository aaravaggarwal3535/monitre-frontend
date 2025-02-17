import React from 'react';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles';

const NotFound = () => {
  // const particlesInit = async (main) => {
  //   await loadFull(main);
  // };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center text-white bg-gray-700">
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: '#000',
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: ['image'],
              image: [
                {
                  src: '/starburst_white_300_drop_2.png',
                  width: 100,
                  height: 100,
                }
              ],
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
        className="absolute top-0 left-0 w-full h-full"
      /> */}
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-2">Sorry, Wrong Door</p>
      <p className="text-lg mb-4">Don't worry, sometimes even we make mistakes. You can find plenty of other things on our homepage.</p>
      <a href="/" className="mt-4 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
        Back to Homepage
      </a>
      <div className="flex justify-center mt-6">
        <img src='/cat.svg' alt="Cat" className="w-85 mr-4" />
        <img src='/cup.svg' alt="Cup" className="w-85" />
      </div>
    </div>
  );
};

export default NotFound;