import Image from 'next/image';
import { useMapDetails } from '@src/services/MapDetailsContext';
import { TbBusStop } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Shuttle {
  loaded: boolean;
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  halte: string;
  status: string;
  route: String;
  waitingTime: number;
  arriveTime: string;
  error: any;
  crowd: String; // ['Low', 'Medium', 'High', 'Overcrowded']
}

interface HaltePopUpProps {
  isButtonClicked: boolean;
  setIsButtonClicked: (isButtonClicked: boolean) => void;
}

const HaltePopUp: React.FC<HaltePopUpProps> = ({ isButtonClicked, setIsButtonClicked }) => {
  const {
    shuttles,
    location, routeMarkers,
    selectedHalte, setSelectedHalte,
    getNearestHalte
  } = useMapDetails()

  const handleButtonClick = () => {
    const nearestHalte = getNearestHalte(location, routeMarkers);
    setSelectedHalte(nearestHalte);
    setIsButtonClicked(true);
  };

  const handleCloseButtonClick = () => {
    setSelectedHalte(null);
    setIsButtonClicked(false);
  }

  return (
    <div className='fixed z-[401] item-center h-[100px] w-full md:w-[100%] bottom-0'>
      <div className='justify-center w-full flex'>
        <button className='bg-[#eb8d8c] w-[192px] h-[46px] rounded-3xl' onClick={handleButtonClick}>
          <div className='flex justify-center items-center mt-[2px]'>
            {/* <Image src={'/images/iconHalteWhite.png'} alt="bus location" width={17} height={17} /> */}
            <TbBusStop color="white" size={21} />
            <p className='ml-3 text-[14px] font-bold text-white mt-[-3px]'>Halte Terdekat</p>
          </div>
        </button>
        {(isButtonClicked &&
          selectedHalte && (
            <div className='bg-[#eb8d8c] p-2 rounded-2xl absolute w-[90%] h-fit bottom-11'>
              <div className='w-[100%] flex justify-end'>
                {/* <Image src="/images/closeBusPanel.svg" alt='close-button' width={25} height={25} onClick={() => handleCloseButtonClick()} style={{ cursor: 'pointer' }} /> */}
                <IoMdCloseCircleOutline color="white" size={25} onClick={() => handleCloseButtonClick()} style={{ cursor: 'pointer' }} />
              </div>
              <div className="flex flex-row mb-5">
                <div className='flex justify-between pb-2'>
                  <div className='flex w-full'>
                    {/* <Image className="ml-[10px]" src={'/images/iconHalteWhite.png'} alt="bus location" width={37} height={30} /> */}
                    <div className='bg-white rounded-full p-1 ml-4'>
                      <TbBusStop color="#eb8d8c" size={37} />
                    </div>
                    <div className='flex flex-col relative w-full h-full header-busPanel ml-3'>
                      <p className='font-extralight text-white'>Halte</p>
                      <p className='font-bold text-white text-2xl'>{selectedHalte.halte}</p>
                    </div>
                  </div>
                </div>
                {/* <div className='flex flex-row justify-end w-full items-end gap-2 mr-[14px] border-b-[#fad5d5] border-b-[3px] border-solid pb-3' /> */}
                <div>
                  {(shuttles.length ? (
                    shuttles.map((shuttle: Shuttle, index: number) => (
                      <div key={`${index}-${index}`} className='mt-3 mb-3 mr-3'>
                        {/* {shuttle.route === 'Blue' ? (
                        <Image className='mt-1 ml-3' src={'/images/blueBus.svg'} alt="bus location" width={35} height={35} />
                      ) : (
                        <Image className='mt-1 ml-3' src={'/images/greyBus.svg'} alt="bus location" width={35} height={35} />
                      )} */}
                        {/* <div className='ml-3 mt-1'>
                        <p className='font-extralight text-white text-xs'>{shuttle.route === 'Blue' ? 'Shuttle Biru' : 'Shuttle Abu'}</p>
                        <p className='font-bold text-white text-xs'>{shuttle.status.toUpperCase()}</p>
                      </div> */}
                        <div className=' bg-white h-fit absolute w-fit rounded-lg p-1.5 ml-5'>
                          <div className='flex flex-row items-center'>
                            <div className='flex flex-column mx-1.5 w-20'>
                              <p className='font-extralight text-[#eb8d8c] text-center'>Tiba dalam</p>
                              <p className='font-bold text-[#eb8d8c] text-center'>{shuttle.waitingTime} min(s)</p>
                            </div>
                            <div className=' flex flex-column mx-1.5 w-20'>
                              <p className='font-extralight text-[#eb8d8c] text-center'>Crowd Level:</p>
                              <p className='font-bold text-[#eb8d8c] text-center'>{shuttle.crowd} Crowded</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='ml-3 mt-3 mb-2'>
                      <p className='font-extralight text-white text-xs'>Tidak ada shuttle yang beroperasi saat ini</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default HaltePopUp;
