import React from 'react';
import { usePages } from '@src/services/PagesContext';

const Items = [
    designer(),
    requirement(),
    software(),
    supervisor(),
  ];


const AboutUs = () => {
  const { showAboutUs } = usePages();

  return (
    showAboutUs && (
      <div className="flex w-[100vw] h-full flex-col items-center">
        <div className="h-24" />
        <div className="relative w-[85%] max-w-[384px] bg-[#fad5d5] rounded-lg p-4">
          <div className="flex flex-col justify-center items-center">
            {/* <img src="/images/logo mark - light.svg" className="w-16 h-16" /> */}
            <h2 className="text-center my-4 font-montserrat" style={{ color: '#393736', fontSize: '20px' }}>
              Public Bus Monitoring System
            </h2>
            <p className="w-88 font-normal text-sm text-justify leading-normal" style={{ fontFamily: 'Open_Sans-Regular,Helvetica', color: '#393736' }}>
              Track bus location to efficient your daily commute!
            </p>
          </div>
        </div>

        <div className="w-[280px] mt-4 mb-4 font-montserrat font-[number:var(--h2-font-weight)] text-base-color-1secondary-color-15 text-[length:var(--h2-font-size)] text-center tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] whitespace-nowrap [font-style:var(--h2-font-style)]" style={{ color: '393736', fontSize: '24px', fontWeight: 500 }}>
          Created By
        </div>
        <h3 className="mb-2 text-lg font-bold">Kelompok 9</h3>
        <p>18221048 Syafiq Ziyadul Arifin</p>
        <p>18221072 Hilmi Baskara Radanto</p>
        <p>18221120 Carissa Tabina Rianda</p>
        <p>18221138 Tara Chandani Haryono</p>
        <p>18221162 Ceavin Rufus De Prayer Pruba</p>
        {/* <Carousel items={Items} /> */}
      </div>
    )
  );
}

function designer(){
  return(
      <div className="flex flex-col items-center pb-9">
          <img src="/images/fotoProfileAbout/aboutDesigner.png" className="h-24 mb-3" />
          <img src="/images/fotoProfileAbout/designer.png"/>
      </div>
  );
}

function requirement(){
  return(
      <div className="flex flex-col items-center pb-9">
          <img src="/images/fotoProfileAbout/aboutRequirement.png" className="h-24 mb-3" />
          <div className="mt-[-21px] ml-[10px]">
            <img src="/images/fotoProfileAbout/requirement.png"/>
          </div>
      </div>
  );
}

function software(){
    return(
        <div className="flex flex-col items-center pb-9">
            <img src="/images/fotoProfileAbout/aboutSoftware.png" className="h-24 mb-3" />
            <img src="/images/fotoProfileAbout/software.png"/>
        </div>
    );
}

function supervisor(){
    return(
        <div className="flex flex-col items-center pb-9">
            <img src="/images/fotoProfileAbout/aboutSupervisor.png" className="h-24 mb-3" />
            <img src="/images/fotoProfileAbout/supervisor.png" className="h-59"/>
        </div>
    );
}

export default AboutUs;