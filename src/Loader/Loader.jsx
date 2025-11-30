
import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg'

const Loader = () => {
  return (
  <div className='h-screen w-scren flex items-center justify-center bg-black overflow-hidden'>
    <StyledWrapper>
      <div className="loader">
        <div className="box">
          <div className="logo">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="240.000000pt" height="242.000000pt" viewBox="0 0 140.000000 142.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,142.000000) scale(0.100000,-0.100000)"
fill="#01034aff" stroke="none">
<path d="M113 1298 c-56 -68 -100 -124 -99 -126 2 -1 28 9 59 23 l57 25 0
-610 0 -610 150 0 150 0 2 269 3 269 273 -269 272 -269 89 0 88 0 -4 232 -4
233 -33 23 c-40 27 -121 42 -241 42 -49 1 -107 7 -128 14 -95 34 -159 112
-174 212 -8 47 -14 55 -140 174 l-132 125 -1 83 c0 92 1 93 69 62 24 -11 48
-20 53 -20 5 0 -38 54 -97 120 -59 66 -107 120 -109 120 -1 0 -47 -55 -103
-122z m867 -1118 c0 -34 -10 -25 -340 306 -331 332 -340 343 -340 380 l1 39
339 -345 c315 -320 340 -347 340 -380z"/>
<path d="M927 1053 c-74 -3 -88 -6 -83 -19 3 -8 9 -113 12 -234 l7 -220 36
-10 c20 -5 84 -10 144 -10 l107 0 2 230 c1 127 2 238 2 248 1 19 -47 22 -227
15z"/>
</g>
</svg>
          </div>
        </div>
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
      </div>
    </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.div`
  .loader {
    --size: 750px;
    --duration: 2s;
    --logo-color: white;
    --background: linear-gradient(
      0deg,
      rgba(50, 50, 50, 0.2) 0%,
      rgba(100, 100, 100, 0.2) 100%
    );
    height: var(--size);
    aspect-ratio: 1;
    position: relative;
  }

  .loader .box {
    position: absolute;
    background: rgba(100, 100, 100, 0.15);
    background: var(--background);
    border-radius: 50%;
    border-top: 1px solid rgba(100, 100, 100, 1);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
    backdrop-filter: blur(5px);
    animation: ripple var(--duration) infinite ease-in-out;
  }

  .loader .box:nth-child(1) {
    inset: 40%;
    z-index: 99;
  }

  .loader .box:nth-child(2) {
    inset: 30%;
    z-index: 98;
    border-color: rgba(100, 100, 100, 0.8);
    animation-delay: 0.2s;
  }

  .loader .box:nth-child(3) {
    inset: 20%;
    z-index: 97;
    border-color: rgba(100, 100, 100, 0.6);
    animation-delay: 0.4s;
  }

  .loader .box:nth-child(4) {
    inset: 10%;
    z-index: 96;
    border-color: rgba(100, 100, 100, 0.4);
    animation-delay: 0.6s;
  }

  .loader .box:nth-child(5) {
    inset: 0%;
    z-index: 95;
    border-color: rgba(100, 100, 100, 0.2);
    animation-delay: 0.8s;
  }

  .loader .logo {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    padding: 30%;
  }

  .loader .logo svg {
    fill: var(--logo-color);
    width: 100%;
    animation: color-change var(--duration) infinite ease-in-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(1);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
    }
    50% {
      transform: scale(1.3);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 20px -0px;
    }
    100% {
      transform: scale(1);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
    }
  }

  @keyframes color-change {
    0% {
      fill: var(--logo-color);
    }
    50% {
      fill: white;
    }
    100% {
      fill: var(--logo-color);
    }
  }`;

export default Loader;
